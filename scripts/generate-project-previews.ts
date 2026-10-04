import { Buffer } from 'node:buffer';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { getProjects } from '@/data/projects';
import {
  getProjectPreviewFilename,
  PROJECT_PREVIEW_DIR,
  PROJECT_PREVIEW_WIDTHS,
} from '@/utils/project-preview';

const SNAP_API = 'https://snap-website-api.vercel.app/website-to-blob-img';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
  const url = `${SNAP_API}?url=${encodeURIComponent(website)}`;
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url);

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

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const projects = getProjects().filter((project) => project.website);

  for (const project of projects) {
    const website = project.website!;
    const missing = await Promise.all(
      PROJECT_PREVIEW_WIDTHS.map(async (width) => {
        const outPath = path.join(OUT_DIR, getProjectPreviewFilename(project.title, width));
        return !(await fileExists(outPath));
      }),
    );

    if (!FORCE && missing.every((isMissing) => !isMissing)) {
      console.log(`skip ${project.title}`);
      continue;
    }

    console.log(`fetch ${project.title} (${website})`);
    const source = await fetchPreview(website);
    await writeWidths(project.title, source);
    console.log(`wrote ${project.title}`);
  }
}

await main();
