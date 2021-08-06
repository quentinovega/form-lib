"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAce = _interopRequireDefault(require("react-ace"));

require("ace-builds/src-noconflict/mode-html");

require("ace-builds/src-noconflict/mode-json");

require("ace-builds/src-noconflict/mode-javascript");

require("ace-builds/src-noconflict/mode-markdown");

require("ace-builds/src-noconflict/theme-monokai");

require("ace-builds/src-noconflict/ext-searchbox");

require("ace-builds/src-noconflict/ext-language_tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeInput = function CodeInput(_ref) {
  var onChange = _ref.onChange,
      value = _ref.value,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      readOnly = _ref.readOnly;
  return /*#__PURE__*/_react.default.createElement(_reactAce.default, {
    className: className,
    readOnly: readOnly,
    style: {
      zIndex: 0,
      isolation: 'isolate'
    },
    mode: "javascript",
    theme: "monokai",
    onChange: onChange,
    value: value,
    name: "scriptParam",
    editorProps: {
      $blockScrolling: true
    },
    height: "300px",
    width: "100%",
    showGutter: true,
    tabSize: 2,
    highlightActiveLine: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  });
};

exports.CodeInput = CodeInput;