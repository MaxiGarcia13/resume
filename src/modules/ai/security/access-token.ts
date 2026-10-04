import type { AstroCookies } from 'astro';
import { createAccessToken } from '@maxigarcia/access-token';
import { getSecret } from './env';

export const ACCESS_TOKEN_COOKIE = 'cv_access_token';
export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60; // 1 hour

function getAccessToken() {
  const secret = getSecret('SESSION_SECRET');

  if (!secret) {
    return null;
  }

  return createAccessToken(secret, {
    ttlMs: ACCESS_TOKEN_MAX_AGE_SECONDS * 1000,
  });
}

export function createAccessTokenValue() {
  return getAccessToken()?.create() ?? null;
}

export function isValidAccessToken(value: string | undefined) {
  return getAccessToken()?.isValid(value) ?? false;
}

export function readAccessToken(cookies: AstroCookies) {
  return cookies.get(ACCESS_TOKEN_COOKIE)?.value;
}

export function ensureAccessTokenCookie(cookies: AstroCookies) {
  if (isValidAccessToken(readAccessToken(cookies))) {
    return;
  }

  const value = createAccessTokenValue();

  if (!value) {
    return;
  }

  cookies.set(ACCESS_TOKEN_COOKIE, value, {
    httpOnly: true,
    secure: Boolean(import.meta.env.PROD),
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });
}
