import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToFile } from '@react-pdf/renderer';
import { CvDocument } from '@/components/cv';
import { getCvData } from '@/data/cv';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export async function generateCvPdf(outPath: string): Promise<string> {
  const data = getCvData();
  const photoSrc = path.join(ROOT, 'public', data.photoPath);
  const absoluteOutPath = path.isAbsolute(outPath) ? outPath : path.join(ROOT, outPath);

  await mkdir(path.dirname(absoluteOutPath), { recursive: true });
  await renderToFile(<CvDocument data={data} photoSrc={photoSrc} />, absoluteOutPath);

  return absoluteOutPath;
}

export async function generateCvPdfToPublic(): Promise<string> {
  const { filename } = getCvData();
  return generateCvPdf(path.join('public', 'assets', filename));
}
