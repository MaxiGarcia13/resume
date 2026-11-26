import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { getCvAnchorId } from '@/utils/link-cv-anchors';

export const PROJECT_PREVIEW_WIDTHS = [400, 600, 900] as const;
export const PROJECT_PREVIEW_DIR = 'assets/project-previews';
export const PROJECT_LOCAL_ASSETS_DIR = 'assets';
/** Prefer animated sources when both a gif and a static override exist. */
export const LOCAL_PREVIEW_EXTENSIONS = [
  '.gif',
  '.webp',
  '.png',
  '.jpg',
  '.jpeg',
] as const;
export const PASSTHROUGH_PREVIEW_EXTENSIONS = new Set(['.gif']);

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

export function getProjectPreviewPassthroughFilename(title: string, extension: string) {
  return `${getProjectPreviewSlug(title)}${extension}`;
}

export function getProjectPreviewPassthroughSrc(title: string, extension: string) {
  return `/${PROJECT_PREVIEW_DIR}/${getProjectPreviewPassthroughFilename(title, extension)}`;
}

export function isPassthroughPreviewExtension(extension: string) {
  return PASSTHROUGH_PREVIEW_EXTENSIONS.has(extension.toLowerCase());
}

export function findLocalProjectPreviewFile(title: string, assetsDir: string) {
  const slug = getProjectPreviewSlug(title);

  for (const extension of LOCAL_PREVIEW_EXTENSIONS) {
    const filePath = path.join(assetsDir, `${slug}${extension}`);

    if (existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

export function hasLocalProjectPreviewSource(title: string, rootDir = process.cwd()) {
  return findLocalProjectPreviewFile(title, path.join(rootDir, PROJECT_LOCAL_ASSETS_DIR)) !== null;
}

export function getLocalProjectPreviewExtension(title: string, rootDir = process.cwd()) {
  const localPath = findLocalProjectPreviewFile(title, path.join(rootDir, PROJECT_LOCAL_ASSETS_DIR));

  return localPath
    ? path.extname(localPath).toLowerCase()
    : null;
}
