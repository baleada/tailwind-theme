import defaultTheme from 'tailwindcss/defaultTheme.js'
import { linearNumeric } from '@baleada/tailwind-linear-numeric'
import { fractions, screen } from '@baleada/tailwind-theme-utils'

// Functions used to generate keys here are all tested more explicitly in their individual packages

const baleadaScreens = {
        ...defaultTheme.screens,
        'all': 'stub',
      },
      baleadaSpacing = Object.keys(linearNumeric({ only: 'spacing' }))

export const expectedPluginKeys = {
  screens: [...Object.keys(defaultTheme.screens), 'all'],
  colors: Object.keys(linearNumeric({ only: 'colors', increment: 10 }).blue),
  spacing: [
    ...baleadaSpacing,
  ],
  width: [
    ...baleadaSpacing,
    'auto',
    'min',
    'max',
    'screen',
    ...Object.keys({
      ...fractions({ unit: '%', set: 'tailwind' }),
      ...screen(baleadaScreens),
    }),
  ],
  minWidth: Object.keys({
    ...defaultTheme.minWidth,
    ...screen(baleadaScreens), // Already comes with screens but I'm including here to be explicit
  }),
  maxWidth: Object.keys({
    ...linearNumeric({ only: 'maxWidth' }),
    ...screen(baleadaScreens),
  }),
  minHeight: Object.keys({
    ...defaultTheme.minHeight,
    ...screen(baleadaScreens),
  }),
  blur: Object.keys(linearNumeric({ only: 'blur' })),
  borderRadius: Object.keys(linearNumeric({ only: 'borderRadius' })),
  borderWidth: Object.keys(linearNumeric({ only: 'borderWidth' })),
  boxShadow: Object.keys(linearNumeric({ only: 'boxShadow' })),
  dropShadow: Object.keys(linearNumeric({ only: 'dropShadow' })),
  flexGrow: Object.keys(linearNumeric({ only: 'flexGrow' })),
  flexShrink: Object.keys(linearNumeric({ only: 'flexShrink' })),
  fontSize: Object.keys(linearNumeric({ only: 'fontSize' })),
  fontWeight: Object.keys(linearNumeric({ only: 'fontWeight' })),
  letterSpacing: Object.keys(linearNumeric({ only: 'letterSpacing' })),
  lineHeight: Object.keys(linearNumeric({ only: 'lineHeight' })),
  strokeWidth: Object.keys(linearNumeric({ only: 'strokeWidth' })),
  ringOffsetWidth: Object.keys(linearNumeric({ only: 'ringOffsetWidth' })),
  ringWidth: Object.keys(linearNumeric({ only: 'ringWidth' })),
  transitionDuration: Object.keys(linearNumeric({ only: 'transitionDuration' })),
  transitionDelay: Object.keys(linearNumeric({ only: 'transitionDelay' })),
}
