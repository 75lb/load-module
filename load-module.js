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
  options = Object.assign({ 'module-prefix': '' }, options)
  options['module-dir'] = arrayify(options['module-dir'])
  let result
  if (options['module-dir'] && options['module-dir'].length) {
    for (const dir of arrayify(options['module-dir'])) {
      try {
        result = loadModule(path.resolve(dir, modulePath), { 'module-prefix': options['module-prefix'] })
        break
      } catch (err) {
        attempted.push(err.attempted)
      }
    }
    if (!result) {
      return loadModule(modulePath, { 'module-prefix': options['module-prefix'] })
    }
  } else {
    const pathsToTry = [
      modulePath,
      path.resolve(process.cwd(), modulePath),
      path.resolve(process.cwd(), 'node_modules', modulePath)
    ]
    if (options['module-prefix']) {
      pathsToTry.push(options['module-prefix'] + modulePath)
      pathsToTry.push(path.resolve(path.dirname(modulePath), options['module-prefix'] + path.basename(modulePath)))
      pathsToTry.push(path.resolve(path.dirname(modulePath), 'node_modules', options['module-prefix'] + path.basename(modulePath)))
    }
    for (const potentialPath of pathsToTry) {
      try {
        result = require(potentialPath)
        break
      } catch (err) {}
    }
    if (!result) {
      const err = new Error(`module not found: ${modulePath}`)
      err.attempted = pathsToTry
      err.code = 'MODULE_NOT_FOUND'
      throw err
    }
  }
  return result
}
