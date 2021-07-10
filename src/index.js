import defaultTheme from 'tailwindcss/defaultTheme.js'
import linearNumeric from '@baleada/tailwind-linear-numeric'
import { screen } from '@baleada/tailwind-theme-utils'

export default {
  ...linearNumeric(),
  colors: {
    inherit: 'inherit',
    ...linearNumeric({ only: 'colors', increment: 10 }), // Tailwind 2.0.0 added 50-level shades. Default linear numeric is bg-{color}-0.5, but I prefer bg-{color}-5, so I use an increment of 10.
  },
  screens: {
    ...defaultTheme.screens,
    all: 0,
  },
  minWidth: theme => ({
    ...defaultTheme.minWidth,
    ...screen(theme('screens')),
  }),
  maxWidth: theme => ({
    ...linearNumeric({ only: 'maxWidth' }),
    ...screen(theme('screens')), // Already comes with screens but I'm including here to be explicit
  }),
  minHeight: theme => ({
    ...defaultTheme.minHeight,
    ...screen(theme('screens')), // Useful when styling landing pages to look nice in landscape orientation on mobile devices
  }),
  maxHeight: {
    ...defaultTheme.maxHeight,
  },
  width: theme => ({
    ...defaultTheme.width(theme),
    ...screen(theme('screens')),
  }),
  objectPosition: {
    ...defaultTheme.objectPosition,
    'center-top': 'center top',
    'center-bottom': 'center bottom',
  },
}
