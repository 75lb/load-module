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

/**
 * @alias module:load-module
 * @param {string} - The module name, directory or file to load.
 * @param {object} [options]
 * @param {string} [options.prefix] - If the input `moduleID` is `rewrite` and the `module-prefix` is `lws`, load-module will attempt to laod `lws-rewrite` then `rewrite`.
 * @param {string|string[]} [options.paths] - One of more additional directories to search for modules.
 */
function loadModule (request, options) {
  if (typeof request !== 'string') {
    throw new Error('request expected')
  }
  options = options || {}
  const arrayify = require('array-back')
  const prefix = options.prefix
  const paths = options.paths ? arrayify(options.paths) : undefined
  const origModulePaths = module.paths
  if (paths && paths.length) {
    module.paths = module.paths.concat(paths)
  }
  let output

  if (prefix) {
    /* Try first with the prefix then without */
    try {
      output = require(require.resolve(`${options.prefix}${request}`, { paths }))
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        output = require(require.resolve(request, { paths }))
      }
    }
  } else {
    output = require(require.resolve(request, { paths }))
  }

  module.paths = origModulePaths
  return output
}
