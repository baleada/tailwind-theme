import defaultTheme from 'tailwindcss/defaultTheme'
import linearNumeric from '@baleada/tailwind-linear-numeric'
import { fractions, withoutTailwindFractions, em, px, screen } from '@baleada/tailwind-theme-utils'

export default {
  ...linearNumeric(),
  colors: {
    current: 'currentColor',
    inherit: 'inherit',
    ...defaultTheme.colors,
    ...linearNumeric({ only: 'colors', increment: 10 }), // Tailwind will be adding in-between shades e.g. purple-850
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
      '2': '0.25em',
      '3': '.5em',
      '4': '1em',
      '5': '1.25em',
      '6': '1.5em',
    }),
  },
  height: theme => ({
    ...defaultTheme.height(theme),
    ...fractions({ unit: '%', mode: 'baleada' }),
    ...fractions({ unit: 'vh', mode: 'baleada' }),
  }),
  minWidth: theme => ({
    ...linearNumeric({ only: 'minWidth' }),
    ...screen(theme('screens')),
    ...fractions({ unit: '%', mode: 'baleada' }),
    ...fractions({ unit: 'vw', mode: 'baleada' }),
  }),
  maxWidth: theme => ({
    ...linearNumeric({ only: 'maxWidth' }),
    ...screen(theme('screens')), // Already comes with screens but I'm including here to be explicit
    ...fractions({ unit: '%', mode: 'baleada' }),
    ...fractions({ unit: 'vh', mode: 'baleada' }),
  }),
  minHeight: theme => ({
    ...linearNumeric({ only: 'minHeight' }),
    ...screen(theme('screens')), // Useful when styling landing pages to look nice in landscape orientation on mobile devices
    ...fractions({ unit: '%', mode: 'baleada' }),
    ...fractions({ unit: 'vh', mode: 'baleada' }),
  }),
  maxHeight: {
    ...linearNumeric({ only: 'maxHeight' }),
    ...fractions({ unit: '%', mode: 'baleada' }),
    ...fractions({ unit: 'vh', mode: 'baleada' }),
  },
  width: theme => ({
    ...withoutTailwindFractions(defaultTheme.width(theme)),
    ...fractions({ unit: '%', mode: 'baleada' }),
    ...fractions({ unit: 'vw', mode: 'baleada' }),
    ...screen(theme('screens')),
  }),
  inset: theme => ({
    ...withoutTailwindFractions(defaultTheme.width(theme)),
    ...fractions({ unit: '%', mode: 'baleada' }),
  }),
  objectPosition: {
    ...defaultTheme.objectPosition,
    'center-top': 'center top',
    'center-bottom': 'center bottom',
  },
  opacity: {
    '0': '0',
    '10': '.10',
    '20': '.20',
    '25': '.25',
    '30': '.30',
    '33': '.33',
    '40': '.40',
    '50': '.50',
    '60': '.60',
    '67': '.67',
    '70': '.70',
    '75': '.75',
    '80': '.80',
    '90': '.90',
    '100': '1.00',
  },
  zIndex: {
    '0': '0',
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    '60': '60',
    '70': '70',
    '80': '80',
    '90': '90',
    '100': '100',
  },
}