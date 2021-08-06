"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactFeather = require("react-feather");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooleanInput = function BooleanInput(_ref) {
  var onChange = _ref.onChange,
      value = _ref.value;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm-10"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm-6 cursor-pointer"
  }, !!value && /*#__PURE__*/_react.default.createElement(_reactFeather.ToggleRight, {
    className: "input__boolean__on",
    onClick: function onClick() {
      return onChange(false);
    }
  }), !value && /*#__PURE__*/_react.default.createElement(_reactFeather.ToggleLeft, {
    className: "input__boolean__off",
    onClick: function onClick() {
      return onChange(true);
    }
  }))))));
};

exports.BooleanInput = BooleanInput;