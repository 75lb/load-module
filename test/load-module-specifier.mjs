import TestRunner from 'test-runner'
import { loadModuleSpecifier } from '../index.mjs'
import path from 'path'
import assert from 'assert'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
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
  const modulePath = path.resolve(__dirname, './fixture/loadModule/some-module/lib/some-module.cjs')
  const result = await loadModuleSpecifier(modulePath)
  a.equal(result.name, 'someModule')
})

tom.test('absolute path: cjs not found', async function () {
  const modulePath = path.resolve(__dirname, './fixture/loadModule/some-module/lib/some-module.cjsasdadsf')
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
    async () => loadModuleSpecifier(path.resolve(__dirname, './fixture/broken-module.mjs')),
    /not defined/
  )
})

export default tom
