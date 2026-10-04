export function jsonError(
  message: string,
  status: number,
  headers?: Record<string, string>,
) {
  return Response.json({ error: message }, { status, headers });
}
