import process from 'node:process';
import { loadEnv } from 'vite';

const fileEnv = loadEnv(import.meta.env.PROD ? 'production' : 'development', process.cwd(), '');

export function getSecret(name: string) {
  const value = process.env[name] || fileEnv[name];

  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  return null;
}

export function requireSecret(name: string) {
  const value = getSecret(name);

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}
