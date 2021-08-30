import { writeFileSync } from 'fs'
import { empty } from '@baleada/prepare'
import { theme as baleadaTheme } from '../lib/index.js'
import defaultConfig from 'tailwindcss/defaultConfig.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'

const resolvedBaleadaTheme = resolveConfig({ theme: baleadaTheme }).theme,
      resolvedDefaultTheme = resolveConfig(defaultConfig).theme
  
function docs () {
  empty('docs/class-references')
  const baleadaThemeProperties = Object.keys(prefixes),
        propertyMetadata = baleadaThemeProperties.map(property => {
          console.log(property)
          const suffixes = property === 'blue' 
                  ? Object.keys(resolvedBaleadaTheme.colors.blue) 
                  : Object.keys(resolvedBaleadaTheme[property]),
                suffixMetadata = suffixes.map(suffix => {
                  const value = property === 'blue' 
                    ? resolvedBaleadaTheme.colors.blue[suffix] 
                    : resolvedBaleadaTheme[property][suffix]
                      
                  return {
                    suffix,
                    value,
                    tailwindEquivalent: (() => {
                      const suffixes = property === 'blue' 
                        ? Object.keys(resolvedDefaultTheme.colors.blue) 
                        : Object.keys(resolvedDefaultTheme[property])
                      return suffixes.find(suffix => {
                        return property === 'blue'
                          ? resolvedDefaultTheme.colors.blue[suffix] === value
                          : resolvedDefaultTheme[property][suffix] === value
                      })
                    })(),
                  }
                })

          return {
            property,
            name: prefixes[property].name,
            prefix: prefixes[property].prefix,
            notes: prefixes[property].notes,
            suffixMetadata,
          }
        }),
        classReferences = toClassReferences(propertyMetadata)

  classReferences.forEach(({ name, contents }) => {
    writeFileSync(
      `./docs/class-references/${name.toLowerCase().replace(/ /g, '-')}.prose`,
      contents
    )
  })
}

function toClassReferences (propertyMetadata) {
  return propertyMetadata.map(({ property, name, prefix, notes, suffixMetadata }) => {
    const tableBody = suffixMetadata.reduce((tableBody, { suffix, value, tailwindEquivalent }, index) => {
      return `\
${tableBody}${index === 0 ? '' : '\n'}\
| ${getClass(prefix, suffix, property)} | ${getClass(prefix, tailwindEquivalent, property)} | \`${value}\` |\
`
    }, ''),
          frontMatter = `\
---\n\
title: ${name} \n\
tags: Configuration utilities, Tailwind CSS\n\
publish: true\n\
order: 0\n\
---\n\
\n\
`,
          contents = `\
${frontMatter}\n\
\n\
${notes ? notes + '\n\n' : ''}\
::: ariaLabel="${name} class reference"\n\
| Class${property === 'screens' ? ' prefix' : ''} | Tailwind equivalent | Value |\n\
| --- | --- | --- |\n\
${tableBody}\n\
:::\n\n\
`

    return { name, contents }
  })
}

function getClass (prefix, suffix, property) {
  const naiveClass = (() => {
    if (property === 'screens') {
      return suffix === undefined
        ? 'none'
        : `\`${suffix}:\``
    } else {
      return suffix === undefined
        ? 'none'
        : suffix.startsWith('-')
          ? `\`.-${prefix}-${suffix.split('').slice(1).join('')}\``
          : `\`.${prefix}-${suffix}\``
    }
  })()

  return naiveClass.replace(/-DEFAULT/, '')
}

const prefixes = {
  blue: {
    name: 'Colors',
    prefix: 'bg-blue',
    notes: 'Blue is shown here as an example, but Baleada Theme includes all of the default Tailwind colors.\n\nBaleada Theme also includes Tailwind\'s default standalone colors `black`, `white`, and `transparent`, and adds `current` and `inherit` to expose those keyword colors.',
  },
  borderRadius: {
    name: 'Border radius',
    prefix: 'rounded',
    notes: '',
  },
  borderWidth: {
    name: 'Border width',
    prefix: 'border',
    notes: '',
  },
  blur: {
    name: 'Blur',
    prefix: 'blur',
    notes: '',
  },
  boxShadow: {
    name: 'Box shadow',
    prefix: 'shadow',
    notes: '',
  },
  dropShadow: {
    name: 'Drop shadow',
    prefix: 'drop-shadow',
    notes: '',
  },
  flexGrow: {
    name: 'Flex grow',
    prefix: 'flex-grow',
    notes: '',
  },
  flexShrink: {
    name: 'Flex shrink',
    prefix: 'flex-shrink',
    notes: '',
  },
  fontSize: {
    name: 'Font size',
    prefix: 'text',
    notes: '',
  },
  fontWeight: {
    name: 'Font weight',
    prefix: 'font',
    notes: '',
  },
  letterSpacing: {
    name: 'Letter spacing',
    prefix: 'tracking',
    notes: '',
  },
  lineHeight: {
    name: 'Line height',
    prefix: 'leading',
    notes: '',
  },
  maxHeight: {
    name: 'Max height',
    prefix: 'max-h',
    notes: '',
  },
  maxWidth: {
    name: 'Max width',
    prefix: 'max-w',
    notes: '',
  },
  minHeight: {
    name: 'Min height',
    prefix: 'min-h',
    notes: '',
  },
  minWidth: {
    name: 'Min width',
    prefix: 'min-w',
    notes: '',
  },
  strokeWidth: {
    name: 'Stroke width',
    prefix: 'stroke',
    notes: '',
  },
  transitionDuration: {
    name: 'Transition duration',
    prefix: 'duration',
    notes: '',
  },
  transitionDelay: {
    name: 'Transition delay',
    prefix: 'delay',
    notes: '',
  },
  screens: {
    name: 'Screens',
    prefix: '',
    notes: 'Baleada Theme\'s `all:` screen is configured so that it shows up last in your cascade. That way, you can prefix responsive classes with `all:` to make them override other styles. Think of it as a less drastic `!important`.',
  },
  height: {
    name: 'Height',
    prefix: 'h',
    notes: '',
  },
  width: {
    name: 'Width',
    prefix: 'w',
    notes: '',
  },
  inset: {
    name: 'Inset',
    prefix: 'top',
    notes: '`.top` is shown here as an example, but the same configuration applies for `.right`, `.bottom`, and `.left`.',
  },
  margin: {
    name: 'Margin',
    prefix: 'm',
    notes: '`.m` is shown here, but the same configuration applies for `.mt`, `.mr`, `.mb`, `.ml`, `.mx`, and `.my`.',
  },
  padding: {
    name: 'Padding',
    prefix: 'p',
    notes: '`.p` is shown here, but the same configuration applies for `.pt`, `.pr`, `.pb`, `.pl`, `.px`, and `.py`.',
  },
  translate: {
    name: 'Translate',
    prefix: 'translate-x',
    notes: '`.translate-x` is shown here, but the same configuration applies for `.translate-y`.',
  },
  gap: {
    name: 'Gap',
    prefix: 'gap',
    notes: '`.gap` is shown here, but the same configuration applies for `.row-gap` and `.col-gap`.',
  },
  space: {
    name: 'Space',
    prefix: 'space-x',
    notes: '`.space-x` is shown here, but the same configuration applies for `.space-y`.',
  },
  divideWidth: {
    name: 'Divide width',
    prefix: 'divide-x',
    notes: '`.divide-x` is shown here, but the same configuration applies for `.divide-y`.',
  },
  opacity: {
    name: 'Opacity',
    prefix: 'opacity',
    notes: '',
  },
}

docs()
