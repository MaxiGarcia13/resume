import process from 'node:process';
import { afterEach, describe, expect, it } from 'vitest';
import { getSecret, requireSecret } from './env';

describe('getSecret', () => {
  afterEach(() => {
    delete process.env.TEST_ONLY_SECRET;
  });

  it('reads a value from the environment', () => {
    process.env.TEST_ONLY_SECRET = 'from-env';
    expect(getSecret('TEST_ONLY_SECRET')).toBe('from-env');
  });

  it('returns null when the secret is missing', () => {
    expect(getSecret('MISSING_SECRET_FOR_TESTS')).toBeNull();
  });
});

describe('requireSecret', () => {
  it('throws when the secret is not set', () => {
    expect(() => requireSecret('MISSING_SECRET_FOR_TESTS')).toThrow('MISSING_SECRET_FOR_TESTS is not set');
  });
});
