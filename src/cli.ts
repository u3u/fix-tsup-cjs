#!/usr/bin/env node
import path from 'node:path'
import { name, version } from '../package.json'
import { fixCjsDts } from './fix-cjs-dts'
import { fixCjsExports } from './fix-cjs-exports'
import { cac } from 'cac'

const cli = cac(name)

cli.version(version)

cli
  .command('[...files]', 'Custom matching files glob')
  .option('--cwd [path]', 'Set fix directory', { default: 'dist' })
  .option('--dts', 'Fix commonjs d.ts files', { default: true })
  .action(async (files, options) => {
    const { dts } = options
    const hasCustomMatchFiles = !!files?.length
    const currentDir = process.cwd()
    const cwd = path.resolve(currentDir, options.cwd)

    await fixCjsExports({
      files,
      globOptions: { cwd: hasCustomMatchFiles ? currentDir : cwd },
    })

    if (dts) {
      await fixCjsDts({
        globOptions: { cwd },
      })
    }
  })

cli.help()

cli.parse()
