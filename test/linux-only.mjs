const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert').strict
const os = require('os')

const tom = module.exports = new Tom()

if (os.platform() === 'linux') {
  tom.test('to file', function () {
    const modulePath = './test/fixture/Case-Sensitive.js'
    const result = loadModule(modulePath)
    a.equal(result, 'ok')
  })

  tom.test('incorrect filename case throws', function () {
    a.throws(
      () => loadModule('./test/fixture/case-sensitive.js'),
      /Cannot find/
    )
  })
}
