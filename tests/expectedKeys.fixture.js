import defaultTheme from 'tailwindcss/defaultTheme'
import linearNumeric from '@baleada/tailwind-linear-numeric'
import { fractions, em, px, screen } from '@baleada/tailwind-theme-utils'

// Functions used to generate keys here are all tested more explicitly in their individual packages

const baleadaScreens = {
        ...defaultTheme.screens,
        'all': 'stub',
      },
      baleadaSpacing = [
        ...Object.keys({
          ...linearNumeric({ only: 'spacing' }),
          ...px({
            '1': 'stub',
            '2': 'stub',
            '3': 'stub',
            '4': 'stub',
            '5': 'stub',
          }),
          ...em({
            '1/4': 'stub',
            '1/2': 'stub',
            '1': 'stub',
            '5/4': 'stub',
            '3/2': 'stub',
          }),
        })
      ]

export default {
  colors: [
    ...Object.keys(linearNumeric({ only: 'colors', increment: 10 }).blue),
  ],
  spacing: [
    ...baleadaSpacing,
  ],
  height: [
    ...baleadaSpacing,
    'auto',
    ...Object.keys({
      ...fractions({ unit: '%', mode: 'baleada' }),
      ...fractions({ unit: 'vh', mode: 'baleada' }),
    })
  ],
  width: [
    ...baleadaSpacing,
    'auto',
    'min',
    'max',
    ...Object.keys({
      ...fractions({ unit: '%', mode: 'baleada' }),
      ...fractions({ unit: 'vw', mode: 'baleada' }),
      ...screen(baleadaScreens),
    }),
  ],
  minWidth: [
    ...Object.keys({
      ...defaultTheme.minWidth,
      ...screen(baleadaScreens), // Already comes with screens but I'm including here to be explicit
      ...fractions({ unit: '%', mode: 'baleada' }),
      ...fractions({ unit: 'vh', mode: 'baleada' }),
    }),
  ],
  maxWidth: [
    ...Object.keys({
      ...linearNumeric({ only: 'maxWidth' }),
      ...screen(baleadaScreens),
      ...fractions({ unit: '%', mode: 'baleada' }),
      ...fractions({ unit: 'vh', mode: 'baleada' }),
    }),
  ],
  minHeight: [
    ...Object.keys({
      ...defaultTheme.minHeight,
      ...screen(baleadaScreens),
      ...fractions({ unit: '%', mode: 'baleada' }),
      ...fractions({ unit: 'vh', mode: 'baleada' }),
    }),
  ],
  maxHeight: [
    ...Object.keys({
      ...linearNumeric({ only: 'maxHeight' }),
      ...fractions({ unit: '%', mode: 'baleada' }),
      ...fractions({ unit: 'vh', mode: 'baleada' }),
    }),
  ],
  borderRadius: [
    ...Object.keys(linearNumeric({ only: 'borderRadius' })),
  ],
  borderWidth: [
    ...Object.keys(linearNumeric({ only: 'borderWidth' })),
  ],
  boxShadow: [
    ...Object.keys(linearNumeric({ only: 'boxShadow' })),
  ],
  flexGrow: [
    ...Object.keys(linearNumeric({ only: 'flexGrow' })),
  ],
  flexShrink: [
    ...Object.keys(linearNumeric({ only: 'flexShrink' })),
  ],
  fontSize: [
    ...Object.keys(linearNumeric({ only: 'fontSize' })),
  ],
  fontWeight: [
    ...Object.keys(linearNumeric({ only: 'fontWeight' })),
  ],
  letterSpacing: [
    ...Object.keys(linearNumeric({ only: 'letterSpacing' })),
  ],
  lineHeight: [
    ...Object.keys(linearNumeric({ only: 'lineHeight' })),
  ],
  strokeWidth: [
    ...Object.keys(linearNumeric({ only: 'strokeWidth' })),
  ],
  transitionDuration: [
    ...Object.keys(linearNumeric({ only: 'transitionDuration' })),
  ],
  transitionDelay: [
    ...Object.keys(linearNumeric({ only: 'transitionDelay' })),
  ],
}
