import type { AstroIntegration } from 'astro';
import { execFile } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const CV_FILENAME = 'maxi_garcia_mortigliengo_cv.pdf';

export function generateCvIntegration(): AstroIntegration {
  return {
    name: 'generate-cv',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
        const outPath = path.join(fileURLToPath(dir), 'assets', CV_FILENAME);
        const scriptPath = path.join(root, 'scripts', 'generate-cv.ts');

        try {
          const { stdout, stderr } = await execFileAsync(
            process.execPath,
            ['--import', 'tsx/esm', scriptPath, outPath],
            { cwd: root },
          );

          if (stdout.trim()) {
            logger.info(stdout.trim());
          }
          if (stderr.trim()) {
            logger.warn(stderr.trim());
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          logger.error(`Failed to generate CV PDF: ${message}`);
          throw error;
        }
      },
    },
  };
}
