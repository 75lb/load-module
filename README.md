[![view on npm](https://badgen.net/npm/v/load-module)](https://www.npmjs.org/package/load-module)
[![npm module downloads](https://badgen.net/npm/dt/load-module)](https://www.npmjs.org/package/load-module)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/load-module)](https://github.com/75lb/load-module/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/load-module)](https://github.com/75lb/load-module/network/dependents?dependent_type=PACKAGE)
[![Build Status](https://travis-ci.org/75lb/load-module.svg?branch=master)](https://travis-ci.org/75lb/load-module)
[![Coverage Status](https://coveralls.io/repos/github/75lb/load-module/badge.svg)](https://coveralls.io/github/75lb/load-module)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# load-module

Standard [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) intended for runtime loading of user-defined modules (e.g. plugins).

- Search for modules in one or more specific folders.
- Specify a base folder from which to resolve from (e.g. the current working directory).

## Synopsis

```js
import { loadModule } from 'load-module'

const ViewClass = await loadModule('default-view', { paths: '~/my-view-folder'})
const view = new ViewClass()
```

## load-module

* [load-module](#module_load-module)
    * [loadModule(specifier, options)](#module_load-module.loadModule)
    * [loadModuleSpecifier(specifier)](#module_load-module.loadModuleSpecifier)
    * [loadModuleResolvedFrom(specifier, paths)](#module_load-module.loadModuleResolvedFrom)
    * [loadModuleRelativeTo(specifier, paths)](#module_load-module.loadModuleRelativeTo)

### <a name="module_load-module.loadModule">loadModule(specifier, options)</a>

**Kind**: exported function

| Param | Type | Description |
| ---   | ---  | --- |
| specifier | <code>string</code> | A valid Node.js module specifier. |
| specifier | <code>string</code> | A valid Node.js module specifier. |

<a name="module_load-module.loadModuleSpecifier"></a>

### loadModuleSpecifier(specifier)

**Kind**: exported function

| Param | Type | Description |
| --- | --- | --- |
| specifier | <code>string</code> | A valid Node.js module specifier. |

<a name="module_load-module.loadModuleResolvedFrom"></a>

### loadModuleResolvedFrom(specifier, paths)

**Kind**: exported function

| Param | Type | Description |
| --- | --- | --- |
| specifier | <code>string</code> | A valid Node.js module specifier. |
| paths | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One or more additional directories from which to resolve the supplied specifier from. |

<a name="module_load-module.loadModuleRelativeTo"></a>

### loadModuleRelativeTo(specifier, paths)

**Kind**: exported function

| Param | Type | Description |
| --- | --- | --- |
| specifier | <code>string</code> | A valid module path. |
| paths | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One or more additional directories in which to search for the supplied module path. |


* * *

&copy; 2017-21 Lloyd Brookes \<75pound@gmail.com\>.

Tested by [test-runner](https://github.com/test-runner-js/test-runner). Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
