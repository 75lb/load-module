const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const tom = module.exports = new Tom('load-module')

tom.test('relative path to file', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'someModule')
})

tom.test('relative path to file, paths', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath, { paths: '.' })
  a.strictEqual(result.name, 'someModule')
})

tom.test('absolute path to file', function () {
  const modulePath = path.resolve(__dirname, '../node_modules/array-back/index.js')
  const result = loadModule(modulePath)
  a.strictEqual(result.name, 'arrayify')
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

tom.test('module name, paths includes current dir', function () {
  const result = loadModule('test/fixture/loadModule/some-module', { paths: '.' })
  a.strictEqual(result.name, 'someModule')
})

tom.test('module name, paths', function () {
  const result = loadModule('test/fixture/loadModule/some-module', {
    paths: [ '.', '/some/where' ]
  })
  a.strictEqual(result.name, 'someModule')
})

tom.test('partial module name, prefix', function () {
  const result = loadModule('back', { prefix: 'array-' })
  a.strictEqual(result.name, 'arrayify')
})

tom.test('module name, prefix', function () {
  const result = loadModule('array-back', { prefix: 'array-' })
  a.strictEqual(result.name, 'arrayify')
})

tom.test('module dir, path', function () {
  const result = loadModule('some-module', { paths: path.resolve('./test/fixture/loadModule') })
  a.strictEqual(result.name, 'someModule')
})

tom.test('module file, paths', function () {
  const result = loadModule('some-module.js', { paths: path.resolve('./test/fixture/loadModule/some-module/lib') })
  a.strictEqual(result.name, 'someModule')
})

tom.test('module name, multiple paths', function () {
  const result = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ]
  })
  a.strictEqual(result.name, 'nextModule')
})

tom.test('partial module name, multiple paths, prefix', function () {
  const result = loadModule('module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    prefix: 'next-'
  })
  a.strictEqual(result.name, 'nextModule')
})

tom.test('module name, multiple paths, prefix', function () {
  const result = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    prefix: 'next-'
  })
  a.strictEqual(result.name, 'nextModule')
})

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
