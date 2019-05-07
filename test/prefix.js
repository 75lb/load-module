const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const tom = module.exports = new Tom('prefix')

tom.test('partial module name, prefix', function () {
  const result = loadModule('back', { prefix: 'array-' })
  a.strictEqual(result.name, 'arrayify')
})

tom.test('module name, prefix', function () {
  const result = loadModule('array-back', { prefix: 'array-' })
  a.strictEqual(result.name, 'arrayify')
})
