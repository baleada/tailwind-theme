import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const external = [
        'tailwindcss/defaultTheme',
        '@baleada/tailwind-linear-numeric',
        '@baleada/tailwind-theme-utils',
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
