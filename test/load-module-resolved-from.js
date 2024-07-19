import TestRunner from 'test-runner'
import { loadModuleResolvedFrom } from 'load-module'
import path from 'path'
import assert from 'assert'
import getModulePaths from 'current-module-paths'
const __dirname = getModulePaths(import.meta.url).__dirname
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('CJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModuleResolvedFrom(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('MJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = await loadModuleResolvedFrom(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('CJS file, no ./: fails as treated as bare specifier', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModuleResolvedFrom(modulePath, process.cwd())
  a.equal(result, null)
})

tom.test('MJS file, no ./: fails as treated as bare specifier', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.js'
  const result = await loadModuleResolvedFrom(modulePath, process.cwd())
  a.equal(result, null)
})

tom.test('multiple paths, one good one bad', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModuleResolvedFrom(modulePath, ['/asdfadsfsd', process.cwd()])
  a.equal(result.name, 'someModule')
})

tom.test('no specifier or paths', async function () {
  await a.rejects(
    async () => loadModuleResolvedFrom(),
    /specifier and paths expected/
  )
})

tom.test('broken module', async function () {
  await a.rejects(
    async () => loadModuleResolvedFrom('./broken-module.js', path.resolve('./test/fixture')),
    /not defined/
  )
})

export default tom
