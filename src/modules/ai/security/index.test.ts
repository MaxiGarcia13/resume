import type { AstroCookies } from 'astro';
import process from 'node:process';
import { beforeEach, describe, expect, it } from 'vitest';
import { applyCorsHeaders, guardLlmApiRequest } from './index';
import { MAX_REQUESTS_PER_SESSION, resetRateLimits } from './rate-limit';
import { ensureSessionCookie, SESSION_COOKIE_NAME } from './session';

const SITE_ORIGIN = 'https://maxi-garcia-mortigliengo-cv.vercel.app';
const TEST_SECRET = 'test-session-secret';

function createCookies(value?: string) {
  const store = new Map<string, string>();

  if (value) {
    store.set(SESSION_COOKIE_NAME, value);
  }

  return {
    get(name: string) {
      const cookie = store.get(name);
      return cookie === undefined ? undefined : { value: cookie };
    },
    set(name: string, next: string) {
      store.set(name, next);
    },
  } as AstroCookies;
}

function createContext(options: {
  origin?: string;
  referer?: string;
  cookie?: string;
  ip?: string;
}) {
  const headers = new Headers();

  if (options.origin) {
    headers.set('origin', options.origin);
  }

  if (options.referer) {
    headers.set('referer', options.referer);
  }

  if (options.ip) {
    headers.set('x-forwarded-for', options.ip);
  }

  const cookies = createCookies();

  if (options.cookie === undefined) {
    process.env.SESSION_SECRET = TEST_SECRET;
    ensureSessionCookie(cookies);
  } else if (options.cookie) {
    cookies.set(SESSION_COOKIE_NAME, options.cookie, {});
  }

  return {
    request: new Request(`${SITE_ORIGIN}/api/v1/groq`, {
      method: 'POST',
      headers,
    }),
    cookies,
  };
}

async function expectJsonError(
  response: Response | null,
  status: number,
  message: string,
) {
  expect(response).not.toBeNull();
  expect(response?.status).toBe(status);
  await expect(response?.json()).resolves.toEqual({ error: message });
}

describe('guardLlmApiRequest', () => {
  beforeEach(() => {
    process.env.SESSION_SECRET = TEST_SECRET;
    resetRateLimits();
  });

  it('returns 403 when the origin is missing or not allowed', async () => {
    await expectJsonError(
      guardLlmApiRequest(createContext({})),
      403,
      'Forbidden',
    );
    await expectJsonError(
      guardLlmApiRequest(createContext({ origin: 'https://evil.example' })),
      403,
      'Forbidden',
    );
  });

  it('returns 401 when the session cookie is missing or invalid', async () => {
    await expectJsonError(
      guardLlmApiRequest(createContext({ origin: SITE_ORIGIN, cookie: '' })),
      401,
      'Unauthorized',
    );
    await expectJsonError(
      guardLlmApiRequest(createContext({ origin: SITE_ORIGIN, cookie: 'tampered.1.sig' })),
      401,
      'Unauthorized',
    );
  });

  it('allows a same-origin request with a valid session', () => {
    expect(guardLlmApiRequest(createContext({ origin: SITE_ORIGIN, ip: '203.0.113.20' }))).toBeNull();
  });

  it('allows a request whose Referer matches the site', () => {
    expect(guardLlmApiRequest(createContext({
      referer: `${SITE_ORIGIN}/`,
      ip: '203.0.113.21',
    }))).toBeNull();
  });

  it('returns 429 after the session rate limit', async () => {
    const context = createContext({ origin: SITE_ORIGIN, ip: '203.0.113.22' });

    for (let index = 0; index < MAX_REQUESTS_PER_SESSION; index += 1) {
      expect(guardLlmApiRequest(context)).toBeNull();
    }

    const blocked = guardLlmApiRequest(context);
    await expectJsonError(blocked, 429, 'Too many requests');
    expect(blocked?.headers.get('Retry-After')).toBe('60');
  });
});

describe('applyCorsHeaders', () => {
  it('echoes CORS headers only for allowed origins', () => {
    const allowed = applyCorsHeaders(
      new Request(SITE_ORIGIN, { headers: { origin: SITE_ORIGIN } }),
      new Response(null, { status: 200 }),
    );

    expect(allowed.headers.get('Access-Control-Allow-Origin')).toBe(SITE_ORIGIN);
    expect(allowed.headers.get('Access-Control-Allow-Credentials')).toBe('true');
    expect(allowed.headers.get('Vary')).toBe('Origin');

    const blocked = applyCorsHeaders(
      new Request(SITE_ORIGIN, { headers: { origin: 'https://evil.example' } }),
      new Response(null, { status: 403 }),
    );

    expect(blocked.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});
