const TestRunner = require('test-runner')
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const runner = new TestRunner()

runner.test('unknown request throws', function () {
  a.throws(
    () => loadModule('./adsfdf'),
    /Cannot find/
  )
})

runner.test('unknown request with paths throws', function () {
  a.throws(
    () => loadModule('./adsfdf', { paths: '/some/where/wrong' }),
    /Cannot find/
  )
})

runner.test('absolute path to lib', function () {
  const modulePath = path.resolve(__dirname, '..', 'node_modules/array-back/index.js')
  const module = loadModule(modulePath)
  a.strictEqual(module.name, 'arrayify')
})

runner.test('relative path to a dir', function () {
  const modulePath = path.resolve(__dirname, 'fixture/loadModule/some-module')
  const module = loadModule(modulePath)
  a.strictEqual(module.name, 'someModule')
})

runner.test('full module name', function () {
  const module = loadModule('array-back')
  a.strictEqual(module.name, 'arrayify')
})

runner.test('full module name, current dir default', function () {
  const module = loadModule('test/fixture/loadModule/some-module')
  a.strictEqual(module.name, 'someModule')
})

runner.test('full module name, paths', function () {
  const module = loadModule('test/fixture/loadModule/some-module', {
    paths: [ '.', '/some/where' ]
  })
  a.strictEqual(module.name, 'someModule')
})

runner.test('partial module name (prefix supplied)', function () {
  const module = loadModule('back', { prefix: 'array-' })
  a.strictEqual(module.name, 'arrayify')
})

runner.test('full module name (prefix supplied)', function () {
  const module = loadModule('array-back', { prefix: 'array-' })
  a.strictEqual(module.name, 'arrayify')
})

runner.test('module folder with paths does not resolve', function () {
  a.throws(
    () => loadModule('some-module', { paths: path.resolve('.', 'test', 'fixture', 'loadModule') }),
    /Cannot find/
  )
})

runner.test('full module name, multiple paths', function () {
  const module = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ]
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('partial module name, multiple paths, prefix', function () {
  const module = loadModule('module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    prefix: 'next-'
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('full module name, multiple paths, prefix', function () {
  const module = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    prefix: 'next-'
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('broken module', function () {
  a.throws(
    () => loadModule('./test/fixture/broken-module'),
    /not defined/
  )
})
