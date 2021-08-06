"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactFeather = require("react-feather");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ObjectInput = function ObjectInput(props) {
  var changeValue = function changeValue(e, name) {
    var newValues = _objectSpread(_objectSpread({}, props.value), {}, _defineProperty({}, name, e.target.value));

    props.onChange(newValues);
  };

  var changeKey = function changeKey(e, oldName) {
    var newValues = _objectSpread({}, props.value);

    var oldValue = newValues[oldName];
    delete newValues[oldName];
    newValues[e.target.value] = oldValue;
    props.onChange(newValues);
  };

  var addFirst = function addFirst(e) {
    if (!props.value || Object.keys(props.value).length === 0) {
      props.onChange(props.defaultKeyValue || {
        '': ''
      });
    }
  };

  var addNext = function addNext(e) {
    var newItem = props.defaultKeyValue || {
      '': ''
    };

    var newValues = _objectSpread(_objectSpread({}, props.value), newItem);

    props.onChange(newValues);
  };

  var remove = function remove(e, name) {
    var newValues = _objectSpread({}, props.value);

    delete newValues[name];
    props.onChange(newValues);
  };

  var values = Object.keys(props.value || {}).map(function (k) {
    return [k, props.value[k]];
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: props.className
  }, values.length === 0 && /*#__PURE__*/_react.default.createElement("button", {
    disabled: props.disabled,
    type: "button",
    className: "btn btn-primary",
    onClick: addFirst
  }, /*#__PURE__*/_react.default.createElement(_reactFeather.PlusCircle, null)), values.map(function (value, idx) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "d-flex flex-row",
      key: idx
    }, /*#__PURE__*/_react.default.createElement("input", {
      disabled: props.disabled,
      type: "text",
      className: "form-control",
      style: {
        width: '50%'
      },
      placeholder: props.placeholderKey,
      value: value[0],
      onChange: function onChange(e) {
        return changeKey(e, value[0]);
      }
    }), /*#__PURE__*/_react.default.createElement("input", {
      disabled: props.disabled,
      type: "text",
      className: "form-control",
      style: {
        width: '50%'
      },
      placeholder: props.placeholderValue,
      value: value[1],
      onChange: function onChange(e) {
        return changeValue(e, value[0]);
      }
    }), /*#__PURE__*/_react.default.createElement("button", {
      disabled: props.disabled,
      type: "button",
      className: "btn btn-danger",
      onClick: function onClick(e) {
        return remove(e, value[0]);
      }
    }, /*#__PURE__*/_react.default.createElement(_reactFeather.MinusCircle, null)), idx === values.length - 1 && /*#__PURE__*/_react.default.createElement("button", {
      disabled: props.disabled,
      type: "button",
      className: "btn btn-primary",
      onClick: addNext
    }, /*#__PURE__*/_react.default.createElement(_reactFeather.PlusCircle, null)));
  }));
};

exports.ObjectInput = ObjectInput;