import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: 'node16',
  clean: true,
  externals: [
    'axios',
  ],

  rollup: {
    inlineDependencies: [
      '@antfu/utils',
    ],
    emitCJS: true,
  },
})
