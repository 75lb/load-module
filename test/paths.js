const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert').strict
const path = require('path')

const tom = module.exports = new Tom('paths')

tom.test('modulePath: relative file, paths: "."', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath, { paths: '.' })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative file, paths: "." ❕', function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath, { paths: '.' })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative file, paths: absolute cwd', function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative file, paths: absolute cwd ❕', function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.js'
  const result = loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: absolute file, paths: absolute cwd', function () {
  const modulePath = path.resolve('./test/fixture/loadModule/some-module/lib/some-module.js')
  const result = loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative dir, paths: "."', function () {
  const result = loadModule('./test/fixture/loadModule/some-module', { paths: '.' })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative dir, paths: "."❕', function () {
  const result = loadModule('test/fixture/loadModule/some-module', { paths: '.' })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative dir, paths: [ good, bad ] ❕', function () {
  const result = loadModule('test/fixture/loadModule/some-module', {
    paths: ['.', '/some/where']
  })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative dir, paths: [ bad, good ] ❕', function () {
  const result = loadModule('test/fixture/loadModule/some-module', {
    paths: ['/some/where', '.']
  })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative dir, paths: [ good, bad ]', function () {
  const result = loadModule('./test/fixture/loadModule/some-module', {
    paths: ['.', '/some/where']
  })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative dir, paths: [ bad, good ]', function () {
  const result = loadModule('./test/fixture/loadModule/some-module', {
    paths: ['/some/where', '.']
  })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: name, paths: absolute', function () {
  const modulePath = 'some-module'
  const paths = path.resolve('./test/fixture/loadModule')
  const result = loadModule(modulePath, { paths })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: filename, paths: absolute', function () {
  const modulePath = 'some-module.js'
  const paths = path.resolve('./test/fixture/loadModule/some-module/lib')
  const result = loadModule(modulePath, { paths })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: name, paths: absolute [ bad, good ]', function () {
  const result = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ]
  })
  a.equal(result.name, 'nextModule')
})

tom.test('modulePath: name, paths: absolute [ good, bad ]', function () {
  const result = loadModule('next-module', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule2'),
      path.resolve('test', 'fixture', 'loadModule')
    ]
  })
  a.equal(result.name, 'nextModule')
})

tom.test('modulePath: "index", paths: absolute [ good ]', function () {
  const result = loadModule('index', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule2', 'next-module')
    ]
  })
  a.equal(result.name, 'nextModule')
})
