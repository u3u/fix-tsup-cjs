import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import { gray, green } from 'kolorist';

export type ReflectActionResult = string | false | undefined;

export interface ReflectOptions {
  files: fg.Pattern | fg.Pattern[];
  globOptions?: fg.Options;
  name?: string;
  reflect(code: string): Promise<ReflectActionResult> | ReflectActionResult;
}

export const reflect = async (options: ReflectOptions) => {
  const { globOptions = {}, name = 'reflect', reflect } = options;
  const cwd = process.cwd();

  const files = await fg(options.files, {
    cwd: path.resolve(cwd, 'dist'),
    ...globOptions,
    absolute: true,
    ignore: [...(globOptions.ignore || []), 'node_modules'],
  });

  const logger = (message: string) => console.log(`[${name}]`, message);

  if (!files.length) logger(gray('No files matched'));

  const output = [];

  for (const file of files) {
    const code = await fs.readFile(file, 'utf8');
    const result = await reflect(code);
    const filename = path.relative(cwd, file);

    if (result) {
      await fs.writeFile(file, result);
      output.push(result);
      logger(`${green('✔')} ${filename}`);
    } else {
      logger(gray(`skip ${filename}`));
    }
  }

  return output;
};
