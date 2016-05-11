
# getArgProp 1.0.0 ![stable](https://img.shields.io/badge/stability-stable-4EBA0F.svg?style=flat)

This `Function` is useful for easily creating a `Function` that accesses
arguments using the given arguments index (default to `0` if not provided)
and the given key path (dot-notation is supported).

```coffee
getArgProp = require "getArgProp"

getFoo = getArgProp "foo"

getFoo { foo: 1 }              # => 1

getBar = getArgProp 1, "bar"

getBar { bar: 1 }, { bar: 2 }  # => 2

getFooBar = getArgProp "foo.bar"

getFooBar { foo: { bar: 1 } }  # => 1 
```
