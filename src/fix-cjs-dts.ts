import { reflect, type ReflectOptions } from './reflect';

const exportRegex = /export {\s*.*\b(?<name>.+) as default.*\s*};/u;

export const fixCjsDts = async (options?: Partial<ReflectOptions>) => {
  await reflect({
    files: '**/*.d.ts',
    ...options,
    name: 'fix-cjs-dts',

    reflect: (code) => {
      const result = exportRegex.exec(code);

      if (result?.groups?.name) {
        const statement = `export = ${result.groups.name}`;

        if (!code.endsWith(statement)) return code + statement;
      }
    },
  });
};
