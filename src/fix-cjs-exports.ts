import { reflect, type ReflectOptions } from './reflect';

const statements = `
// fix-cjs-exports
if (module.exports.default) {
  Object.assign(module.exports.default, module.exports);
  module.exports = module.exports.default;
  delete module.exports.default;
}
`;

export const fixCjsExports = async (options?: Partial<ReflectOptions>) => {
  const { readPackage } = await import('read-pkg');
  const { type } = await readPackage();
  const isEsm = type === 'module';
  const suffix = isEsm ? 'cjs' : 'js';
  const files = options?.files?.length ? options.files : `**/*.${suffix}`;

  return reflect({
    ...options,
    files,
    name: 'fix-cjs-exports',

    reflect: (code) => {
      // eslint-disable-next-line curly
      if (code.includes('module.exports = __toCommonJS') && !code.endsWith(statements)) {
        return code + statements;
      }
    },
  });
};
