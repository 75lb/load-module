import TestRunner from 'test-runner'
import { loadModulePathRelativeTo } from '../index.mjs'
import path from 'path'
import assert from 'assert'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('CJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModulePathRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('MJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModulePathRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('CJS file, no ./', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModulePathRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('MJS file, no ./', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModulePathRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('multiple paths, one good one bad', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModulePathRelativeTo(modulePath, ['/asdfadsfsd', process.cwd()])
  a.equal(result.name, 'someModule')
})

tom.test('no specifier or paths', async function () {
  await a.rejects(
    async () => loadModulePathRelativeTo(),
    /specifier and paths expected/
  )
})

export default tom
