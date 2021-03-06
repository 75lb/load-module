const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert').strict

const tom = module.exports = new Tom()

tom.test('partial module name, prefix', function () {
  const result = loadModule('back', { prefix: 'array-' })
  a.equal(result.name, 'arrayify')
})

tom.test('module name, prefix', function () {
  const result = loadModule('array-back', { prefix: 'array-' })
  a.equal(result.name, 'arrayify')
})
