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
        moduleDir: '/some/where/wrong'
      })
      console.error(require('util').inspect(mod, { depth: 6, colors: true }))
    },
    err => {
      return err.code === 'MODULE_NOT_FOUND'
    }
  )
})

runner.test('loadModule: absolute path to lib', function () {
  const modulePath = path.resolve(__dirname, '..', 'node_modules/array-back/index.js')
  const module = loadModule(modulePath)
  a.strictEqual(module.name, 'arrayify')
})

runner.test('loadModule: relative path to a dir', function () {
  const modulePath = path.resolve(__dirname, 'fixture/loadModule/some-module')
  const module = loadModule(modulePath)
  a.strictEqual(module.name, 'someModule')
})

runner.test('loadModule: full module name', function () {
  const module = loadModule('array-back')
  a.strictEqual(module.name, 'arrayify')
})

runner.test('loadModule: partial module name (module-prefix supplied)', function () {
  const module = loadModule('back', { modulePrefix: 'array-' })
  a.strictEqual(module.name, 'arrayify')
})

runner.test('loadModule: full module name (module-prefix supplied)', function () {
  const module = loadModule('back', { modulePrefix: 'array-' })
  a.strictEqual(module.name, 'arrayify')
})

runner.test('loadModule: full module name, current dir default', function () {
  const module = loadModule('test/fixture/loadModule/some-module')
  a.strictEqual(module.name, 'someModule')
})

runner.test('loadModule: full module name, current dir default, module-dir', function () {
  const module = loadModule('test/fixture/loadModule/some-module', {
    moduleDir: '/some/where'
  })
  a.strictEqual(module.name, 'someModule')
})

runner.test('loadModule: full module name, module-dir', function () {
  const module = loadModule('some-module', {
    moduleDir: path.resolve('test', 'fixture', 'loadModule')
  })
  a.strictEqual(module.name, 'someModule')
})

runner.test('loadModule: full module name, multiple module-dirs', function () {
  const module = loadModule('next-module', {
    moduleDir: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ]
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('loadModule: partial module name, multiple module-dirs, module-prefix', function () {
  const module = loadModule('module', {
    moduleDir: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    modulePrefix: 'next-'
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('loadModule: full module name, multiple module-dirs, module-prefix', function () {
  const module = loadModule('next-module', {
    moduleDir: [
      path.resolve('test', 'fixture', 'loadModule'),
      path.resolve('test', 'fixture', 'loadModule2')
    ],
    modulePrefix: 'next-'
  })
  a.strictEqual(module.name, 'nextModule')
})

runner.test('loadModule: partial module name (module-prefix supplied), module-dir', function () {
  const module = loadModule('module', {
    moduleDir: path.resolve('test', 'fixture', 'loadModule'),
    modulePrefix: 'some-'
  })
  a.strictEqual(module.name, 'someModule')
})

runner.test('broken module', function () {
  a.throws(
    () => {
      const mod = loadModule('./test/fixture/broken-module')
    },
    err => {
      return err.code !== 'MODULE_NOT_FOUND'
    }
  )
})
