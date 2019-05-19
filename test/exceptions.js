const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const tom = module.exports = new Tom('exceptions')

tom.test('broken module', function () {
  a.throws(
    () => loadModule('./test/fixture/broken-module'),
    /not defined/
  )
})

tom.test('unknown request throws', function () {
  a.throws(
    () => loadModule('./adsfdf'),
    /Cannot find/
  )
})

tom.test('unknown request with paths throws', function () {
  a.throws(
    () => loadModule('./adsfdf', { paths: '/some/where/wrong' }),
    /Cannot find/
  )
})

tom.test('no request', function () {
  a.throws(
    () => loadModule(),
    /request expected/
  )
})
