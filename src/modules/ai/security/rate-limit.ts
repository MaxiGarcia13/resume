export const RATE_LIMIT_WINDOW_MS = 60_000;
export const MAX_REQUESTS_PER_SESSION = 15;
export const MAX_REQUESTS_PER_IP = 40;

const sessionHits = new Map<string, number[]>();
const ipHits = new Map<string, number[]>();

function prune(store: Map<string, number[]>, key: string, windowStart: number) {
  const timestamps = (store.get(key) ?? []).filter((timestamp) => timestamp > windowStart);
  store.set(key, timestamps);
  return timestamps;
}

function hit(store: Map<string, number[]>, key: string, max: number, now: number) {
  const timestamps = prune(store, key, now - RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= max) {
    return false;
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return true;
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip');
  return ip || 'unknown';
}

export function consumeRateLimit(sessionId: string, ip: string) {
  const now = Date.now();
  return (
    hit(sessionHits, sessionId, MAX_REQUESTS_PER_SESSION, now)
    && hit(ipHits, ip, MAX_REQUESTS_PER_IP, now)
  );
}

export function resetRateLimits() {
  sessionHits.clear();
  ipHits.clear();
}
