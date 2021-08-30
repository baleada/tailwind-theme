import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { theme } from '../../src/index.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import { expectedPluginKeys } from '../fixtures/expectedPluginKeys.js'

const suite = createSuite('theme (node)')

const properties = Object.keys(expectedPluginKeys)
properties.forEach(property => {
  suite(`properly configures ${property}`, context => {
    const resolvedConfig = resolveConfig({ theme }),
          propertyTheme = property === 'colors' ? resolvedConfig.theme.colors.blue : resolvedConfig.theme[property],
          keys = Object.keys(propertyTheme),
          assertion = equalExceptOrder(keys, expectedPluginKeys[property], property)
          
    assert.ok(assertion)
  })
})

function equalExceptOrder (array1, array2, property) {
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

suite('includes non-palette colors', context => {
  const resolvedConfig = resolveConfig({ theme }),
        hues = Object.keys(resolvedConfig.theme.colors),
        nonPaletteColors = ['black', 'white', 'transparent', 'inherit', 'current']

  assert.ok(nonPaletteColors.every(hue => hues.includes(hue)))
})

suite(`doesn't include unexpected keys`, () => {
  const keys = Object.keys(theme),
        value = true,
        plugins = Object.keys(expectedPluginKeys),
        expected = keys.reduce((expected, key) => {
          if (!plugins.includes(key)) {
            console.log(key)
          }

          return plugins.includes(key) && expected
        }, true)

  
  assert.is(value, expected)
})

suite.run()
