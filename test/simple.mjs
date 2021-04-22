import TestRunner from 'test-runner'
// import loadModule from '../index.mjs'
import path from 'path'
import assert from 'assert'
const a = assert.strict

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const tom = new TestRunner.Tom()

async function loadModuleId (moduleId, resolveThis) {
  try {
    if (resolveThis) {
      moduleId = require.resolve(moduleId, { paths: [process.cwd()] })
    }
    const mod = await import(moduleId)
    return mod.default
  } catch (err) {
    // console.error('FAILED', err)
    return null
  }
}

async function loadModule (moduleId) {
  let output
  /* absolute path */
  if (path.isAbsolute(moduleId)) {
    return loadModuleId(moduleId)

  /* relative path or bare specifier */
  } else {
    // /* try loading as a bare specifier */
    // console.log('BARE - any point to this since loadModule will only be used in cases where the user is loading a plugin?')
    // output = await loadModuleId(moduleId)
    // if (output) return output

    /* bare specifier from cwd */
    // console.log('BARE CWD', moduleId)
    output = await loadModuleId(moduleId, true)
    if (output) return output

    /* try loading as a relative path */
    // console.error('RELATIVE FROM CWD', moduleId)
    output = await loadModuleId(path.resolve(process.cwd(), moduleId))
  }
  return output
}

const noOptions = tom.group('no options')

noOptions.test('module name', async function () {
  const result = await loadModule('array-back')
  a.equal(result.name, 'arrayify')
})

const relative = tom.group('relative path')

relative.test('relative path to CJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModule(modulePath)
  a.equal(result.name, 'someModule')
})

relative.test('relative path to MJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath)
  a.equal(result.name, 'someModule')
})

relative.test('relative path to CJS file, no ./', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModule(modulePath)
  a.equal(result.name, 'someModule')
})

relative.test('relative path to MJS file, no ./', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath)
  a.equal(result.name, 'someModule')
})

const absolute = tom.group('absolute path')

absolute.test('to absolute file', async function () {
  const modulePath = path.resolve(__dirname, './fixture/loadModule/some-module/lib/some-module.cjs')
  const result = await loadModule(modulePath)
  a.equal(result.name, 'someModule')
})

export default tom
