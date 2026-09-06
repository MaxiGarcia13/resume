import type { AstroCookies } from 'astro';
import { createHmac } from 'node:crypto';
import process from 'node:process';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  ensureSessionCookie,
  readSession,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  verifySession,
} from './session';

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

function signSession(id: string, exp: number) {
  const payload = `${id}.${exp}`;
  const signature = createHmac('sha256', TEST_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

describe('session', () => {
  beforeEach(() => {
    process.env.SESSION_SECRET = TEST_SECRET;
  });

  it('mints a signed cookie and reads it back', () => {
    const cookies = createCookies();

    ensureSessionCookie(cookies);

    const session = readSession(cookies);
    expect(session).not.toBeNull();
    expect(session?.id).toBeTruthy();
    expect(session?.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    expect(session?.exp).toBeLessThanOrEqual(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS);
  });

  it('keeps the same session id when refreshing a valid cookie', () => {
    const cookies = createCookies();
    ensureSessionCookie(cookies);
    const first = readSession(cookies);

    ensureSessionCookie(cookies);
    const second = readSession(cookies);

    expect(second?.id).toBe(first?.id);
  });

  it('rejects missing, malformed, and tampered values', () => {
    expect(verifySession(undefined)).toBeNull();
    expect(verifySession('')).toBeNull();
    expect(verifySession('only-one-part')).toBeNull();
    expect(verifySession(signSession('abc', Math.floor(Date.now() / 1000) + 60).replace(/.$/, 'x'))).toBeNull();
  });

  it('rejects expired sessions', () => {
    expect(verifySession(signSession('abc', Math.floor(Date.now() / 1000) - 1))).toBeNull();
  });

  it('accepts a correctly signed session', () => {
    const exp = Math.floor(Date.now() / 1000) + 60;
    const value = signSession('session-id', exp);

    expect(verifySession(value)).toEqual({ id: 'session-id', exp });
  });
});
