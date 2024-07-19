const TestRunner = require('test-runner')
const a = require('assert').strict
const { loadModule, loadModuleSpecifier } = require('load-module')

const tom = new TestRunner.Tom()

tom.test('MJS file: relative to', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.js'
  const result = await loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('CJS file: relative to', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.cjs'
  const result = await loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

module.exports = tom
