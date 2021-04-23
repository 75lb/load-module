import TestRunner from 'test-runner'
import loadModule from '../index.mjs'
import path from 'path'
import assert from 'assert'
const a = assert.strict

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tom = new TestRunner.Tom()

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
