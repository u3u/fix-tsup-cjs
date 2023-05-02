import { reflect, type ReflectOptions } from './reflect'

const statement = 'module.exports = module.exports.default;'

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
