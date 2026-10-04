import { beforeEach, describe, expect, it } from 'vitest';
import {
  consumeRateLimit,
  getClientIp,
  MAX_REQUESTS_PER_IP,
  resetRateLimits,
} from './rate-limit';

describe('getClientIp', () => {
  it('uses the first x-forwarded-for address', () => {
    const request = new Request('http://localhost/api/v1/groq', {
      headers: {
        'x-forwarded-for': ' 203.0.113.10 , 10.0.0.1',
        'x-real-ip': '198.51.100.2',
      },
    });

    expect(getClientIp(request)).toBe('203.0.113.10');
  });

  it('falls back to x-real-ip and then unknown', () => {
    expect(getClientIp(new Request('http://localhost/api/v1/groq', {
      headers: { 'x-real-ip': '198.51.100.2' },
    }))).toBe('198.51.100.2');
    expect(getClientIp(new Request('http://localhost/api/v1/groq'))).toBe('unknown');
  });
});

describe('consumeRateLimit', () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it('allows requests under the ip limit', () => {
    for (let index = 0; index < MAX_REQUESTS_PER_IP; index += 1) {
      expect(consumeRateLimit('203.0.113.1')).toBe(true);
    }
  });

  it('blocks the next request after the ip limit', () => {
    for (let index = 0; index < MAX_REQUESTS_PER_IP; index += 1) {
      consumeRateLimit('203.0.113.1');
    }

    expect(consumeRateLimit('203.0.113.1')).toBe(false);
  });

  it('does not share ip buckets', () => {
    for (let index = 0; index < MAX_REQUESTS_PER_IP; index += 1) {
      consumeRateLimit('203.0.113.1');
    }

    expect(consumeRateLimit('203.0.113.2')).toBe(true);
  });
});
