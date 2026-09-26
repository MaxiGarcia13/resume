import process from 'node:process';
import { generateCvPdf, generateCvPdfToPublic } from '@/utils/generate-cv';

const outArg = process.argv[2];

const outPath = outArg
  ? await generateCvPdf(outArg)
  : await generateCvPdfToPublic();

console.log(`CV written to ${outPath}`);
