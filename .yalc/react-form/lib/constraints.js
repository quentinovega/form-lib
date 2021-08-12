"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ref = exports.oneOf = exports.when = exports.test = exports.maxSize = exports.unsupportedFormat = exports.supportedFormat = exports.length = exports.moreThan = exports.lessThan = exports.integer = exports.negative = exports.positive = exports.max = exports.min = exports.matches = exports.uuid = exports.email = exports.url = exports.required = void 0;

var yup = _interopRequireWildcard(require("yup"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var required = function required() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Ce champ est requis";
  return {
    message: message
  };
}; //string


exports.required = required;

var url = function url() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "not an url";
  return {
    message: message
  };
};

exports.url = url;

var email = function email() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "not an email";
  return {
    message: message
  };
};

exports.email = email;

var uuid = function uuid() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "not an uuid";
  return {
    message: message
  };
};

exports.uuid = uuid;

var matches = function matches() {
  var regexp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /.*/;
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "not an email";
  return {
    regexp: regexp,
    message: message
  };
}; //string & number


exports.matches = matches;

var min = function min(ref) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "trop petit";
  return {
    ref: ref,
    message: message
  };
};

exports.min = min;

var max = function max(ref) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "trop grand";
  return {
    ref: ref,
    message: message
  };
}; //number


exports.max = max;

var positive = function positive() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "trop negatif";
  return {
    message: message
  };
};

exports.positive = positive;

var negative = function negative() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "trop positif";
  return {
    message: message
  };
};

exports.negative = negative;

var integer = function integer() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "an integer please";
  return {
    message: message
  };
};

exports.integer = integer;

var lessThan = function lessThan(ref) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "plus grand que ".concat(ref);
  return {
    ref: ref,
    message: message
  };
};

exports.lessThan = lessThan;

var moreThan = function moreThan(ref) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "plus petit que ".concat(ref);
  return {
    ref: ref,
    message: message
  };
}; //array


exports.moreThan = moreThan;

var length = function length(value) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "la taille doit etre ".concat(value);
  return {
    value: value,
    message: message
  };
}; //file


exports.length = length;

var supportedFormat = function supportedFormat(arrayOfValues, message) {
  return {
    arrayOfValues: arrayOfValues,
    message: message
  };
};

exports.supportedFormat = supportedFormat;

var unsupportedFormat = function unsupportedFormat(arrayOfValues, message) {
  return {
    arrayOfValues: arrayOfValues,
    message: message
  };
};

exports.unsupportedFormat = unsupportedFormat;

var maxSize = function maxSize(value) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "size is excedeed ".concat(value);
  return {
    value: value,
    message: message
  };
}; //mixed


exports.maxSize = maxSize;

var test = function test(name) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'test failed';
  var test = arguments.length > 2 ? arguments[2] : undefined;
  return {
    name: name,
    message: message,
    test: test
  };
};

exports.test = test;

var when = function when(ref, test, then, otherwise) {
  return {
    ref: ref,
    test: test,
    then: then,
    otherwise: otherwise
  };
};

exports.when = when;

var oneOf = function oneOf(arrayOfValues, message) {
  return {
    arrayOfValues: arrayOfValues,
    message: message
  };
};

exports.oneOf = oneOf;

var ref = function ref(_ref) {
  return yup.ref(_ref);
};

exports.ref = ref;