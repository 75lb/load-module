const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const tom = module.exports = new Tom('simple')

const noOptions = tom.test('no options')

noOptions.test('module name', function () {
  const result = loadModule('array-back')
  a.strictEqual(result.name, 'arrayify')
})

const relative = tom.test('relative path')

relative.test('to file', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

relative.test('to module dir', function () {
  const modulePath = './test/fixture/loadModule/some-module'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

relative.test('to file, no ./', function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

relative.test('to module dir, no ./', function () {
  const modulePath = 'test/fixture/loadModule/some-module'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

const absolute = tom.test('absolute path')

absolute.test('to file', function () {
  const modulePath = path.resolve(__dirname, './fixture/loadModule/some-module/lib/some-module.js')
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

absolute.test('to module dir', function () {
  const modulePath = path.resolve(__dirname, 'fixture/loadModule/some-module')
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})
