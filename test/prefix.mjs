import TestRunner from 'test-runner'
import loadModule from '../index.mjs'
import assert from 'assert'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('partial module name, prefix', async function () {
  const result = await loadModule('back', { prefix: 'array-' })
  a.equal(result.name, 'arrayify')
})

tom.test('module name, prefix', async function () {
  const result = await loadModule('array-back', { prefix: 'array-' })
  a.equal(result.name, 'arrayify')
})

export default tom
