import type { AstroCookies } from 'astro';
import { createHmac } from 'node:crypto';
import process from 'node:process';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  ACCESS_TOKEN_COOKIE,
  createAccessTokenValue,
  ensureAccessTokenCookie,
  isValidAccessToken,
  readAccessToken,
} from './access-token';

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

function signToken(expiresAt: number) {
  const payload = String(expiresAt);
  const signature = createHmac('sha256', TEST_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

describe('access-token', () => {
  beforeEach(() => {
    process.env.SESSION_SECRET = TEST_SECRET;
  });

  it('mints a signed cookie and reads it back', () => {
    const cookies = createCookies();

    ensureAccessTokenCookie(cookies);

    const value = readAccessToken(cookies);
    expect(value).toBeTruthy();
    expect(isValidAccessToken(value)).toBe(true);
  });

  it('does not replace a valid cookie', () => {
    const cookies = createCookies();
    ensureAccessTokenCookie(cookies);
    const first = readAccessToken(cookies);

    ensureAccessTokenCookie(cookies);
    const second = readAccessToken(cookies);

    expect(second).toBe(first);
  });

  it('rejects missing, malformed, and tampered values', () => {
    expect(isValidAccessToken(undefined)).toBe(false);
    expect(isValidAccessToken('')).toBe(false);
    expect(isValidAccessToken('only-one-part')).toBe(false);
    expect(isValidAccessToken(signToken(Date.now() + 60_000).replace(/.$/, 'x'))).toBe(false);
  });

  it('rejects expired tokens', () => {
    expect(isValidAccessToken(signToken(Date.now() - 1))).toBe(false);
  });

  it('accepts a correctly signed token', () => {
    const value = createAccessTokenValue();
    expect(isValidAccessToken(value ?? undefined)).toBe(true);
  });
});
