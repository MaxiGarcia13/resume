import { Buffer } from 'node:buffer';
import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { getProjects } from '@/data/projects';
import {
  findLocalProjectPreviewFile,
  getProjectPreviewFilename,
  getProjectPreviewPassthroughFilename,
  getProjectPreviewSlug,
  isPassthroughPreviewExtension,
  PROJECT_LOCAL_ASSETS_DIR,
  PROJECT_PREVIEW_DIR,
  PROJECT_PREVIEW_WIDTHS,
} from '@/utils/project-preview';

const SNAP_API = 'https://snap-website-api.vercel.app/website-to-blob-img';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS_DIR = path.join(ROOT, PROJECT_LOCAL_ASSETS_DIR);
const OUT_DIR = path.join(ROOT, 'public', PROJECT_PREVIEW_DIR);
const FORCE = process.argv.includes('--force');
const MAX_RETRIES = 3;

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fetchPreview(website: string) {
  const url = new URL(SNAP_API);

  url.searchParams.set('url', encodeURIComponent(website));

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${website}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());

      if (buffer.byteLength === 0) {
        throw new Error(`Empty response for ${website}`);
      }

      return buffer;
    } catch (error) {
      lastError = error;

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => {
          setTimeout(resolve, attempt * 500);
        });
      }
    }
  }

  throw lastError;
}

async function writeWidths(title: string, source: Buffer) {
  await Promise.all(
    PROJECT_PREVIEW_WIDTHS.map(async (width) => {
      const outPath = path.join(OUT_DIR, getProjectPreviewFilename(title, width));
      const webp = await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      await writeFile(outPath, webp);
    }),
  );
}

async function writePassthrough(title: string, localPath: string) {
  const extension = path.extname(localPath).toLowerCase();
  const outPath = path.join(OUT_DIR, getProjectPreviewPassthroughFilename(title, extension));

  await copyFile(localPath, outPath);
}

async function needsWidthOutputs(title: string) {
  const missing = await Promise.all(
    PROJECT_PREVIEW_WIDTHS.map(async (width) => {
      const outPath = path.join(OUT_DIR, getProjectPreviewFilename(title, width));
      return !(await fileExists(outPath));
    }),
  );

  return missing.some(Boolean);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const projects = getProjects().filter(
    (project) => project.website || findLocalProjectPreviewFile(project.title, ASSETS_DIR),
  );

  for (const project of projects) {
    const localPath = findLocalProjectPreviewFile(project.title, ASSETS_DIR);
    const extension = localPath
      ? path.extname(localPath).toLowerCase()
      : null;

    if (localPath && extension && isPassthroughPreviewExtension(extension)) {
      const outPath = path.join(OUT_DIR, getProjectPreviewPassthroughFilename(project.title, extension));

      if (!FORCE && await fileExists(outPath)) {
        console.log(`skip ${project.title}`);
        continue;
      }

      console.log(`local ${project.title} (${getProjectPreviewSlug(project.title)}${extension})`);
      await writePassthrough(project.title, localPath);
      console.log(`wrote ${project.title}`);
      continue;
    }

    if (!FORCE && !(await needsWidthOutputs(project.title))) {
      console.log(`skip ${project.title}`);
      continue;
    }

    const website = project.website;
    const source = localPath
      ? await readFile(localPath)
      : website
        ? await fetchPreview(website)
        : null;

    if (!source) {
      console.log(`skip ${project.title} (no local source or website)`);
      continue;
    }

    console.log(`${localPath ? 'local' : 'fetch'} ${project.title}${localPath
      ? ''
      : ` (${website})`}`);
    await writeWidths(project.title, source);
    console.log(`wrote ${project.title}`);
  }
}

await main();
