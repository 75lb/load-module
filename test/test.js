'use strict'
const TestRunner = require('test-runner')
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const runner = new TestRunner()

runner.test('loadModule: unknown path', function () {
  a.throws(
    () => {
      const mod = loadModule('./adsfdf')
      console.error(require('util').inspect(mod, { depth: 6, colors: true }))
    },
    err => {
      return err.code === 'MODULE_NOT_FOUND'
    }
  )
})

runner.test('loadModule: unknown path, module-dir', function () {
  a.throws(
    () => {
      const mod = loadModule('./adsfdf', {
        'module-dir': '/some/where/wrong'
      })
      console.error(require('util').inspect(mod, { depth: 6, colors: true }))
    },
    err => {
      return err.code === 'MODULE_NOT_FOUND'
    }
  )
})

runner.test('loadModule: absolute path to lib', function () {
  const modulePath = path.resolve(__dirname, '..', 'node_modules/command-line-args/lib/command-line-args.js')
  const module = loadModule(modulePath)
  a.strictEqual(module.name, 'commandLineArgs')
})

runner.test('loadModule: full module name', function () {
  const module = loadModule('command-line-args')
  a.strictEqual(module.name, 'commandLineArgs')
})

runner.test('loadModule: partial module name (module-prefix supplied)', function () {
  const module = loadModule('line-args', { 'module-prefix': 'command-' })
  a.strictEqual(module.name, 'commandLineArgs')
})

runner.test('loadModule: full module name (module-prefix supplied)', function () {
  const module = loadModule('command-line-args', { 'module-prefix': 'command-' })
  a.strictEqual(module.name, 'commandLineArgs')
})

runner.test('loadModule: full module name, current dir default', function () {
  const module = loadModule('test/fixture/loadModule/some-module')
  a.strictEqual(module.name, 'someModule')
})

runner.test('loadModule: full module name, current dir default, module-dir', function () {
  const module = loadModule('test/fixture/loadModule/some-module', {
    'module-dir': '/some/where'
  })
  a.strictEqual(module.name, 'someModule')
})

runner.test('loadModule: full module name, module-dir', function () {
  const module = loadModule('some-module', {
    'module-dir': path.resolve('test', 'fixture', 'loadModule')
  })
  a.strictEqual(module.name, 'someModule')
})

runner.test('loadModule: full module name, multiple module-dirs', function () {
  const module = loadModule('next-module', {
    'module-dir': [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ]
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('loadModule: partial module name, multiple module-dirs, module-prefix', function () {
  const module = loadModule('module', {
    'module-dir': [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    'module-prefix': 'next-'
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('loadModule: full module name, multiple module-dirs, module-prefix', function () {
  const module = loadModule('next-module', {
    'module-dir': [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    'module-prefix': 'next-'
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('loadModule: partial module name (module-prefix supplied), module-dir', function () {
  const module = loadModule('module', {
    'module-dir': path.resolve('test', 'fixture', 'loadModule'),
    'module-prefix': 'some-'
  })
  a.strictEqual(module.name, 'someModule')
})
