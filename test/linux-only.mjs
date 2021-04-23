import TestRunner from 'test-runner'
import loadModule from '../index.mjs'
import path from 'path'
import assert from 'assert'
import os from 'os'
const a = assert.strict

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tom = new TestRunner.Tom()

if (os.platform() === 'linux') {
  tom.test('to case-sensitive file', async function () {
    const modulePath = path.resolve(__dirname, './fixture/Case-Sensitive.mjs')
    const result = await loadModule(modulePath)
    a.equal(result, 'ok')
  })

  tom.test('incorrect filename case throws', async function () {
    await a.rejects(
      async () => loadModule(path.resolve(__dirname, './fixture/case-sensitive.mjs')),
      /Cannot find/
    )
  })
}

export default tom
