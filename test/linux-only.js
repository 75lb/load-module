const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert')
const path = require('path')
const os = require('os')

const tom = module.exports = new Tom('linux')

if (os.platform() === 'linux') {
  tom.test('to file', function () {
    const modulePath = './test/fixture/Case-Sensitive.js'
    const result = loadModule(modulePath)
    a.strictEqual(result, 'ok')
  })

  tom.test('incorrect filename case throws', function () {
    a.throws(
      () => loadModule('./test/fixture/case-sensitive.js'),
      /Cannot find/
    )
  })
}
