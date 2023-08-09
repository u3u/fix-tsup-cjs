import path from 'node:path';
import { expect, it } from 'vitest';
import { fixCjsDts, fixCjsExports } from '../src';

const entry = 'mod';
const outDir = 'temp';

const tsup = async () => {
  const { execa } = await import('execa');

  await execa('tsup', [
    //
    `test/__fixtures__/${entry}.ts`,
    '--clean',
    '--dts',
    '--format',
    'cjs,esm',
    '--out-dir',
    outDir,
    '--shims',
  ]);
};

it('fix-cjs-exports', async () => {
  await tsup();

  const result = await fixCjsExports({
    globOptions: {
      cwd: outDir,
    },
  });

  const mod = require(path.join('..', outDir, entry));

  expect(mod).toBeDefined();
  expect(mod).toMatchSnapshot();
  expect(result).toMatchSnapshot();
});

it('fix-cjs-dts', async () => {
  await tsup();

  const result = await fixCjsDts({
    globOptions: {
      cwd: outDir,
    },
  });

  expect(result).toMatchSnapshot();
});
