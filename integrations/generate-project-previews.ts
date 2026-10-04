import type { AstroIntegration } from 'astro';
import { execFile } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export function generateProjectPreviewsIntegration(): AstroIntegration {
  return {
    name: 'generate-project-previews',
    hooks: {
      'astro:build:start': async ({ logger }) => {
        const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
        const scriptPath = path.join(root, 'scripts', 'generate-project-previews.ts');

        try {
          const { stdout, stderr } = await execFileAsync(
            process.execPath,
            ['--import', 'tsx/esm', scriptPath],
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
          logger.error(`Failed to generate project previews: ${message}`);
          throw error;
        }
      },
    },
  };
}
