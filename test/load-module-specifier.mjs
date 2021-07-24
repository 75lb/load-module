import TestRunner from 'test-runner'
import { loadModuleSpecifier } from 'load-module'
import path from 'path'
import assert from 'assert'
import { pathToFileURL } from 'url'
import getModulePaths from 'current-module-paths'
const __dirname = getModulePaths(import.meta.url).__dirname
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('bare specifier: found', async function () {
  const result = await loadModuleSpecifier('array-back')
  a.equal(result.name, 'arrayify')
})

tom.test('bare specifier: not found', async function () {
  const result = await loadModuleSpecifier('djfhfgjksh')
  a.equal(result, null)
})

tom.test('absolute path: cjs found', async function () {
  const modulePath = pathToFileURL(path.resolve(__dirname, './fixture/loadModule/some-module/lib/some-module.cjs')).href
  const result = await loadModuleSpecifier(modulePath)
  a.equal(result.name, 'someModule')
})

tom.test('absolute path: cjs not found', async function () {
  const modulePath = pathToFileURL(path.resolve(__dirname, './fixture/loadModule/some-module/lib/some-module.cjsasdadsf')).href
  const result = await loadModuleSpecifier(modulePath)
  a.equal(result, null)
})

tom.test('no specifier', async function () {
  await a.rejects(
    async () => loadModuleSpecifier(),
    /specifier expected/
  )
})

tom.test('broken module', async function () {
  await a.rejects(
    async () => loadModuleSpecifier(pathToFileURL(path.resolve(__dirname, './fixture/broken-module.mjs')).href),
    /not defined/
  )
})

export default tom
