import { reflect, type ReflectOptions } from './reflect';

const exportRegex = /export \{\s*(?:\S.*)?\b(?<name>.+) as default.*(?:[\n\r\u{2028}\u{2029}]\s*)?\};/u;

export const fixCjsDts = async (options?: Partial<ReflectOptions>) => {
  return reflect({
    files: '**/*.d.{ts,cts}',
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
