"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oneOf = exports.when = exports.test = exports.length = exports.moreThan = exports.lessThan = exports.integer = exports.negative = exports.positive = exports.max = exports.min = exports.matches = exports.uuid = exports.email = exports.url = exports.required = void 0;

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
}; //number


exports.matches = matches;

var min = function min(value) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "trop petit";
  return {
    value: value,
    message: message
  };
};

exports.min = min;

var max = function max(value) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "trop grand";
  return {
    value: value,
    message: message
  };
};

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
}; //mixed


exports.length = length;

var test = function test(ref) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'test failed';
  var test = arguments.length > 2 ? arguments[2] : undefined;
  return {
    ref: ref,
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