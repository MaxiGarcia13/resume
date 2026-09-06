import process from 'node:process';

export function getSecret(name: string) {
  const value = import.meta.env[name] ?? process.env[name];

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
