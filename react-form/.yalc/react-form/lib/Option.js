"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.None = exports.Some = exports.option = void 0;

var option = function option(x) {
  return x === undefined || x === null ? None : Some(x);
};

exports.option = option;

var Some = function Some(x) {
  return {
    map: function map(f) {
      return option(f(x));
    },
    flatMap: function flatMap(f) {
      return f(x);
    },
    fold: function fold(_ifEmpty, f) {
      return f(x);
    },
    orElse: function orElse() {
      return option(x);
    },
    getOrElse: function getOrElse() {
      return x;
    },
    getOrNull: function getOrNull() {
      return x;
    },
    isDefined: true,
    exists: function exists(f) {
      return option(f(x)).isDefined;
    }
  };
};

exports.Some = Some;
var None = {
  map: function map() {
    return None;
  },
  flatMap: function flatMap() {
    return None;
  },
  fold: function fold(ifEmpty, _f) {
    return ifEmpty();
  },
  orElse: function orElse(x) {
    return option(x);
  },
  getOrElse: function getOrElse(ifEmpty) {
    return ifEmpty;
  },
  getOrNull: function getOrNull() {
    return undefined;
  },
  isDefined: false,
  exists: function exists() {
    return false;
  }
};
exports.None = None;