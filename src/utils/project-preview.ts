import { getCvAnchorId } from '@/utils/link-cv-anchors';

export const PROJECT_PREVIEW_WIDTHS = [400, 600, 900] as const;
export const PROJECT_PREVIEW_DIR = 'assets/project-previews';

export type ProjectPreviewWidth = (typeof PROJECT_PREVIEW_WIDTHS)[number];

export function getProjectPreviewSlug(title: string) {
  return getCvAnchorId(title)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getProjectPreviewFilename(title: string, width: ProjectPreviewWidth) {
  return `${getProjectPreviewSlug(title)}-${width}.webp`;
}

export function getProjectPreviewSrc(title: string, width: ProjectPreviewWidth) {
  return `/${PROJECT_PREVIEW_DIR}/${getProjectPreviewFilename(title, width)}`;
}

export function getProjectPreviewSrcSet(title: string) {
  return PROJECT_PREVIEW_WIDTHS
    .map((width) => `${getProjectPreviewSrc(title, width)} ${width}w`)
    .join(', ');
}
