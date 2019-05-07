const Tom = require('test-runner').Tom
const loadModule = require('../')
const a = require('assert')
const path = require('path')

const tom = module.exports = new Tom('paths-prefix')

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
