"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _showdown = _interopRequireDefault(require("showdown"));

var _reactAce = _interopRequireDefault(require("react-ace"));

var _classnames = _interopRequireDefault(require("classnames"));

require("@fortawesome/fontawesome-free/css/all.css");

require("highlight.js/styles/monokai.css");

require("ace-builds/src-noconflict/mode-html");

require("ace-builds/src-noconflict/mode-json");

require("ace-builds/src-noconflict/mode-javascript");

require("ace-builds/src-noconflict/mode-markdown");

require("ace-builds/src-noconflict/theme-monokai");

require("ace-builds/src-noconflict/ext-searchbox");

require("ace-builds/src-noconflict/ext-language_tools");

var _highlight = _interopRequireDefault(require("highlight.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

window.hljs = window.hljs || _highlight.default;

var DaikokuExtension = function DaikokuExtension() {
  // @ref:[]()
  var refextension = {
    type: 'lang',
    regex: /@ref:\[(.*)\]\((.*)\)/g,
    replace: function replace(expression, title, docId) {
      var path = window.location.pathname;
      var rawParts = path.split('/');
      rawParts.shift();
      var parts = rawParts.splice(0, 5);
      var teamId = parts[1];
      var apiId = parts[3];
      var versionId = parts[4];
      return "<a href=\"/".concat(teamId, "/").concat(apiId, "/").concat(versionId, "/documentation/").concat(docId, "\">").concat(title, "</a>");
    }
  }; // @@@

  var tripleArobase = {
    type: 'lang',
    regex: /@@@/g,
    replace: function replace() {
      // console.log('@@@');
      return '</div>';
    }
  }; // @@@ warning

  var warningExtension = {
    type: 'lang',
    regex: /@@@ warning/g,
    replace: function replace() {
      return '<div class="note note-warning">';
    }
  }; // @@@ warning { title= }

  var warningTitleExtension = {
    type: 'lang',
    regex: /@@@ warning \{ title='(.*)' \}/g,
    replace: function replace(expr, title) {
      return "<div class=\"note note-warning\"><div class=\"note-title\">".concat(title, "</div>");
    }
  }; // @@@ note

  var noteExtension = {
    type: 'lang',
    regex: /@@@ note/g,
    replace: function replace() {
      return '<div class="note">';
    }
  }; // @@@ note { title= }

  var noteTitleExtension = {
    type: 'lang',
    regex: /@@@ note \{ title='(.*)' \}/g,
    replace: function replace(expr, title) {
      return "<div class=\"note\"><div class=\"note-title\">".concat(title, "</div>");
    }
  };
  return [refextension, warningTitleExtension, noteTitleExtension, warningExtension, noteExtension, tripleArobase];
};

var converter = new _showdown.default.Converter({
  omitExtraWLInCodeBlocks: true,
  ghCompatibleHeaderId: true,
  parseImgDimensions: true,
  simplifiedAutoLink: true,
  tables: true,
  tasklists: true,
  requireSpaceBeforeHeadingText: true,
  ghMentions: true,
  emoji: true,
  ghMentionsLink: '/{u}',
  extensions: [DaikokuExtension]
});

var MarkdownInput = function MarkdownInput(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      preview = _useState2[0],
      setPreview = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      editor = _useState4[0],
      setEditor = _useState4[1];

  (0, _react.useEffect)(function () {
    if (preview) {
      showPreview();
    }
  }, [preview]);
  var commands = [{
    name: 'Add header',
    icon: 'heading',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "# ".concat(selected);
    }
  }, {
    name: 'Add bold text',
    icon: 'bold',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "**".concat(selected, "**");
    }
  }, {
    name: 'Add italic text',
    icon: 'italic',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "*".concat(selected, "*");
    }
  }, {
    name: 'Add strikethrough text',
    icon: 'strikethrough',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "~~".concat(selected, "~~");
    }
  }, {
    name: 'Add link',
    icon: 'link',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "[".concat(selected, "](url)");
    }
  }, {
    name: 'Add code',
    icon: 'code',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return '```\n' + selected + '\n```\n';
    },
    move: function move(pos, setPos) {
      return setPos({
        column: 0,
        row: pos.row - 2
      });
    }
  }, {
    name: 'Add quotes',
    icon: 'quote-right',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "> ".concat(selected);
    }
  }, {
    name: 'Add image',
    icon: 'image',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "![".concat(selected, "](image-url)");
    }
  }, {
    name: 'Add unordered list',
    icon: 'list-ul',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "* ".concat(selected);
    }
  }, {
    name: 'Add ordered list',
    icon: 'list-ol',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "1. ".concat(selected);
    }
  }, {
    name: 'Add check list',
    icon: 'tasks',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "* [ ] ".concat(selected);
    }
  }, {
    name: 'Page ref',
    icon: 'book',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "@ref:[".concat(selected, "](team/api/doc)");
    }
  }, {
    name: 'Warning',
    icon: 'exclamation-triangle',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "@@@ warning\n".concat(selected, "\n@@@\n");
    },
    move: function move(pos, setPos) {
      return setPos({
        column: 0,
        row: pos.row - 2
      });
    }
  }, {
    name: 'Warning with title',
    icon: 'exclamation-circle',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "@@@ warning { title='A nice title' }\n".concat(selected, "\n@@@\n");
    },
    move: function move(pos, setPos) {
      return setPos({
        column: 0,
        row: pos.row - 2
      });
    }
  }, {
    name: 'Note',
    icon: 'sticky-note',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "@@@ note\n".concat(selected, "\n@@@\n");
    },
    move: function move(pos, setPos) {
      return setPos({
        column: 0,
        row: pos.row - 2
      });
    }
  }, {
    name: 'Note with title',
    icon: 'clipboard',
    inject: function inject() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
      return "@@@ note { title='A nice title' }\n".concat(selected, "\n@@@\n");
    },
    move: function move(pos, setPos) {
      return setPos({
        column: 0,
        row: pos.row - 2
      });
    }
  }, {
    name: 'Lorem Ipsum',
    icon: 'feather-alt',
    inject: function inject() {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida convallis leo et aliquet. Aenean venenatis, elit et dignissim scelerisque, urna dui mollis nunc, id eleifend velit sem et ante. Quisque pharetra sed tellus id finibus. In quis porta libero. Nunc egestas eros elementum lacinia blandit. Donec nisi lacus, tristique vel blandit in, sodales eget lacus. Phasellus ultrices magna vel odio vestibulum, a rhoncus nunc ornare. Sed laoreet finibus arcu vitae aliquam. Aliquam quis ex dui.';
    }
  }, {
    name: 'Long Lorem Ipsum',
    icon: 'feather',
    inject: function inject() {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida convallis leo et aliquet. Aenean venenatis, elit et dignissim scelerisque, urna dui mollis nunc, id eleifend velit sem et ante. Quisque pharetra sed tellus id finibus. In quis porta libero. Nunc egestas eros elementum lacinia blandit. Donec nisi lacus, tristique vel blandit in, sodales eget lacus. Phasellus ultrices magna vel odio vestibulum, a rhoncus nunc ornare. Sed laoreet finibus arcu vitae aliquam. Aliquam quis ex dui.\n\nCras ut ultrices quam. Nulla eu purus sed turpis consequat sodales. Aenean vitae efficitur velit, vel accumsan felis. Curabitur aliquam odio dictum urna convallis faucibus. Vivamus eu dignissim lorem. Donec sed hendrerit massa. Suspendisse volutpat, nisi at fringilla consequat, eros lacus aliquam metus, eu convallis nulla mauris quis lacus. Aliquam ultricies, mi eget feugiat vestibulum, enim nunc eleifend nisi, nec tincidunt turpis elit id diam. Nunc placerat accumsan tincidunt. Nulla ut interdum dui. Praesent venenatis cursus aliquet. Nunc pretium rutrum felis nec pharetra.\n\nVivamus sapien ligula, hendrerit a libero vitae, convallis maximus massa. Praesent ante leo, fermentum vitae libero finibus, blandit porttitor risus. Nulla ac hendrerit turpis. Sed varius velit at libero feugiat luctus. Nunc rhoncus sem dolor, nec euismod justo rhoncus vitae. Vivamus finibus nulla a purus vestibulum sagittis. Maecenas maximus orci at est lobortis, nec facilisis erat rhoncus. Sed tempus leo et est dictum lobortis. Vestibulum rhoncus, nisl ut porta sollicitudin, arcu urna egestas arcu, eget efficitur neque ipsum ut felis. Ut commodo purus quis turpis tempus tincidunt. Donec id hendrerit eros. Vestibulum vitae justo consectetur, egestas nisi ac, eleifend odio.\n\nDonec id mi cursus, volutpat dolor sed, bibendum sapien. Etiam vitae mauris sit amet urna semper tempus vel non metus. Integer sed ligula diam. Aenean molestie ultrices libero eget suscipit. Phasellus maximus euismod eros ut scelerisque. Ut quis tempus metus. Sed mollis volutpat velit eget pellentesque. Integer hendrerit ultricies massa eu tincidunt. Quisque at cursus augue. Sed diam odio, molestie sed dictum eget, efficitur nec nulla. Nullam vulputate posuere nunc nec laoreet. Integer varius sed erat vitae cursus. Vivamus auctor augue enim, a fringilla mauris molestie eget.\n\nProin vehicula ligula vel enim euismod, sed congue mi egestas. Nullam varius ut felis eu fringilla. Quisque sodales tortor nec justo tristique, sit amet consequat mi tincidunt. Suspendisse porttitor laoreet velit, non gravida nibh cursus at. Pellentesque faucibus, tellus in dapibus viverra, dolor mi dignissim tortor, id convallis ipsum lorem id nisl. Sed id nisi felis. Aliquam in ullamcorper ipsum, vel consequat magna. Donec nec mollis lacus, a euismod elit.";
    }
  }];

  var showPreview = function showPreview() {
    Array.from(document.querySelectorAll('pre code')).forEach(function (block, idx) {
      window.hljs.highlightElement(block);
    });
  };

  var injectButtons = function injectButtons() {
    return commands.map(function (command, idx) {
      if (command.component) {
        return command.component(idx);
      }

      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "btn-for-descriptionToolbar",
        "aria-label": command.name,
        title: command.name,
        key: "toolbar-btn-".concat(idx),
        onClick: function onClick() {
          var selection = editor.getSelection();

          if (selection) {
            editor.session.replace(selection.getRange(), command.inject(editor.getSelectedText()));
          } else {
            editor.session.insert(editor.getCursorPosition(), command.inject());
          }

          if (command.move) {
            command.move(editor.getCursorPosition(), function (p) {
              return editor.moveCursorToPosition(p);
            });
          }

          editor.focus();
        }
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fas fa-".concat(command.icon)
      }));
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("d-flex flex-column", props.className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBottom: 10,
      flexWrap: 'wrap'
    },
    className: "d-flex flex-sm-row flex-column align-items-center"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "btn-group"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    style: {
      color: !preview ? '#7f96af' : 'white'
    },
    onClick: function onClick() {
      return setPreview(false);
    }
  }, "Write"), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    style: {
      color: preview ? '#7f96af' : 'white'
    },
    onClick: function onClick() {
      return setPreview(true);
    }
  }, "Preview"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex flex-row"
  }, injectButtons())), !preview && /*#__PURE__*/_react.default.createElement(_reactAce.default, {
    ref: function ref(r) {
      if (r && r.editor) {
        setEditor(r.editor);
      }
    },
    mode: "markdown",
    theme: "monokai",
    style: {
      zIndex: 0,
      isolation: 'isolate'
    },
    onChange: props.onChange,
    value: props.value,
    name: "scriptParam",
    editorProps: {
      $blockScrolling: true
    },
    height: props.height || '300px',
    width: props.width || '100%',
    showGutter: true,
    tabSize: 2,
    highlightActiveLine: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  }), preview && /*#__PURE__*/_react.default.createElement("div", {
    className: "api-description",
    dangerouslySetInnerHTML: {
      __html: converter.makeHtml(props.value)
    }
  }));
};

exports.MarkdownInput = MarkdownInput;