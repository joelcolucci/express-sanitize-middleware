const sanitize = require('@mapbox/sanitize-caja');

let sanitizeRequest = (options) => {
  if (!options) {
    throw Error;
  }

  let middleware = (req, res, next) => {
    if (options.body) {
      req.body = recursiveSanitize(req.body);
    }
    if (options.header) {
      req.headers = recursiveSanitize(req.headers);
    }
    if (options.params) {
      req.params = recursiveSanitize(req.params);
    }
    if (options.query) {
      req.query = recursiveSanitize(req.query);
    }
    next();
  };

  return middleware;
};

function recursiveSanitize(value) {
  if (!isObject(value)) {
    if (isArray(value)) {
      return value.map((el) => sanitize(el));
    } else if (isBoolean(value)) {
      return value;
    } else {
      return sanitize(value);
    }
  }

  let result = {};
  for (let [key, val] of Object.entries(value)) {
    result[key] = recursiveSanitize(val);
  }

  return result;
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(obj) {
  return obj === Object(obj)
    && Object.prototype.toString.call(obj) !== '[object Array]';
}

function isBoolean(value) {
  return typeof(value) === 'boolean';
}

module.exports = sanitizeRequest;
