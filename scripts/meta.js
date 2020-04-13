const fs = require('fs'),
      { empty } = require('@baleada/prepare'),
      baleadaTheme = require('../lib/index.js'),
      defaultConfig = require('tailwindcss/defaultConfig'),
      resolveConfig = require('tailwindcss/resolveConfig'),
      resolvedBaleadaTheme = resolveConfig({ theme: baleadaTheme }).theme,
      resolvedDefaultTheme = resolveConfig(defaultConfig).theme

  
function meta () {
  empty('metadata/class-references')
  const baleadaThemeProperties = Object.keys(prefixes),
        propertyMetadata = baleadaThemeProperties.map(property => {
          const suffixes = property === 'blue' 
                  ? Object.keys(resolvedBaleadaTheme.colors.blue) 
                  : Object.keys(resolvedBaleadaTheme[property])
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
    fs.writeFileSync(
      `./metadata/class-references/${name.toLowerCase().replace(/ /g, '-')}.md`,
      contents
    )
  })
}

function toClassReferences (propertyMetadata) {
  return propertyMetadata.map(({ property, name, prefix, notes, suffixMetadata }) => {
    console.log(name)
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
  boxShadow: {
    name: 'Box shadow',
    prefix: 'shadow',
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
    notes: 'Top is shown here as an example, but the same configuration applies for `right`, `bottom`, and `left`.',
  },
  margin: {
    name: 'Margin',
    prefix: 'm',
    notes: '',
  },
  padding: {
    name: 'Padding',
    prefix: 'p',
    notes: '',
  },
  objectPosition: {
    name: 'Object position',
    prefix: 'object',
    notes: '',
  },
  opacity: {
    name: 'Opacity',
    prefix: 'opacity',
    notes: '',
  },
  zIndex: {
    name: 'Z-index',
    prefix: 'z',
    notes: '',
  },
}

meta()