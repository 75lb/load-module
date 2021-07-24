import TestRunner from 'test-runner'
import { loadModuleSpecifier } from 'load-module'
import path from 'path'
import assert from 'assert'
import os from 'os'

import { fileURLToPath } from 'url'
const a = assert.strict
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tom = new TestRunner.Tom()

if (os.platform() === 'linux') {
  tom.test('to case-sensitive file', async function () {
    const modulePath = path.resolve(__dirname, './fixture/Case-Sensitive.mjs')
    const result = await loadModuleSpecifier(modulePath)
    a.equal(result, 'ok')
  })

  tom.test('incorrect filename case throws', async function () {
    const modulePath = path.resolve(__dirname, './fixture/case-sensitive.mjs')
    const result = await loadModuleSpecifier(modulePath)
    a.equal(result, null)
  })
}

export default tom
