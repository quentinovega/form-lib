"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = exports.getShapeAndDependencies = exports.buildSubResolver = void 0;

var _yup = require("@hookform/resolvers/yup");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _reactFeather = require("react-feather");

var _reactHookForm = require("react-hook-form");

var _reactRainbowComponents = require("react-rainbow-components");

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _uuid = require("uuid");

var yup = _interopRequireWildcard(require("yup"));

var _types = require("./types");

var _index = require("./inputs/index");

var _index2 = require("./resolvers/index");

var _Option = require("./Option");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var buildSubResolver = function buildSubResolver(props, key, dependencies) {
  var resolver;
  var type = props.type,
      _props$constraints = props.constraints,
      constraints = _props$constraints === void 0 ? {} : _props$constraints;

  if (props.format === 'array' || props.isMulti) {
    var subResolver;

    if (props.schema && props.schema.type) {
      subResolver = buildSubResolver(props.schema, key, dependencies);
    } else if (props.schema) {
      resolver = getShapeAndDependencies(Object.keys(props.schema), props.schema, dependencies);
      subResolver = yup.object().shape(resolver, dependencies);
    }

    resolver = new _index2.ArrayResolver(constraints).toResolver(subResolver, key, dependencies);
  } else {
    switch (type) {
      case _types.Types.string:
        resolver = new _index2.StringResolver(constraints).toResolver(key, dependencies);
        break;

      case _types.Types.number:
        resolver = new _index2.NumberResolver(constraints).toResolver(key, dependencies);
        break;

      case _types.Types.bool:
        resolver = new _index2.BooleanResolver(constraints).toResolver(key, dependencies);
        break;

      case _types.Types.object:
        resolver = new _index2.ObjectResolver(constraints).toResolver(key, dependencies);
        break;

      case _types.Types.date:
        resolver = new _index2.DateResolver(constraints).toResolver(key, dependencies);
        break;

      case _types.Types.file:
        resolver = new _index2.FileResolver(constraints).toResolver(key, dependencies);
        break;

      default:
        break;
    }
  }

  return resolver;
};

exports.buildSubResolver = buildSubResolver;

var getShapeAndDependencies = function getShapeAndDependencies(flow, schema) {
  var dependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var shape = flow.reduce(function (resolvers, key) {
    if (_typeof(key) === 'object') {
      return _objectSpread(_objectSpread({}, resolvers), getShapeAndDependencies(key.flow, schema, dependencies).shape);
    }

    var resolver = buildSubResolver(schema[key], key, dependencies);
    return _objectSpread(_objectSpread({}, resolvers), {}, _defineProperty({}, key, resolver));
  }, {});
  return {
    shape: shape,
    dependencies: dependencies
  };
};

exports.getShapeAndDependencies = getShapeAndDependencies;

var BasicWrapper = function BasicWrapper(_ref) {
  var entry = _ref.entry,
      label = _ref.label,
      error = _ref.error,
      help = _ref.help,
      children = _ref.children,
      render = _ref.render;
  var id = (0, _uuid.v4)();

  if (render) {
    return render({
      entry: entry,
      label: label,
      error: error,
      help: help,
      children: children
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mt-3"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-label d-flex align-content-center",
    htmlFor: entry
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "mr-2"
  }, label), help && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactTooltip.default, {
    html: true,
    place: 'bottom',
    id: id
  }), /*#__PURE__*/_react.default.createElement("span", {
    "data-html": true,
    "data-tip": help,
    "data-for": id
  }, /*#__PURE__*/_react.default.createElement(_reactFeather.HelpCircle, {
    style: {
      color: 'gray',
      width: 17,
      marginLeft: '.5rem',
      cursor: 'help'
    }
  })))), children, error && /*#__PURE__*/_react.default.createElement("div", {
    className: "invalid-feedback"
  }, error.message));
};

var CustomizableInput = function CustomizableInput(props) {
  if (props.render) {
    return props.render(_objectSpread(_objectSpread({}, props.field), {}, {
      error: props.error
    }));
  }

  return props.children;
};

var getDefaultValues = function getDefaultValues(flow, schema) {
  return flow.reduce(function (acc, key) {
    var entry = schema[key];

    if (_typeof(key) === 'object') {
      return _objectSpread(_objectSpread({}, acc), getDefaultValues(key.flow, schema));
    }

    if (typeof entry.defaultValue !== 'undefined' && entry.defaultValue !== null) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, entry.defaultValue));
    }

    var defaultValue = undefined;

    if (entry.type === _types.Types.object) {
      defaultValue = {};
    }

    if (entry.format === 'array' || entry.isMulti) {
      defaultValue = [];
    }

    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, defaultValue));
  }, {});
};

var Form = function Form(_ref2) {
  var schema = _ref2.schema,
      flow = _ref2.flow,
      value = _ref2.value,
      inputWrapper = _ref2.inputWrapper,
      onChange = _ref2.onChange,
      footer = _ref2.footer,
      httpClient = _ref2.httpClient;

  var maybeCustomHttpClient = function maybeCustomHttpClient(url, method) {
    //todo: if present props.resolve()
    if (httpClient) {
      return httpClient(url, method);
    }

    return fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };

  var defaultValues = getDefaultValues(flow, schema);

  var _getShapeAndDependenc = getShapeAndDependencies(flow, schema),
      shape = _getShapeAndDependenc.shape,
      dependencies = _getShapeAndDependenc.dependencies;

  var resolver = yup.object().shape(shape, dependencies);

  var _useForm = (0, _reactHookForm.useForm)({
    resolver: (0, _yup.yupResolver)(resolver),
    defaultValues: value || defaultValues
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      errors = _useForm.formState.errors,
      control = _useForm.control,
      _reset = _useForm.reset,
      watch = _useForm.watch,
      trigger = _useForm.trigger,
      getValues = _useForm.getValues,
      setValue = _useForm.setValue;

  (0, _react.useEffect)(function () {
    if (flow && value) {
      _reset(value);
    }
  }, [value, flow, _reset]); // console.debug(watch())

  return /*#__PURE__*/_react.default.createElement("form", {
    className: "col-12 section pt-2 pr-2",
    onSubmit: handleSubmit(onChange)
  }, flow.map(function (entry, idx) {
    return /*#__PURE__*/_react.default.createElement(Step, {
      key: idx,
      entry: entry,
      step: schema[entry],
      errors: errors,
      register: register,
      schema: schema,
      control: control,
      trigger: trigger,
      getValues: getValues,
      setValue: setValue,
      watch: watch,
      inputWrapper: inputWrapper,
      httpClient: maybeCustomHttpClient
    });
  }), /*#__PURE__*/_react.default.createElement(Footer, {
    render: footer,
    reset: function reset() {
      return _reset(defaultValues);
    },
    valid: handleSubmit(onChange)
  }));
};

exports.Form = Form;

var Footer = function Footer(props) {
  if (props.render) {
    return props.render({
      reset: props.reset,
      valid: props.valid
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex flex-row justify-content-end"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-danger",
    type: "button",
    onClick: props.reset
  }, "Annuler"), /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-success ml-1",
    type: "submit"
  }, "Sauvegarder"));
};

var Step = function Step(_ref3) {
  var entry = _ref3.entry,
      step = _ref3.step,
      errors = _ref3.errors,
      register = _ref3.register,
      schema = _ref3.schema,
      control = _ref3.control,
      trigger = _ref3.trigger,
      getValues = _ref3.getValues,
      setValue = _ref3.setValue,
      watch = _ref3.watch,
      inputWrapper = _ref3.inputWrapper,
      httpClient = _ref3.httpClient;

  if (entry && _typeof(entry) === 'object') {
    var errored = entry.flow.some(function (step) {
      return !!errors[step];
    });
    return /*#__PURE__*/_react.default.createElement(_index.Collapse, {
      label: entry.label,
      collapsed: entry.collapsed,
      errored: errored
    }, entry.flow.map(function (entry, idx) {
      return /*#__PURE__*/_react.default.createElement(Step, {
        key: idx,
        entry: entry,
        step: schema[entry],
        errors: errors,
        register: register,
        schema: schema,
        control: control,
        trigger: trigger,
        getValues: getValues,
        setValue: setValue,
        watch: watch,
        inputWrapper: inputWrapper
      });
    }));
  }

  var visibleStep = step && (0, _Option.option)(step.visible).map(function (visible) {
    switch (_typeof(visible)) {
      case 'object':
        var value = watch(step.visible.ref);
        return (0, _Option.option)(step.visible.test).map(function (test) {
          return test(value);
        }).getOrElse(value);

      case 'boolean':
        return visible;

      default:
        return true;
    }
  }).getOrElse(true);

  if (!visibleStep) {
    return null;
  }

  switch (step.type) {
    case _types.Types.string:
      switch (step.format) {
        case 'text':
          return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
            entry: entry,
            error: errors[entry],
            label: entry,
            help: step.help,
            render: inputWrapper
          }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
            render: step.render,
            field: {
              rawValues: getValues(),
              value: getValues(entry),
              onChange: function onChange(v) {
                return setValue(entry, v);
              }
            },
            error: errors[entry]
          }, /*#__PURE__*/_react.default.createElement("textarea", _extends({
            type: "text",
            id: entry,
            className: (0, _classnames.default)("form-control", {
              'is-invalid': errors[entry]
            }),
            readOnly: step.disabled ? 'readOnly' : null
          }, step.props, {
            name: entry,
            placeholder: step.placeholder
          }, register(entry)))));

        case 'code':
          return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
            name: entry,
            control: control,
            render: function render(_ref4) {
              var field = _ref4.field;
              return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
                entry: entry,
                error: errors[entry],
                label: entry,
                help: step.help,
                render: inputWrapper
              }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
                render: step.render,
                field: _objectSpread({
                  rawValues: getValues()
                }, field),
                error: errors[entry]
              }, /*#__PURE__*/_react.default.createElement(_index.CodeInput, _extends({}, step.props, {
                className: (0, _classnames.default)({
                  'is-invalid': errors[entry]
                }),
                readOnly: step.disabled ? 'readOnly' : null,
                onChange: field.onChange,
                value: field.value
              }, step))));
            }
          });

        case 'markdown':
          return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
            name: entry,
            control: control,
            render: function render(_ref5) {
              var field = _ref5.field;
              return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
                entry: entry,
                error: errors[entry],
                label: entry,
                help: step.help,
                render: inputWrapper
              }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
                render: step.render,
                field: _objectSpread({
                  rawValues: getValues()
                }, field),
                error: errors[entry]
              }, /*#__PURE__*/_react.default.createElement(_index.MarkdownInput, _extends({}, step.props, {
                className: (0, _classnames.default)({
                  'is-invalid': errors[entry]
                }),
                readOnly: step.disabled ? 'readOnly' : null,
                onChange: field.onChange,
                value: field.value
              }, step))));
            }
          });

        case 'array':
          return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
            entry: entry,
            error: errors[entry],
            label: entry,
            help: step.help,
            render: inputWrapper
          }, /*#__PURE__*/_react.default.createElement(ArrayStep, {
            entry: entry,
            step: step,
            trigger: trigger,
            register: register,
            control: control,
            errors: errors,
            setValue: setValue,
            values: getValues(entry),
            component: function component(props, idx) {
              return /*#__PURE__*/_react.default.createElement(CustomizableInput, {
                render: step.render,
                field: {
                  rawValues: getValues(),
                  value: getValues("".concat(entry, ".").concat(idx)),
                  onChange: function onChange(v) {
                    return setValue("".concat(entry, ".").concat(idx), v, {
                      shouldValidate: true
                    });
                  }
                },
                error: errors[entry] && errors[entry][idx]
              }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("input", _extends({}, step.props, {
                type: "text",
                readOnly: step.disabled ? 'readOnly' : null,
                className: (0, _classnames.default)("form-control", {
                  'is-invalid': errors[entry] && errors[entry][idx]
                }),
                placeholder: step.placeholder
              }, props)), errors[entry] && errors[entry][idx] && /*#__PURE__*/_react.default.createElement("div", {
                className: "invalid-feedback"
              }, errors[entry][idx].message)));
            }
          }));

        case 'select':
          return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
            name: entry,
            control: control,
            render: function render(_ref6) {
              var field = _ref6.field;
              return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
                entry: entry,
                error: errors[entry],
                label: entry,
                help: step.help,
                render: inputWrapper
              }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
                render: step.render,
                field: _objectSpread({
                  rawValues: getValues()
                }, field),
                error: errors[entry]
              }, /*#__PURE__*/_react.default.createElement(_index.SelectInput, _extends({}, step.props, {
                className: (0, _classnames.default)({
                  'is-invalid': errors[entry]
                }),
                readOnly: step.disabled ? 'readOnly' : null,
                onChange: field.onChange,
                value: field.value,
                possibleValues: step.options
              }, step))));
            }
          });

        default:
          return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
            entry: entry,
            error: errors[entry],
            label: entry,
            help: step.help,
            render: inputWrapper
          }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
            render: step.render,
            field: {
              rawValues: getValues(),
              value: getValues(entry),
              onChange: function onChange(v) {
                return setValue(entry, v, {
                  shouldValidate: true
                });
              }
            },
            error: errors[entry]
          }, /*#__PURE__*/_react.default.createElement("input", _extends({}, step.props, {
            type: step.format || 'text',
            id: entry,
            className: (0, _classnames.default)("form-control", {
              'is-invalid': errors[entry]
            }),
            readOnly: step.disabled ? 'readOnly' : null,
            name: entry,
            defaultValue: "",
            placeholder: step.placeholder
          }, register(entry)))));
      }

    case _types.Types.number:
      switch (step.format) {
        case 'array':
          return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
            entry: entry,
            error: errors[entry],
            label: entry,
            help: step.help,
            render: inputWrapper
          }, /*#__PURE__*/_react.default.createElement(ArrayStep, {
            entry: entry,
            step: step,
            trigger: trigger,
            register: register,
            control: control,
            errors: errors,
            values: getValues(entry),
            component: function component(props, idx) {
              return /*#__PURE__*/_react.default.createElement(CustomizableInput, {
                render: step.render,
                field: {
                  rawValues: getValues(),
                  value: getValues("".concat(entry, ".").concat(idx)),
                  onChange: function onChange(v) {
                    return setValue("".concat(entry, ".").concat(idx), v, {
                      shouldValidate: true
                    });
                  }
                },
                error: errors[entry] && errors[entry][idx]
              }, /*#__PURE__*/_react.default.createElement("input", _extends({}, step.props, {
                type: "number",
                className: (0, _classnames.default)("form-control", {
                  'is-invalid': errors[entry] && errors[entry][idx]
                }),
                readOnly: step.disabled ? 'readOnly' : null,
                placeholder: step.placeholder
              }, props)), errors[entry] && errors[entry][idx] && /*#__PURE__*/_react.default.createElement("div", {
                className: "invalid-feedback"
              }, errors[entry][idx].message));
            }
          }));

        default:
          return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
            entry: entry,
            error: errors[entry],
            label: entry,
            help: step.help,
            render: inputWrapper
          }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
            render: step.render,
            field: {
              rawValues: getValues(),
              value: getValues(entry),
              onChange: function onChange(v) {
                return setValue(entry, v);
              }
            },
            error: errors[entry]
          }, /*#__PURE__*/_react.default.createElement("input", _extends({}, step.props, {
            type: "number",
            id: entry,
            className: (0, _classnames.default)("form-control", {
              'is-invalid': errors[entry]
            }),
            readOnly: step.disabled ? 'readOnly' : null,
            name: entry,
            placeholder: step.placeholder
          }, register(entry)))));
      }

    case _types.Types.bool:
      return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
        name: entry,
        control: control,
        render: function render(_ref7) {
          var field = _ref7.field;
          return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
            entry: entry,
            error: errors[entry],
            label: entry,
            help: step.help,
            render: inputWrapper
          }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
            render: step.render,
            field: _objectSpread({
              rawValues: getValues()
            }, field),
            error: errors[entry]
          }, /*#__PURE__*/_react.default.createElement(_index.BooleanInput, _extends({}, step.props, {
            className: (0, _classnames.default)({
              'is-invalid': errors[entry]
            }),
            readOnly: step.disabled ? 'readOnly' : null,
            onChange: field.onChange,
            value: field.value
          }))));
        }
      });

    case _types.Types.object:
      switch (step.format) {
        case 'select':
          return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
            name: entry,
            control: control,
            defaultValue: step.defaultValue,
            render: function render(_ref8) {
              var field = _ref8.field;
              return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
                entry: entry,
                error: errors[entry],
                label: entry,
                help: step.help,
                render: inputWrapper
              }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
                render: step.render,
                field: _objectSpread({
                  rawValues: getValues()
                }, field),
                error: errors[entry]
              }, /*#__PURE__*/_react.default.createElement(_index.SelectInput, _extends({}, step.props, {
                className: (0, _classnames.default)({
                  'is-invalid': errors[entry]
                }),
                readOnly: step.disabled ? 'readOnly' : null,
                onChange: field.onChange,
                value: field.value,
                possibleValues: step.options,
                httpClient: httpClient
              }, step))));
            }
          });

        default:
          return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
            name: entry,
            control: control,
            defaultValue: step.defaultValue,
            render: function render(_ref9) {
              var field = _ref9.field;
              return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
                entry: entry,
                error: errors[entry],
                label: entry,
                help: step.help,
                render: inputWrapper
              }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
                render: step.render,
                field: _objectSpread({
                  rawValues: getValues()
                }, field),
                error: errors[entry]
              }, /*#__PURE__*/_react.default.createElement(_index.ObjectInput, _extends({}, step.props, {
                className: (0, _classnames.default)({
                  'is-invalid': errors[entry]
                }),
                readOnly: step.disabled ? 'readOnly' : null,
                onChange: field.onChange,
                value: field.value,
                possibleValues: step.options
              }, step))));
            }
          });
      }

    case _types.Types.date:
      return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
        name: entry,
        control: control,
        defaultValue: step.defaultValue,
        render: function render(_ref10) {
          var field = _ref10.field;
          return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
            entry: entry,
            error: errors[entry],
            label: entry,
            help: step.help,
            render: inputWrapper
          }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
            render: step.render,
            field: _objectSpread({
              rawValues: getValues()
            }, field),
            error: errors[entry]
          }, /*#__PURE__*/_react.default.createElement(_reactRainbowComponents.DatePicker, _extends({}, step.props, {
            id: "datePicker-1",
            className: (0, _classnames.default)({
              'is-invalid': errors[entry]
            }),
            readOnly: step.disabled ? 'readOnly' : null,
            value: field.value,
            onChange: field.onChange,
            formatStyle: "large" // locale={state.locale.name}

          }))));
        }
      });

    case _types.Types.file:
      if (step.format === 'hidden') {
        return /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, {
          name: entry,
          control: control,
          render: function render(_ref11) {
            var field = _ref11.field;

            var FileInput = function FileInput(_ref12) {
              var onChange = _ref12.onChange;

              var _useState = (0, _react.useState)(false),
                  _useState2 = _slicedToArray(_useState, 2),
                  uploading = _useState2[0],
                  setUploading = _useState2[1];

              var _useState3 = (0, _react.useState)(undefined),
                  _useState4 = _slicedToArray(_useState3, 2),
                  input = _useState4[0],
                  setInput = _useState4[1];

              var setFiles = function setFiles(e) {
                var files = e.target.files;
                setUploading(true);
                onChange(files);
                setUploading(false);
              };

              var trigger = function trigger() {
                input.click();
              };

              return /*#__PURE__*/_react.default.createElement("div", {
                className: (0, _classnames.default)("d-flex flex-row justify-content-start", {
                  'is-invalid': errors[entry]
                })
              }, /*#__PURE__*/_react.default.createElement("input", {
                ref: function ref(r) {
                  return setInput(r);
                },
                type: "file",
                multiple: true,
                className: "form-control d-none",
                onChange: setFiles
              }), /*#__PURE__*/_react.default.createElement("button", {
                type: "button",
                className: "btn btn-outline-success pl",
                disabled: uploading,
                onClick: trigger
              }, uploading && /*#__PURE__*/_react.default.createElement(_reactFeather.Loader, null), !uploading && /*#__PURE__*/_react.default.createElement(_reactFeather.Upload, null), "Select file"));
            };

            return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
              entry: entry,
              error: errors[entry],
              label: entry,
              help: step.help,
              render: inputWrapper
            }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
              render: step.render,
              field: _objectSpread({
                rawValues: getValues()
              }, field),
              error: errors[entry]
            }, /*#__PURE__*/_react.default.createElement(FileInput, {
              onChange: field.onChange,
              error: errors[entry]
            })));
          }
        });
      }

      return /*#__PURE__*/_react.default.createElement(BasicWrapper, {
        entry: entry,
        error: errors[entry],
        label: entry,
        help: step.help,
        render: inputWrapper
      }, /*#__PURE__*/_react.default.createElement(CustomizableInput, {
        render: step.render,
        field: {
          rawValues: getValues(),
          value: getValues(entry),
          onChange: function onChange(v) {
            return setValue(entry, v, {
              shouldValidate: true
            });
          }
        },
        error: errors[entry]
      }, /*#__PURE__*/_react.default.createElement("input", _extends({}, step.props, {
        type: "file",
        id: entry,
        className: (0, _classnames.default)("form-control", {
          'is-invalid': errors[entry]
        }),
        readOnly: step.disabled ? 'readOnly' : null,
        name: entry,
        placeholder: step.placeholder
      }, register(entry)))));

    default:
      return null;
  }
};

var ArrayStep = function ArrayStep(_ref13) {
  var entry = _ref13.entry,
      step = _ref13.step,
      control = _ref13.control,
      trigger = _ref13.trigger,
      register = _ref13.register,
      errors = _ref13.errors,
      component = _ref13.component,
      values = _ref13.values,
      defaultValue = _ref13.defaultValue,
      setValue = _ref13.setValue;

  var _useFieldArray = (0, _reactHookForm.useFieldArray)({
    control: control,
    // control props comes from useForm (optional: if you are using FormContext)
    name: entry // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name

  }),
      fields = _useFieldArray.fields,
      append = _useFieldArray.append,
      remove = _useFieldArray.remove;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, fields.map(function (field, idx) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: field.id,
      className: "d-flex flex-row"
    }, component(_objectSpread(_objectSpread({
      key: field.id
    }, register("".concat(entry, ".").concat(idx))), {}, {
      value: values[idx]
    }, field), idx), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group-append"
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: "btn btn-danger btn-sm",
      onClick: function onClick() {
        remove(idx);
        trigger("comments");
      }
    }, "remove")));
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "button",
    className: (0, _classnames.default)("btn btn-info mt-2", {
      'is-invalid': errors[entry]
    }),
    onClick: function onClick() {
      append(defaultValue);
      trigger(entry);
    },
    value: "Add"
  }), errors[entry] && /*#__PURE__*/_react.default.createElement("div", {
    className: "invalid-feedback"
  }, errors[entry].message)));
};