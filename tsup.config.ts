import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: { resolve: true },
  entry: ['src/{cli,index}.ts'],
  format: ['cjs', 'esm'],
  shims: true,
});
