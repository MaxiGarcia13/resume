import type { AstroCookies } from 'astro';
import process from 'node:process';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  ACCESS_TOKEN_COOKIE,
  ensureAccessTokenCookie,
} from './access-token';
import { guardLlmApiRequest } from './guard';

const TEST_SECRET = 'test-access-token-secret';

function createCookies(value?: string) {
  const store = new Map<string, string>();

  if (value) {
    store.set(ACCESS_TOKEN_COOKIE, value);
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

function createContext(options: { cookie?: string } = {}) {
  const cookies = createCookies();

  if (options.cookie === undefined) {
    process.env.SESSION_SECRET = TEST_SECRET;
    ensureAccessTokenCookie(cookies);
  } else if (options.cookie) {
    cookies.set(ACCESS_TOKEN_COOKIE, options.cookie, {});
  }

  return { cookies };
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
  });

  it('returns 401 when the access token cookie is missing or invalid', async () => {
    await expectJsonError(
      guardLlmApiRequest(createContext({ cookie: '' })),
      401,
      'Unauthorized',
    );
    await expectJsonError(
      guardLlmApiRequest(createContext({ cookie: 'tampered.1.sig' })),
      401,
      'Unauthorized',
    );
  });

  it('allows a request with a valid access token', () => {
    expect(guardLlmApiRequest(createContext())).toBeNull();
  });
});
