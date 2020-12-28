import defaultTheme from 'tailwindcss/defaultTheme.js'
import linearNumeric from '@baleada/tailwind-linear-numeric'
import { fractions, withoutTailwindFractions, em, px, screen } from '@baleada/tailwind-theme-utils'

export default {
  ...linearNumeric(),
  colors: {
    inherit: 'inherit',
    ...linearNumeric({ only: 'colors', increment: 10 }), // Tailwind 2.0.0 adding 50-level shades. Default linear numeric is bg-{color}-0.5 but I prefer bg-{color}-5 in most cases.
  },
  screens: {
    ...defaultTheme.screens,
    all: 0,
  },
  spacing: {
    ...linearNumeric({ only: 'spacing' }),
    ...px({
      '1': '1px',
      '2': '2px',
      '3': '4px',
      '4': '6px',
      '5': '8px',
    }),
    ...em({
      '1/4': '0.25em',
      '1/2': '.5em',
      '1': '1em',
      '5/4': '1.25em',
      '3/2': '1.5em',
    }),
  },
  height: theme => ({
    ...withoutTailwindFractions(defaultTheme.height(theme)),
    ...fractions({ unit: '%', set: 'baleada' }),
    ...fractions({ unit: 'vh', set: 'baleada' }),
  }),
  minWidth: theme => ({
    ...defaultTheme.minWidth,
    ...screen(theme('screens')),
    ...fractions({ unit: '%', set: 'baleada' }),
    ...fractions({ unit: 'vh', set: 'baleada' }),
  }),
  maxWidth: theme => ({
    ...linearNumeric({ only: 'maxWidth' }),
    ...screen(theme('screens')), // Already comes with screens but I'm including here to be explicit
    ...fractions({ unit: '%', set: 'baleada' }),
    ...fractions({ unit: 'vh', set: 'baleada' }),
  }),
  minHeight: theme => ({
    ...defaultTheme.minHeight,
    ...screen(theme('screens')), // Useful when styling landing pages to look nice in landscape orientation on mobile devices
    ...fractions({ unit: '%', set: 'baleada' }),
    ...fractions({ unit: 'vh', set: 'baleada' }),
  }),
  maxHeight: {
    ...defaultTheme.maxHeight,
    ...fractions({ unit: '%', set: 'baleada' }),
    ...fractions({ unit: 'vh', set: 'baleada' }),
  },
  width: theme => ({
    ...withoutTailwindFractions(defaultTheme.width(theme)),
    ...fractions({ unit: '%', set: 'baleada' }),
    ...fractions({ unit: 'vw', set: 'baleada' }),
    ...screen(theme('screens')),
  }),
  objectPosition: {
    ...defaultTheme.objectPosition,
    'center-top': 'center top',
    'center-bottom': 'center bottom',
  },
  opacity: {
    ...defaultTheme.opacity,
    '33': '.33',
    '67': '.67',
  },
}
