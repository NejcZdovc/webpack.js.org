---
title: Module
contributors:
  - sokra
  - skipjack
---

These options determine how the [different types of modules](/concepts/everything-is-a-module) within a project will be treated.

### `module.rules`

`array`

An array of [Rules](#rule) which are matched to requests when modules are created. These rules can modify how the module is created. They can apply loaders to the module, or modify the parser.


### `Rule`

A Rule can be separated into three parts: Conditions, Results and nested Rules.

#### `Rule` conditions

There are two input values for the conditions:

The resource: An absolute path to the file requested. It's already resolved according the [`resolve` rules](/configuration/resolve).

The issuer: An absolute path to the file of the module which requested the resource. It's the location of the import.

Example: The `import "./style.css"` from `app.js`:

Resource is `/path/to/style.css`. Issuer is `/path/to/app.js`.

In a Rule the properties [`test`](#rule-test), [`include`](#rule-include), [`exclude`](#rule-exclude) and [`resource`](#rule-resource) are matched with the resource and the property [`issuer`](#rule-issuer) is matched with the issuer.

When using multiple conditions, all conditions must match.

#### `Rule` results

Rule results are only used when the Rule condition matches.

There are two output values of a Rule:

The applied loaders: An array of loaders applied to the resource. Separated in pre-, post- and normal loaders.

The parser options: An object with options which should be used to create the parser for this module.

These properties affect the loaders: [`loader`](#rule-loader), [`options`](#rule-options), [`use`](#rule-use).

For compatibility also these properties: [`query`](#rule-query), [`loaders`](#rule-loaders).

The [`enforce`](#rule-enforce) property affect the loader category. Whether it's an normal, pre- or post- loader.

The [`parser`](#rule-parser) property affect the parser options.


### `Rule` nested rules

With the properties [`rules`](#rule-rules) and [`oneOf`](#rule-oneof) nested rules can be specified.

Nested rules are used when the Rule condition matches.


### `Rule.test`

`Rule.test` is a shortcut to `Rule.resource.test`. See [`Rule.resource`](#rule-resource) and [`Condition.test`](#condition) for details.


### `Rule.include`

`Rule.include` is a shortcut to `Rule.resource.include`. See [`Rule.resource`](#rule-resource) and [`Condition.include`](#condition) for details.


### `Rule.exclude`

`Rule.exclude` is a shortcut to `Rule.resource.exclude`. See [`Rule.resource`](#rule-resource) and [`Condition.exclude`](#condition) for details.


### `Rule.resource`

A [`Condtion`](#condition) matched with the resource. See details in [`Rule` conditions](#rule-conditions).


### `Rule.issuer`

A [`Condtion`](#condition) matched with the issuer. See details in [`Rule` conditions](#rule-conditions).


### `Rule.loader`

`Rule.loader` is a shortcut to `Rule.use: [ { loader } ]`. See [`Rule.use`](#rule-use) and [`UseEntry.loader`](#useentry-loader) for details.


### `Rule.options`
### `Rule.query`

`Rule.options` and `Rule.query` are shortcuts to `Rule.use: [ { options } ]`. See [`Rule.use`](#rule-use) and [`UseEntry.options`](#useentry-options) for details.

`Rule.query` only exists for compatibility reasons. Use `Rule.options` instead.


### `Rule.loaders`

`Rule.loaders` is an alias to `Rule.use`. See [`Rule.use`](#rule-use) for details.

It exists for compatibility reasons. Use `Rule.use` instead.


### `Rule.use`

A list of [UseEntries](#useentry) which are applied to the module. Each entry specified a loader which should be used.

Passing a string (i. e. `use: [ "style-loader" ]`) is a shortcut to the loader property (i. e. `use: [ { loader: "style-loader "} ]`).

See [UseEntry](#useentry) for details.


### `Rule.enforce`

Either `"pre"`, `"post" or no value.

Specifies the category of the loader. No value means normal loader.

There is also an additional category "inlined loader" which are loaders applied inline of the import/require.

All loaders are sorted in the order `post, inline, normal, pre` and used in this order.

All normal loaders can be omitted (overridden) by prefixing `!` in the request.

All normal and pre loaders can be omitted (overridden) by prefixing `-!` in the request.

All normal, post and pre loaders can be omitted (overridden) by prefixing `!!` in the request.

Inline loaders and `!` prefixes should not be used as they are non-standard. They may be use by loader generated code.


### `Rule.rules`

An array of [`Rules`](#rule) that is also used when the Rule matches.


### `Rule.oneOf`

An array of [`Rules`](#rule) from which only the first matching Rule is used when the Rule matches.


### `Rule.parser`

An object with parser options. All applied parser options are merged.

For each different parser options object a new parser is created and plugins can apply plugins depending on the parser options. Many of the default plugins apply their parser plugins only if a property in the parser options is not set or true.

Examples (parser options by the default plugins):

``` js-with-links
parser: {
  amd: false, // disable AMD
  commonjs: false, // disable CommonJs
  system: false, // disable System
  harmony: false, // disable harmony import/export
  requireInclude: false, // disable require.include
  requireEnsure: false, // disable require.ensure
  requireContext: false, // disable require.context
  browserify: false, // disable special handling of browserify bundles
  requireJs: false, // disable requirejs.*
  node: false, // disable __dirname, __filename, module, require.extensions, require.main, etc.
  node: {...} // reconfigure [node](/configuration/node) layer on module level
}
```


### `Condition`

Conditions can be one of these:

* A string: To match the input must start with the provided string. I. e. an absolute directory path, or absolute path to the file.
* A RegExp: It's tested with the input.
* A function: It's called with the input and must return a truthy value to match.
* An array of Conditions: At least one of the Condition must match.
* A object: All properties must match. Each property has a defined behavior.

`{ test: Condition }`: The Condition must match. The convention is the provide a RegExp or array of RegExps here, but it's not enforced.

`{ include: Condition }`: The Condition must match. The convention is the provide a string or array of strings here, but it's not enforced.

`{ exclude: Condition }`: The Condition must NOT match. The convention is the provide a string or array of strings here, but it's not enforced.

`{ and: [Condition] }`: All Conditions must match.

`{ or: [Condition] }`: Any Condition must match.

`{ not: Condition }`: The Condition must NOT match.

Example:

``` js
{
  test: /\.css$/,
  include: [
    path.resolve(__dirname, "app/styles"),
    path.resolve(__dirname, "vendor/styles")
  ]
}
```


### `UseEntry`

`object`

It must have a `loader` property being a string. It is resolved relative to the configuration [`context`](/configuration/entry-context#context) with the loader resolving options ([resolveLoader](/configuration/resolve#resolveloader)).

It can have a `options` property being a string or object. This value is passed to the loader, which should interpret it as loader options.

For compatibility a `query` property is also possible, which is an alias for the `options` property. Use the `options` property instead.

Example:

``` js
{
  loader: "css-loader",
  options: {
    modules: true
  }
}
```

Note that webpack need to generate an unique module identifier from resource and all loaders including options. It tries to do this with a `JSON.stringify` of the options object. This is fine in 99.9%, but may be not unique if you apply the same loaders with different options to the same resource and the options have some stringified values. It also breaks if the options object cannot be stringified (i. e. circular JSON). Because of this you can have a `ident` property in the options object which is used as unique identifier.


### `module.noParse`

`RegExp | [RegExp]`

Prevent webpack from parsing any files matching the given regular expression(s). Ignored files **should not** have calls to `import`, `require`, `define` or any other importing mechanism. This can boost build performance when ignoring large libraries...

```js
noParse: /jquery|backbone/
```


### Module Contexts

(Deprecated)

These options describe the default settings for the context created when a dynamic dependency is encountered.

Example for an `unknown` dynamic dependency: `require`.

Example for an `expr` dynamic dependency: `require(expr)`.

Example for an `wrapped` dynamic dependency: `require("./templates/" + expr)`.

Here are the available options with their defaults:

```js
module: {
  unknownContextRequest: ".",
  unknownContextRegExp: false,
  unknownContextRecursive: true,
  unknownContextCritical: true,
  exprContextRequest: ".",
  exprContextRegExp: false,
  exprContextRecursive: true,
  exprContextCritical: true,
  wrappedContextRegExp: /.*/,
  wrappedContextRecursive: true,
  wrappedContextCritical: false
}
```

Note: You can use the [`ContextReplacementPlugin`]() to modify these values for individual dependencies. This also removes the warning.

A few usecases:

* Warn for dynamic dependencies: `wrappedContextCritical: true`.
* `require(expr)` should include the whole directory: `exprContextRegExp: /^\.\//`
* `require("./templates/" + expr)` should not include subdirectories by default: `wrappedContextRecursive: false`

