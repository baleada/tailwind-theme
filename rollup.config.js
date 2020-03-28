import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const external = [
        'tailwindcss/defaultTheme',
        '@baleada/linear-numeric',
        '@baleada/tailwind-config-utils',
      ],
      plugins = [
        babel({
          exclude: 'node_modules',
        }),
        resolve(),
      ]

export default [
  {
    external,
    input: 'src/index.js',
    output: { file: 'lib/index.js', format: 'cjs' },
    plugins,
  },
]
