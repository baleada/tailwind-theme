import defaultTheme from 'tailwindcss/defaultTheme'
import linearNumeric from '@baleada/linear-numeric'
import { fractions, em, px, screen } from '@baleada/tailwind-config-utils'

export default {
  theme: {
    ...linearNumeric(),
    colors: {
      ...linearNumeric({ only: 'colors', increment: 10 }) // Tailwind will be adding in-between shades e.g. purple-850
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
      ...fractions('%'),
      ...fractions('vh')
    }),
    minWidth: theme => ({
      ...linearNumeric({ only: 'minWidth' }),
      ...screen(theme('screens')),
      ...fractions('%'),
      ...fractions('vw')
    }),
    maxWidth: (theme, configUtils) => ({
      ...linearNumeric({ only: 'maxWidth' })(theme, configUtils),
      ...fractions('%'),
      ...fractions('vh')
    }),
    minHeight: {
      ...linearNumeric({ only: 'minHeight' }),
      ...fractions('%'),
      ...fractions('vh')
    },
    maxHeight: {
      ...linearNumeric({ only: 'maxHeight' }),
      ...fractions('%'),
      ...fractions('vh')
    },
    width: (theme) => ({
      ...defaultTheme.width(theme),
      ...fractions('%'),
      ...fractions('vw'),
      ...screen(theme('screens')),
    }),
    inset: (theme) => ({
      ...defaultTheme.width(theme),
      ...fractions('%'),
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
  },
  variants: [
    'responsive',
    'group-hover',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ]
}