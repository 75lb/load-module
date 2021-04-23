import TestRunner from 'test-runner'
import loadModule from '../index.mjs'
import path from 'path'
import assert from 'assert'
const a = assert.strict

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tom = new TestRunner.Tom()

tom.test('broken module', async function () {
  await a.rejects(
    async () => loadModule(path.resolve(__dirname, './fixture/broken-module.mjs')),
    /not defined/
  )
})

tom.test('unknown request throws', async function () {
  await a.rejects(
    async () => loadModule('./adsfdf'),
    /Cannot find/
  )
})

tom.test('unknown request with paths throws', async function () {
  await a.rejects(
    async () => loadModule('./adsfdf', { paths: '/some/where/wrong' }),
    /Cannot find/
  )
})

tom.test('no request', async function () {
  await a.rejects(
    async () => loadModule(),
    /specifier expected/
  )
})

export default tom
