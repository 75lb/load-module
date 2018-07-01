const TestRunner = require('test-runner')
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const runner = new TestRunner()

runner.test('relative path to file', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

runner.test('relative path to file, paths', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath, { paths: '.' })
  a.strictEqual(result.name, 'someModule')
})

runner.test('absolute path to file', function () {
  const modulePath = path.resolve(__dirname, '../node_modules/array-back/index.js')
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'arrayify')
})

runner.test('relative path to module dir', function () {
  const modulePath = './test/fixture/loadModule/some-module'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

runner.test('absolute path to module dir', function () {
  const modulePath = path.resolve(__dirname, 'fixture/loadModule/some-module')
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

runner.test('module name', function () {
  const result = loadModule('array-back')
  a.strictEqual(result.name, 'arrayify')
})

runner.test('module name, paths includes current dir', function () {
  const result = loadModule('test/fixture/loadModule/some-module', { paths: '.' })
  a.strictEqual(result.name, 'someModule')
})

runner.test('module name, paths', function () {
  const result = loadModule('test/fixture/loadModule/some-module', {
    paths: [ '.', '/some/where' ]
  })
  a.strictEqual(result.name, 'someModule')
})

runner.test('partial module name, prefix', function () {
  const result = loadModule('back', { prefix: 'array-' })
  a.strictEqual(result.name, 'arrayify')
})

runner.test('module name, prefix', function () {
  const result = loadModule('array-back', { prefix: 'array-' })
  a.strictEqual(result.name, 'arrayify')
})

runner.test('module dir, path', function () {
  const result = loadModule('some-module', { paths: path.resolve('./test/fixture/loadModule') })
  a.strictEqual(result.name, 'someModule')
})

runner.test('module file, paths', function () {
  const result = loadModule('some-module.js', { paths: path.resolve('./test/fixture/loadModule/some-module/lib') })
  a.strictEqual(result.name, 'someModule')
})

runner.test('module name, multiple paths', function () {
  const result = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ]
  })
  a.strictEqual(result.name, 'nextModule')
})

runner.test('partial module name, multiple paths, prefix', function () {
  const result = loadModule('module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    prefix: 'next-'
  })
  a.strictEqual(result.name, 'nextModule')
})

runner.test('module name, multiple paths, prefix', function () {
  const result = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    prefix: 'next-'
  })
  a.strictEqual(result.name, 'nextModule')
})

runner.test('broken module', function () {
  a.throws(
    () => loadModule('./test/fixture/broken-module'),
    /not defined/
  )
})

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

runner.test('no request', function () {
  a.throws(
    () => loadModule(),
    /request expected/
  )
})
