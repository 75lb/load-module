import TestRunner from 'test-runner'
import { loadModule } from '../index.mjs'
import path from 'path'
import assert from 'assert'
import getModulePaths from 'current-module-paths'
const __dirname = getModulePaths(import.meta.url).__dirname
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('MJS file: relative to', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('MJS file: resolved from', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('MJS file: invalid options throws', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.mjs'
  await a.rejects(
    () => loadModule(modulePath, { resolvedFromPaths: process.cwd() }),
    /Must supply either/
  )
})

tom.test('MJS file: missing module throws', async function () {
  const modulePath = 'broken'
  await a.rejects(
    () => loadModule(modulePath, { paths: process.cwd() }),
    /Module not found/
  )
})


export default tom
