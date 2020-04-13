import test  from 'ava'
import theme from '../src'
import resolveConfig from 'tailwindcss/resolveConfig'
import expectedKeys from './expectedKeys.fixture'

const properties = Object.keys(expectedKeys)
properties.forEach(property => {
  test(`properly configures ${property}`, t => {
    const resolvedConfig = resolveConfig({ theme }),
          propertyTheme = property === 'colors' ? resolvedConfig.theme.colors.blue : resolvedConfig.theme[property],
          keys = Object.keys(propertyTheme),
          assertion = deepEqualExceptOrder(keys, expectedKeys[property], property)
  
    t.assert(assertion)
  })
})

function deepEqualExceptOrder (array1, array2, property) {
  return (
    array1.every(item => {
      if (array2.includes(item)) {
        return true
      } else {
        console.log(property, { array1: item })
        return false
      }
    })
    &&
    array2.every(item => {
      if (array1.includes(item)) {
        return true
      } else {
        console.log(property, { array2: item })
        return false
      }
    })
  )
}

test('includes non-palette colors', t => {
  const resolvedConfig = resolveConfig({ theme }),
        hues = Object.keys(resolvedConfig.theme.colors),
        nonPaletteColors = ['black', 'white', 'transparent', 'inherit', 'current']

  t.assert(nonPaletteColors.every(hue => hues.includes(hue)))
})