
{ isType, assertType } = require "type-utils"

module.exports = (index, keyPath) ->

  if isType index, String
    keyPath = index
    index = 0
  else
    assertType index, Number

  unless isType keyPath, String
    return wrapFunction index, ->
      return arguments[index]

  # Support dot-notation!
  crumbs = keyPath.split "."

  if keyPath.length is 1
    crumbs = crumbs[0]
    return wrapFunction index, ->
      cake = arguments[index]
      return unless isType cake, Object.Kind
      return cake[crumbs]

  return wrapFunction index, ->
    cake = arguments[index]
    for crumb in crumbs
      if isType cake, Object.Kind
        cake = cake[crumb]
        continue
      cake = undefined
      break
    return cake

wrapFunction = (maxIndex, func) ->

  if maxIndex is 0
    return (value) ->
      func.call this, value

  if maxIndex is 1
    return (a, b) ->
      func.call this, a, b

  if maxIndex is 2
    return (a, b, c) ->
      func.call this, a, b, c

  return (a, b, c, d) ->
    func.call this, a, b, c, d
