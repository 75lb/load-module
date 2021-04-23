import arrayify from 'array-back'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/**
 * Dynamic module loading. Node's `import` but with a few additional features:
 * - You supply specify folders in which to search for modules (e.g. any local directory).
 * - You can specify a module prefix.
 * @module load-module
 * @example
 * > const loadModule = require('load-module')
 *
 * > loadModule('react-dom')
 *
 * > loadModule('dom', { prefix: 'react-' })
 *
 * > loadModule('something.mjs', { paths: process.cwd() })
 *
 * > loadModule('something.mjs', { paths: [process.cwd(), '~/my-modules'] })
 */

/**
 * @alias module:load-module
 * @param {string} - A valid Node.js module specifier.
 * @param {object} [options]
 * @param {string|string[]} [options.paths] - One or more additional directories in which to search for modules. For each path specified, both the path itself and `${path}/node_modules` will be searched.
 * @param {string} [options.prefix] - Attempt to load the given module name with this prefix. Only useful where `request` is a module name.
 */

// export async function loadModule (specifier, options = {}) {
//   if (typeof specifier !== 'string') {
//     throw new Error('specifier expected')
//   }
//   options.paths = options.paths || [process.cwd()]

//   let output
//   /* absolute path */
//   if (path.isAbsolute(specifier)) {
//     output = await loadModuleSpecifier(specifier)

//   /* relative path or bare specifier */
//   } else {
//     output = await loadBareSpecifier(specifier, options)
//     if (output) return output

//      try loading resolving from the supplied paths
//     output = await loadModuleId(specifier, options)
//     if (output) return output

//     /* try loading relative from each of the supplied paths */
//     for (const p of arrayify(options.paths)) {
//       output = await loadModuleId(path.resolve(p, specifier))
//       if (output) break
//     }
//   }
//   if (output === null) {
//     const err = new Error('Cannot find ' + specifier)
//     err.code = 'MODULE_NOT_FOUND'
//     throw err
//   } else {
//     return output
//   }
// }

export async function loadModuleSpecifier (specifier) {
  if (typeof specifier !== 'string') {
    throw new Error('specifier expected')
  }
  try {
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

export async function loadModuleResolvedFrom (specifier, paths) {
  try {
    specifier = require.resolve(specifier, { paths: arrayify(paths) })
    return loadModuleSpecifier(specifier)
  } catch (err) {
    if (['MODULE_NOT_FOUND', 'ERR_MODULE_NOT_FOUND'].includes(err.code)) {
      return null
    } else {
      throw err
    }
  }
}

/* try loading relative from each of the supplied paths */
export async function loadModulePathRelativeTo (specifier, paths) {
  if (!(specifier && paths && paths.length)) {
    throw new Error('specifier and paths expected')
  }
  let output = null
  for (const p of arrayify(paths)) {
    output = await loadModuleSpecifier(path.resolve(p, specifier))
    if (output) break
  }
  return output
}

// async function loadModuleId (specifier, options = {}) {
//   try {
//     if (options.paths) {
//       specifier = require.resolve(specifier, { paths: arrayify(options.paths) })
//     }
//     const mod = await import(specifier)
//     return mod.default
//   } catch (err) {
//     if (['MODULE_NOT_FOUND', 'ERR_MODULE_NOT_FOUND'].includes(err.code)) {
//       return null
//     } else {
//       throw err
//     }
//   }
// }

// async function loadBareSpecifier (specifier, options = {}) {
//   let output
//   if (options.prefix && !specifier.startsWith(options.prefix)) {
//     specifier = options.prefix + specifier
//   }

//   /* bare specifier from cwd */
//   output = await loadModuleId(specifier, { paths: options.paths })
//   return output
// }
