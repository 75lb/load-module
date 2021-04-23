import arrayify from 'array-back'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/**
 * @module load-module
 * @typicalname loadModule
 */

/**
 * @param {string} - A valid Node.js module specifier.
 */
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

/**
 * @param {string} - A valid Node.js module specifier.
 * @param {string|string[]} - One or more additional directories from which to resolve the supplied specifier from.
 */
export async function loadModuleResolvedFrom (specifier, paths) {
  if (!(specifier && paths && paths.length)) {
    throw new Error('specifier and paths expected')
  }
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

/**
 * @param {string} - A valid module path.
 * @param {string|string[]} - One or more additional directories in which to search for the supplied module path.
 */
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
