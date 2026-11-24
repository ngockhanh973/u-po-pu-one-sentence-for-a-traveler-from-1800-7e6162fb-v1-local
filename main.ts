// The whole job of this program is to hand the sentence stored next to
// it to the grader, exactly as written. It never edits, trims, or
// re-encodes anything: the file's bytes are the entry, and the entry is
// the file's bytes.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sentence = readFileSync(join(here, 'entry.txt'));

// The harness points here when it grades; a plain local run lands in
// a folder beside the script instead. Either way the same bytes go out,
// so running it twice can never produce two different entries.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, 'out');
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(join(outDir, 'entry.txt'), sentence);
