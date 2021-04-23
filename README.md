[![view on npm](https://badgen.net/npm/v/load-module)](https://www.npmjs.org/package/load-module)
[![npm module downloads](https://badgen.net/npm/dt/load-module)](https://www.npmjs.org/package/load-module)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/load-module)](https://github.com/75lb/load-module/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/load-module)](https://github.com/75lb/load-module/network/dependents?dependent_type=PACKAGE)
[![Build Status](https://travis-ci.org/75lb/load-module.svg?branch=master)](https://travis-ci.org/75lb/load-module)
[![Coverage Status](https://coveralls.io/repos/github/75lb/load-module/badge.svg)](https://coveralls.io/github/75lb/load-module)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# load-module

Standard [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) but with a few additional features:

- You can supply specific folders in which to search for modules (e.g. any local directory).
- You can specify a base folder from which to resolve from (e.g. the current working directory).

## Synopsis

```
> const loadModule = require('load-module')
> loadModule('react-dom')
> loadModule('something.mjs', { paths: process.cwd() })
> loadModule('something.mjs', { paths: [process.cwd(), '~/my-modules'] })
```

<a name="module_load-module"></a>

## load-module

* [load-module](#module_load-module)
    * [.loadModuleSpecifier(specifier)](#module_load-module.loadModuleSpecifier)
    * [.loadModuleResolvedFrom(specifier, paths)](#module_load-module.loadModuleResolvedFrom)
    * [.loadModulePathRelativeTo(specifier, paths)](#module_load-module.loadModulePathRelativeTo)

<a name="module_load-module.loadModuleSpecifier"></a>

### loadModule.loadModuleSpecifier(specifier)
**Kind**: static method of [<code>load-module</code>](#module_load-module)  

| Param | Type | Description |
| --- | --- | --- |
| specifier | <code>string</code> | A valid Node.js module specifier. |

<a name="module_load-module.loadModuleResolvedFrom"></a>

### loadModule.loadModuleResolvedFrom(specifier, paths)
**Kind**: static method of [<code>load-module</code>](#module_load-module)  

| Param | Type | Description |
| --- | --- | --- |
| specifier | <code>string</code> | A valid Node.js module specifier. |
| paths | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One or more additional directories from which to resolve the supplied specifier from. |

<a name="module_load-module.loadModulePathRelativeTo"></a>

### loadModule.loadModulePathRelativeTo(specifier, paths)
**Kind**: static method of [<code>load-module</code>](#module_load-module)  

| Param | Type | Description |
| --- | --- | --- |
| specifier | <code>string</code> | A valid module path. |
| paths | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One or more additional directories in which to search for the supplied module path. |


* * *

&copy; 2017-21 Lloyd Brookes \<75pound@gmail.com\>.

Tested by [test-runner](https://github.com/test-runner-js/test-runner). Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
