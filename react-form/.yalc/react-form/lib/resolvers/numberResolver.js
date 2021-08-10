"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberResolver = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _baseResolver = require("./baseResolver");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NumberResolver = /*#__PURE__*/function (_BaseResolver) {
  _inherits(NumberResolver, _BaseResolver);

  var _super = _createSuper(NumberResolver);

  function NumberResolver(constraints) {
    var _this;

    _classCallCheck(this, NumberResolver);

    _this = _super.call(this, 'number', constraints);

    _defineProperty(_assertThisInitialized(_this), "min", void 0);

    _defineProperty(_assertThisInitialized(_this), "max", void 0);

    _defineProperty(_assertThisInitialized(_this), "positive", void 0);

    _defineProperty(_assertThisInitialized(_this), "negative", void 0);

    _defineProperty(_assertThisInitialized(_this), "integer", void 0);

    _defineProperty(_assertThisInitialized(_this), "lessThan", void 0);

    _defineProperty(_assertThisInitialized(_this), "moreThan", void 0);

    _this.min = constraints.min;
    _this.max = constraints.max;
    _this.positive = constraints.positive;
    _this.negative = constraints.negative;
    _this.integer = constraints.integer;
    _this.lessThan = constraints.lessThan;
    return _this;
  }

  _createClass(NumberResolver, [{
    key: "toResolver",
    value: function toResolver(key, dependencies) {
      var resolver = yup.number();

      if (this.integer) {
        resolver = resolver.integer(this.integer.message);
      }

      if (this.positive) {
        resolver = resolver.positive(this.positive.message);
      }

      if (this.negative) {
        resolver = resolver.negative(this.negative.message);
      }

      if (this.min) {
        resolver = resolver.min(this.min.value, this.min.message);
      }

      if (this.max) {
        resolver = resolver.max(this.max.value, this.max.message);
      }

      if (this.moreThan) {
        if (typeof this.moreThan.ref === 'string') {
          resolver = resolver.moreThan(yup.ref(this.moreThan.ref), this.moreThan.message);
        }

        if (typeof this.moreThan.ref === 'number') {
          resolver = resolver.moreThan(Number(this.moreThan.ref), this.moreThan.message);
        }

        dependencies.push([key, this.moreThan.ref]);
      }

      if (this.lessThan) {
        if (typeof this.lessThan.ref === 'string') {
          resolver = resolver.lessThan(yup.ref(this.lessThan.ref), this.lessThan.message);
        }

        if (typeof this.lessThan.ref === 'number') {
          resolver = resolver.lessThan(this.lessThan.ref, this.lessThan.message);
        }

        dependencies.push([key, this.lessThan.ref]);
      }

      return _get(_getPrototypeOf(NumberResolver.prototype), "toBaseResolver", this).call(this, resolver, key, dependencies);
    }
  }]);

  return NumberResolver;
}(_baseResolver.BaseResolver);

exports.NumberResolver = NumberResolver;