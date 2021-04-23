import TestRunner from 'test-runner'
import loadModule from '../index.mjs'
import path from 'path'
import assert from 'assert'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('modulePath: relative file, paths: "."', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath, { paths: '.' })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative file, paths: "." ❕', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath, { paths: '.' })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative file, paths: absolute cwd', async function () {
  const modulePath = './test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: relative file, paths: absolute cwd ❕', async function () {
  const modulePath = 'test/fixture/loadModule/some-module/lib/some-module.mjs'
  const result = await loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: absolute file, paths: absolute cwd', async function () {
  const modulePath = path.resolve('./test/fixture/loadModule/some-module/lib/some-module.mjs')
  const result = await loadModule(modulePath, { paths: process.cwd() })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: filename, paths: absolute', async function () {
  const modulePath = 'some-module.mjs'
  const paths = path.resolve('./test/fixture/loadModule/some-module/lib')
  const result = await loadModule(modulePath, { paths })
  a.equal(result.name, 'someModule')
})

tom.test('modulePath: "index.mjs", paths: absolute [ good ]', async function () {
  const result = await loadModule('index.mjs', {
    paths: [
      path.resolve('test', 'fixture', 'loadModule2', 'next-module')
    ]
  })
  a.equal(result.name, 'nextModule')
})

export default tom
