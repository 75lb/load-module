const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const tom = module.exports = new Tom('simple')

tom.test('relative path to file', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

tom.test('absolute path to file', function () {
  const modulePath = path.resolve(__dirname, './fixture/loadModule/some-module/lib/some-module.js')
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

tom.test('relative path to module dir', function () {
  const modulePath = './test/fixture/loadModule/some-module'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

tom.test('absolute path to module dir', function () {
  const modulePath = path.resolve(__dirname, 'fixture/loadModule/some-module')
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

tom.test('module name', function () {
  const result = loadModule('array-back')
  a.strictEqual(result.name, 'arrayify')
})
