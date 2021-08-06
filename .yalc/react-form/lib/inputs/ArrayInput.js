"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _creatable = _interopRequireDefault(require("react-select/creatable"));

var _Option = require("../Option");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var valueToSelectOption = function valueToSelectOption(value) {
  if (value === null) {
    return null;
  }

  return {
    label: value.label || value,
    value: value.value || value
  };
};

var ArrayInput = function ArrayInput(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 1),
      value = _useState4[0];

  var _useState5 = (0, _react.useState)((props.possibleValues || []).map(valueToSelectOption)),
      _useState6 = _slicedToArray(_useState5, 2),
      values = _useState6[0],
      setValues = _useState6[1];

  (0, _react.useEffect)(function () {
    if (props.optionsFrom) {
      var cond = (0, _Option.option)(props.fetchCondition).map(function (cond) {
        return cond();
      }).getOrElse(true);

      if (cond) {
        setLoading(true);
        return fetch(props.optionsFrom, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(function (r) {
          return r.json();
        }).then(function (values) {
          return values.map(props.transformer || valueToSelectOption);
        }).then(function (values) {
          setValues(values); // setValue(values.find((item) => item.value === (value ? value.value : value)) || null);

          setLoading(false);
        });
      }
    }
  }, [props, value]);

  var handleChanges = function handleChanges(changes) {
    props.onChange(changes.map(function (x) {
      return x.value;
    }));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm-10"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%'
    },
    className: "input-select"
  }, props.createOption && /*#__PURE__*/_react.default.createElement(_creatable.default, {
    isDisabled: props.disabled,
    components: {
      DropdownIndicator: null
    },
    inputValue: value,
    isClearable: true,
    onChange: props.onChange // onInputChange={handleChanges}
    // onKeyDown={this.handleKeyDown}
    ,
    options: values,
    onCreateOption: function onCreateOption(option) {
      return props.onCreateOption ? props.onCreateOption(option) : undefined;
    } //todo: default onCreateOption
    ,
    formatCreateLabel: function formatCreateLabel(value) {
      return props.formatCreateLabel ? props.formatCreateLabel(value) : "create ".concat(value, " ?");
    } //todo: default formatCreateLabel
    ,
    placeholder: props.placeholder,
    value: value,
    classNamePrefix: "react-form-select",
    className: "react-form-select"
  }), !props.createOption && /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
    name: "".concat(props.label, "-search"),
    isLoading: loading,
    value: value,
    isMulti: true,
    isDisabled: props.disabled,
    placeholder: props.placeholder,
    options: values,
    onChange: handleChanges,
    classNamePrefix: "react-form-select",
    className: "react-form-select"
  }))));
};

exports.ArrayInput = ArrayInput;