export function getLinkRel(target?: string) {
  return target === '_blank' ? 'noopener noreferrer' : undefined;
}
