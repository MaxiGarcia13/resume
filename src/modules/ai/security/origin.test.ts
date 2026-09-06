import process from 'node:process';
import { afterEach, describe, expect, it } from 'vitest';
import { getRequestOrigin, isAllowedOrigin, isAllowedRequestOrigin } from './origin';

const SITE_ORIGIN = 'https://maxi-garcia-mortigliengo-cv.vercel.app';

describe('isAllowedOrigin', () => {
  it('allows the configured site origin', () => {
    expect(isAllowedOrigin(SITE_ORIGIN)).toBe(true);
  });

  it('allows local http origins in development', () => {
    expect(isAllowedOrigin('http://localhost:4321')).toBe(true);
    expect(isAllowedOrigin('http://127.0.0.1:4321')).toBe(true);
    expect(isAllowedOrigin('http://[::1]:4321')).toBe(true);
  });

  it('rejects unknown origins', () => {
    expect(isAllowedOrigin('https://evil.example')).toBe(false);
    expect(isAllowedOrigin('http://evil.example')).toBe(false);
  });

  it('allows the current Vercel deployment origin', () => {
    const previous = process.env.VERCEL_URL;
    process.env.VERCEL_URL = 'resume-git-preview.vercel.app';

    expect(isAllowedOrigin('https://resume-git-preview.vercel.app')).toBe(true);

    if (previous === undefined) {
      delete process.env.VERCEL_URL;
    } else {
      process.env.VERCEL_URL = previous;
    }
  });
});

describe('getRequestOrigin', () => {
  it('prefers the Origin header', () => {
    const request = new Request(SITE_ORIGIN, {
      headers: {
        origin: SITE_ORIGIN,
        referer: 'https://evil.example/page',
      },
    });

    expect(getRequestOrigin(request)).toBe(SITE_ORIGIN);
  });

  it('falls back to the Referer origin', () => {
    const request = new Request(SITE_ORIGIN, {
      headers: {
        referer: `${SITE_ORIGIN}/#chat`,
      },
    });

    expect(getRequestOrigin(request)).toBe(SITE_ORIGIN);
  });

  it('returns null when neither header is usable', () => {
    expect(getRequestOrigin(new Request(SITE_ORIGIN))).toBeNull();

    const request = new Request(SITE_ORIGIN, {
      headers: {
        referer: 'not-a-url',
      },
    });

    expect(getRequestOrigin(request)).toBeNull();
  });
});

describe('isAllowedRequestOrigin', () => {
  afterEach(() => {
    delete process.env.VERCEL_URL;
  });

  it('allows requests from the site origin', () => {
    const request = new Request(`${SITE_ORIGIN}/api/v1/groq`, {
      method: 'POST',
      headers: {
        origin: SITE_ORIGIN,
      },
    });

    expect(isAllowedRequestOrigin(request)).toBe(true);
  });

  it('allows requests whose Referer matches the site', () => {
    const request = new Request('http://localhost:4321/api/v1/groq', {
      method: 'POST',
      headers: {
        referer: 'http://localhost:4321/',
      },
    });

    expect(isAllowedRequestOrigin(request)).toBe(true);
  });

  it('rejects requests without an allowed origin', () => {
    const request = new Request('http://localhost:4321/api/v1/groq', {
      method: 'POST',
      headers: {
        origin: 'https://evil.example',
      },
    });

    expect(isAllowedRequestOrigin(request)).toBe(false);
    expect(isAllowedRequestOrigin(new Request('http://localhost:4321/api/v1/groq', { method: 'POST' }))).toBe(false);
  });
});
