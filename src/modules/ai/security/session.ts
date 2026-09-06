import type { AstroCookies } from 'astro';
import { Buffer } from 'node:buffer';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { getSecret } from './env';

export const SESSION_COOKIE_NAME = 'cv_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60; // 1 hour;

interface Session {
  id: string;
  exp: number;
}

function sign(payload: string) {
  const secret = getSecret('SESSION_SECRET');

  if (!secret) {
    return null;
  }

  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function createSessionValue(id = randomBytes(16).toString('base64url')) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload = `${id}.${exp}`;
  const signature = sign(payload);

  if (!signature) {
    return null;
  }

  return `${payload}.${signature}`;
}

export function verifySession(value: string | undefined): Session | null {
  if (!value) {
    return null;
  }

  const [id, expValue, signature] = value.split('.');

  if (!id || !expValue || !signature) {
    return null;
  }

  const payload = `${id}.${expValue}`;
  const expected = sign(payload);

  if (!expected || !safeEqual(signature, expected)) {
    return null;
  }

  const exp = Number(expValue);

  if (!Number.isFinite(exp) || exp * 1000 <= Date.now()) {
    return null;
  }

  return { id, exp };
}

export function readSession(cookies: AstroCookies) {
  return verifySession(cookies.get(SESSION_COOKIE_NAME)?.value);
}

export function ensureSessionCookie(cookies: AstroCookies) {
  const current = readSession(cookies);
  const value = createSessionValue(current?.id);

  if (!value) {
    return;
  }

  cookies.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    secure: Boolean(import.meta.env.PROD),
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}
