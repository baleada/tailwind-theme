import { configureable } from '@baleada/prepare'

const shared = configureable('rollup')
        .input('src/index.js')
        .external([
          /tailwindcss/,
          '@baleada/tailwind-theme-utils',
          '@baleada/tailwind-linear-numeric',
        ])
        .resolve(),
      esm = shared
        .delete({ targets: 'lib/*' })
        .esm({ file: 'lib/index.js', target: 'node' })
        .analyze(),
      cjs = shared
        .cjs({ file: 'lib/index.cjs' })

export default [
  esm.configure(),
  cjs.configure(),
]
