"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseResolver = void 0;

var _form = require("../form");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseResolver = /*#__PURE__*/function () {
  function BaseResolver(type, constraints) {
    _classCallCheck(this, BaseResolver);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "required", void 0);

    _defineProperty(this, "test", void 0);

    _defineProperty(this, "when", void 0);

    _defineProperty(this, "oneOf", void 0);

    _defineProperty(this, "nullable", void 0);

    this.type = type;
    this.required = constraints.required;
    this.test = constraints.test;
    this.when = constraints.when;
    this.oneOf = constraints.oneOf;
    this.nullable = constraints.nullable;
  }

  _createClass(BaseResolver, [{
    key: "toBaseResolver",
    value: function toBaseResolver(yupResolver, key, dependencies) {
      var _this = this;

      var baseResolver = yupResolver;

      if (this.required) {
        baseResolver = baseResolver.required(this.required.message);
      }

      if (this.test) {
        if (Array.isArray(this.test)) {
          this.test.forEach(function (t) {
            baseResolver = baseResolver.test(t.name, t.message, t.test);
          });
        } else {
          baseResolver = baseResolver.test(this.test.name, this.test.message, this.test.test);
        }
      }

      if (this.oneOf) {
        baseResolver = baseResolver.oneOf(this.oneOf.arrayOfValues || [], this.oneOf.message);
      }

      if (!!this.when) {
        if (Array.isArray(this.when)) {
          this.when.forEach(function (when) {
            baseResolver = baseResolver.when([String(when.ref)], {
              is: function is(val) {
                return when.test(val);
              },
              then: (0, _form.buildSubResolver)({
                type: _this.type,
                constraints: when.then
              }, key, dependencies),
              otherwise: (0, _form.buildSubResolver)({
                type: _this.type,
                constraints: when.otherwise
              }, key, dependencies)
            });
            dependencies.push([key, when.ref]);
          });
        } else {
          baseResolver = baseResolver.when([String(this.when.ref)], {
            is: function is(val) {
              var _this$when;

              return !Array.isArray(_this.when) && ((_this$when = _this.when) === null || _this$when === void 0 ? void 0 : _this$when.test(val));
            },
            then: (0, _form.buildSubResolver)({
              type: this.type,
              constraints: this.when.then
            }, key, dependencies),
            otherwise: (0, _form.buildSubResolver)({
              type: this.type,
              constraints: this.when.otherwise
            }, key, dependencies)
          });
          dependencies.push([key, this.when.ref]);
        }
      }

      if (!!this.nullable) {
        baseResolver = baseResolver.nullable();
      }

      return baseResolver;
    }
  }]);

  return BaseResolver;
}();

exports.BaseResolver = BaseResolver;