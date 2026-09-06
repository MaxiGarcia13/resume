import process from 'node:process';

const DEV_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

function getAllowedOrigins() {
  const origins = new Set<string>();
  const site = import.meta.env.SITE;

  if (site) {
    try {
      origins.add(new URL(site).origin);
    } catch {
      // Ignore invalid SITE values.
    }
  }

  const vercelUrl = process.env.VERCEL_URL;

  if (vercelUrl) {
    origins.add(`https://${vercelUrl}`);
  }

  return origins;
}

function isLocalDevOrigin(origin: string) {
  if (!import.meta.env.DEV) {
    return false;
  }

  try {
    const url = new URL(origin);
    return url.protocol === 'http:' && DEV_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function isAllowedOrigin(origin: string) {
  return getAllowedOrigins().has(origin) || isLocalDevOrigin(origin);
}

export function getRequestOrigin(request: Request) {
  const origin = request.headers.get('origin');

  if (origin) {
    return origin;
  }

  const referer = request.headers.get('referer');

  if (!referer) {
    return null;
  }

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function isAllowedRequestOrigin(request: Request) {
  const origin = getRequestOrigin(request);
  return origin !== null && isAllowedOrigin(origin);
}
