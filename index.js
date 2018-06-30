const path = require('path')
const arrayify = require('array-back')

/**
 * Typically used by cli app loading plugins.
 *
 * Like node's `require` but with a few extra features:
 * - Seaches `node_modules` in the current working directory by default.
 * - You can specify your folders in which to search for modules
 * - You can specify a module prefix
 * @module load-module
 * @example
 * const loadModule = require('load-module')
 */
module.exports = loadModule

const attempted = []

/**
 * @alias module:load-module
 * @param {string} - module identifier
 * @param {object} [options]
 * @param {string} [options.modulePrefix] - If the input `moduleID` is `rewrite` and the `module-prefix` is `lws`, load-module will attempt to laod `lws-rewrite` then `rewrite`.
 * @param {string|string[]} [options.moduleDir] - An additional location to search for modules.
 */
function loadModule (request, options) {
  options = Object.assign({ paths: [ '.' ] }, options)
  if (typeof request === 'string') {
    if (options.prefix) {
      try {
        return require(require.resolve(`${options.prefix}${request}`, { paths: options.paths }))
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          return require(require.resolve(request, { paths: options.paths }))
        }
      }
    } else {
      return require(require.resolve(request, { paths: options.paths }))
    }
  } else {
    throw new Error('request expected')
  }
}
