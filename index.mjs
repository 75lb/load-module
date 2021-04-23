import arrayify from 'array-back'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/**
 * Node's `require` with a few extra features:
 * - You can specify additional folders in which to search for modules
 * - You can specify a module prefix
 * @module load-module
 * @example
 * > const loadModule = require('load-module')
 *
 * > loadModule('react-dom')
 *
 * > loadModule('dom', { prefix: 'react-' })
 *
 * > loadModule('something.js', { paths: '.' })
 *
 * > loadModule('something.js', { paths: [ '.', '~/my-modules' ] })
 */

/**
 * @alias module:load-module
 * @param {string} - The module name, directory or file to load.
 * @param {object} [options]
 * @param {string|string[]} [options.paths] - One or more additional directories in which to search for modules. For each path specified, both the path itself and `${path}/node_modules` will be searched.
 * @param {string} [options.prefix] - Attempt to load the given module name with this prefix. Only useful where `request` is a module name.
 */
async function loadModule (specifier, options = {}) {
  if (typeof specifier !== 'string') {
    throw new Error('specifier expected')
  }
  options = Object.assign({
    paths: [process.cwd()]
  }, options)

  let output
  /* absolute path */
  if (path.isAbsolute(specifier)) {
    output = await loadModuleId(specifier)

  /* relative path or bare specifier */
  } else {
    output = await loadBareSpecifier(specifier, options)
    if (output) return output

    /* try loading resolving from the supplied paths */
    output = await loadModuleId(specifier, options)
    if (output) return output

    /* try loading relative from each of the supplied paths */
    for (const p of arrayify(options.paths)) {
      output = await loadModuleId(path.resolve(p, specifier))
      if (output) break
    }
  }
  if (output === null) {
    const err = new Error('Cannot find ' + specifier)
    err.code = 'MODULE_NOT_FOUND'
    throw err
  } else {
    return output
  }
}

async function loadModuleId (specifier, options = {}) {
  try {
    if (options.paths) {
      specifier = require.resolve(specifier, { paths: arrayify(options.paths) })
    }
    const mod = await import(specifier)
    return mod.default
  } catch (err) {
    if (['MODULE_NOT_FOUND', 'ERR_MODULE_NOT_FOUND'].includes(err.code)) {
      return null
    } else {
      throw err
    }
  }
}

async function loadBareSpecifier (specifier, options = {}) {
  let output
  if (options.prefix && !specifier.startsWith(options.prefix)) {
    specifier = options.prefix + specifier
  }

  /* bare specifier from cwd */
  output = await loadModuleId(specifier, { paths: options.paths })
  return output
}

export default loadModule
