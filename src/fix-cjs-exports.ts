import { reflect, type ReflectOptions } from './reflect'

const statement = `
// fix-cjs-exports
if (module.exports.default) {
  Object.assign(module.exports.default, module.exports);
  module.exports = module.exports.default;
  delete module.exports.default;
}
`

export const fixCjsExports = async (options?: Partial<ReflectOptions>) => {
  const { readPackage } = await import('read-pkg')
  const { type } = await readPackage()
  const isEsm = type === 'module'
  const suffix = isEsm ? 'cjs' : 'js'
  const files = options?.files?.length ? options.files : `**/*.${suffix}`

  await reflect({
    ...options,
    files,
    name: 'fix-cjs-exports',
    reflect: (code) => {
      if (code.includes('module.exports =') && !code.includes(statement)) {
        return code + statement
      }
    },
  })
}
