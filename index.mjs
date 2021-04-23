import arrayify from 'array-back'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

async function loadModuleId (specifier, options = {}) {
  try {
    // console.log(specifier, arrayify(options.paths))
    if (options.paths) {
      specifier = require.resolve(specifier, { paths: arrayify(options.paths) })
    }
    // console.log(specifier)
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

async function loadModule (specifier, options = {}) {
  options = Object.assign({
    paths: [process.cwd()]
  }, options)

  let output
  /* absolute path */
  if (path.isAbsolute(specifier)) {
    return loadModuleId(specifier)

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
  return output
}

async function loadBareSpecifier (specifier, options = {}) {
  let output
  if (options.prefix && !specifier.startsWith(options.prefix)) {
    specifier = options.prefix + specifier
  }

  /* bare specifier from cwd */
  // console.log('BARE CWD', specifier)
  // output = await loadModuleId(specifier, { paths: [process.cwd()] })
  output = await loadModuleId(specifier, { paths: options.paths })
  return output
}

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
async function loadModule1 (request, options) {
  if (typeof request !== 'string') {
    throw new Error('request expected')
  }
  options = options || {}
  const prefix = options.prefix
  let paths = options.paths ? arrayify(options.paths) : undefined
  // const origModulePaths = module.paths
  // if (paths && paths.length) {
  //   module.paths = module.paths.concat(paths)
  // }
  if (!(paths && paths.length)) {
    paths = [process.cwd()]
  }
  let output = null

  if (prefix) {
    try {
      output = await loadModule(`${prefix}${request}`, { paths })
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        output = await loadModule(request, { paths })
      } else {
        throw err
      }
    }
  } else {
    output = await tryEachPath(request, { paths })
    if (output === null) {
      output = await loadAsLocalPath(request, { paths })
    }
    if (output === null) {
      output = await loadAsRegularRequire(request, { paths })
    }
  }

  // module.paths = origModulePaths

  if (output === null) {
    const err = new Error('Cannot find ' + request)
    err.code = 'MODULE_NOT_FOUND'
    throw err
  } else {
    return output
  }
}

async function loadAsLocalPath (request, options) {
  console.log('loadAsLocalPath')
  let output
  try {
    // console.log(request, options, path.resolve(request))
    // console.log(require.resolve(path.resolve(request), options))
    // console.log(require.resolve(request, { paths: [process.cwd()] }))
    const mod = await import(require.resolve(path.resolve(request), options))
    output = mod.default

    // output = require(path.resolve(request), options)
  } catch (err) {
    console.error('ERR', err)
    if (err.code === 'MODULE_NOT_FOUND') {
      output = null
    } else {
      throw err
    }
  }
  return output
}

async function loadAsRegularRequire (request, options) {
  console.log('loadAsRegularRequire')
  let output
  try {
    const mod = await import(require.resolve(request, options))
    output = mod.default
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      output = null
    } else {
      throw err
    }
  }
  return output
}

async function tryEachPath (request, options) {
  console.log('tryEachPath')
  let output = null
  for (const p of options.paths || []) {
    const fullPath = path.resolve(p, request)
    output = await loadAsRegularRequire(fullPath)
    if (output !== null) break
  }
  return output
}

export default loadModule
