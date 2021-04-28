import TestRunner from 'test-runner'
import { loadModuleRelativeTo } from '../index.mjs'
import path from 'path'
import assert from 'assert'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('CJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModuleRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('MJS file', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModuleRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('CJS file, no ./', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModuleRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('MJS file, no ./', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModuleRelativeTo(modulePath, process.cwd())
  a.equal(result.name, 'someModule')
})

tom.test('multiple paths, one good one bad', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModuleRelativeTo(modulePath, ['/asdfadsfsd', process.cwd()])
  a.equal(result.name, 'someModule')
})

tom.test('no specifier or paths', async function () {
  await a.rejects(
    async () => loadModuleRelativeTo(),
    /specifier and paths expected/
  )
})

tom.test('broken module', async function () {
  await a.rejects(
    async () => loadModuleRelativeTo('broken-module.mjs', path.resolve('./test/fixture')),
    /not defined/
  )
})

export default tom
