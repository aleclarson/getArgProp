var assertType, isType, wrapFunction;

assertType = require("assertType");

isType = require("isType");

module.exports = function(index, keyPath) {
  var crumbs;
  if (isType(index, String)) {
    keyPath = index;
  }
  if (!isType(index, Number)) {
    index = 0;
  }
  if (!isType(keyPath, String)) {
    return wrapFunction(index, function() {
      return arguments[index];
    });
  }
  crumbs = keyPath.split(".");
  if (keyPath.length === 1) {
    crumbs = crumbs[0];
    return wrapFunction(index, function() {
      var cake;
      cake = arguments[index];
      if (!isType(cake, Object.Kind)) {
        return;
      }
      return cake[crumbs];
    });
  }
  return wrapFunction(index, function() {
    var cake, crumb, i, len;
    cake = arguments[index];
    for (i = 0, len = crumbs.length; i < len; i++) {
      crumb = crumbs[i];
      if (isType(cake, Object.Kind)) {
        cake = cake[crumb];
        continue;
      }
      cake = void 0;
      break;
    }
    return cake;
  });
};

wrapFunction = function(maxIndex, func) {
  if (maxIndex === 0) {
    return function(value) {
      return func.call(this, value);
    };
  }
  if (maxIndex === 1) {
    return function(a, b) {
      return func.call(this, a, b);
    };
  }
  if (maxIndex === 2) {
    return function(a, b, c) {
      return func.call(this, a, b, c);
    };
  }
  return function(a, b, c, d) {
    return func.call(this, a, b, c, d);
  };
};

//# sourceMappingURL=../../map/src/getArgProp.map
