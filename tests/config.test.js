import test  from 'ava'
import config from '../src'
import resolveConfig from 'tailwindcss/resolveConfig'
import expectedKeys from './expectedKeys.fixture'

const properties = Object.keys(expectedKeys)
properties.forEach(property => {
  test(`properly configures ${property}`, t => {
    const defaultTheme = resolveConfig(config),
          theme = property === 'colors' ? defaultTheme.theme.colors.blue : defaultTheme.theme[property],
          keys = Object.keys(theme)
  
    t.deepEqual(keys, expectedKeys[property])
  })
})
