// All this script does is carry the finished sentence from entry.txt to
// the folder the grader reads, byte for byte. It never edits the text,
// never trims it, never re-encodes it: the bytes in entry.txt are the
// entry, and the entry is those bytes.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function folderOfScript(): string {
  return fileURLToPath(new URL('.', import.meta.url));
}

function deliver(): void {
  const folder = folderOfScript();
  const text = readFileSync(join(folder, 'entry.txt'));
  // Fail loudly instead of handing the grader an entry the gate would
  // reject: the bounty allows 1 to 200 characters, nothing else.
  const length = text.toString('utf-8').length;
  if (length < 1 || length > 200) {
    throw new Error(`entry.txt is ${length} characters; the gate allows 1-200.`);
  }
  const destination = process.env.MAKEFUN_OUTPUT_DIR ?? join(folder, 'out');
  mkdirSync(destination, { recursive: true });
  writeFileSync(join(destination, 'entry.txt'), text);
}

deliver();
