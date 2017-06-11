'use strict'
const path = require('path')
const arrayify = require('array-back')

/**
 * Load a module.
 * @module load-module
 * @example
 * const loadModule = require('load-module')
 */
module.exports = loadModule

const attempted = []

/**
 * @alias module:load-module
 * @param {string} - module path
 * @param [options] {object}
 * @param [options.module-prefix] {string}
 * @param [options.module-dir] {string|string[]}
 */
function loadModule (modulePath, options) {
  options = Object.assign({ modulePrefix: '' }, options)
  options.moduleDir = arrayify(options.moduleDir)
  let result
  if (options.moduleDir && options.moduleDir.length) {
    for (const dir of arrayify(options.moduleDir)) {
      try {
        result = loadModule(path.resolve(dir, modulePath), { modulePrefix: options.modulePrefix })
        break
      } catch (err) {
        attempted.push(err.attempted)
      }
    }
    if (!result) {
      return loadModule(modulePath, { modulePrefix: options.modulePrefix })
    }
  } else {
    if (modulePath.startsWith('.')) modulePath = path.resolve(modulePath)
    const pathsToTry = [
      modulePath,
      path.resolve(process.cwd(), modulePath),
      path.resolve(process.cwd(), 'node_modules', modulePath)
    ]
    if (options.modulePrefix) {
      pathsToTry.push(options.modulePrefix + modulePath)
      pathsToTry.push(path.resolve(path.dirname(modulePath), options.modulePrefix + path.basename(modulePath)))
      pathsToTry.push(path.resolve(path.dirname(modulePath), 'node_modules', options.modulePrefix + path.basename(modulePath)))
    }
    for (const potentialPath of pathsToTry) {
      try {
        result = require(potentialPath)
        break
      } catch (err) {
        if (err.code !== 'MODULE_NOT_FOUND') throw err
      }
    }
    if (!result) {
      let msg = `Module not found: ${modulePath}. Module paths attempted: `
      msg += JSON.stringify(pathsToTry, null, '  ')
      const err = new Error(msg)
      err.attempted = pathsToTry
      err.code = 'MODULE_NOT_FOUND'
      throw err
    }
  }
  return result
}
