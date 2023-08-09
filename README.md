# fix-tsup-cjs

> Fix the `commonjs` default export statement and type definition of [tsup](https://github.com/egoist/tsup) output

[![npm version](https://badgen.net/npm/v/fix-tsup-cjs)](https://npm.im/fix-tsup-cjs) [![npm downloads](https://badgen.net/npm/dm/fix-tsup-cjs)](https://npm.im/fix-tsup-cjs) [![codecov](https://codecov.io/gh/u3u/fix-tsup-cjs/graph/badge.svg)](https://codecov.io/gh/u3u/fix-tsup-cjs)

## Motivation

The default export statement in the `commonjs` format output by [tsup](https://github.com/egoist/tsup) is `module.exports.default`, which means that you actually need to import it through `require().default`. This cannot be directly used for configuration files such as [Prettier](https://prettier.io/docs/en/configuration.html#basic-configuration) and [ESLint](https://eslint.org/docs/latest/extend/shareable-configs), because they only read `require()`.

## Usage

```sh
tsup && npx fix-tsup-cjs
```

> _Note: By default, `dist/**/*.js` will be fixed. If the `type` in your `package.json` is set to `module`, then `dist/**/*.cjs` will be fixed._

## CLI Options

```
Usage:
  $ fix-tsup-cjs [...files]

Commands:
  [...files]  Custom matching files glob

For more info, run any command with the `--help` flag:
  $ fix-tsup-cjs --help

Options:
  --cwd [path]             Set fix directory (default: dist)
  --dts                    Fix commonjs d.ts and d.cts files (default: true)
  -i, --ignore [...files]  Ignore files
  --silent                 Suppress logs
  -v, --version            Display version number
  -h, --help               Display this message
```

## License

[MIT](./LICENSE) License © 2023 [u3u](https://github.com/u3u)
