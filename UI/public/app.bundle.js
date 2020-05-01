/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/app.js":
/*!***********************!*\
  !*** ./public/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _graphQLFetch = __webpack_require__(/*! ./graphQLFetch.js */ \"./public/graphQLFetch.js\");\n\nvar _graphQLFetch2 = _interopRequireDefault(_graphQLFetch);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint linebreak-style: [\"error\", \"windows\"] */\n/* eslint \"react/react-in-jsx-scope\": \"off\" */\n/* globals React ReactDOM PropTypes*/\n/* eslint \"react/jsx-no-undef\": \"off\" */\n/* eslint \"react/no-multi-comp\": \"off\" */\n/* eslint \"no-alert\": \"off\" */\n\nvar contentNode = document.getElementById('contents');\n// const dateRegex = new RegExp('^\\\\d\\\\d\\\\d\\\\d-\\\\d\\\\d-\\\\d\\\\d');\n\n\nvar IssueList = function (_React$Component) {\n    _inherits(IssueList, _React$Component);\n\n    function IssueList() {\n        _classCallCheck(this, IssueList);\n\n        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));\n\n        _this.state = { issues: [] };\n        _this.createIssue = _this.createIssue.bind(_this);\n        return _this;\n    }\n\n    _createClass(IssueList, [{\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            this.loadData();\n        }\n    }, {\n        key: 'loadData',\n        value: async function loadData() {\n            // setTimeout(() => { this.setState({ issues: initialIssues }) }, 500);\n            var query = '\\n        query{\\n            issueList{\\n                id title status owner\\n                created effort completionDate \\n            }\\n        }';\n\n            var data = await (0, _graphQLFetch2.default)(query);\n            // console.log(data.issueList);\n            // console.log(\"Program halted above\");\n            if (data) {\n                this.setState({ issues: data.issueList });\n            }\n        }\n    }, {\n        key: 'createIssue',\n        value: async function createIssue(issue) {\n            // issue.id = this.state.issues.length + 1;\n            // issue.created = new Date();\n            // const newIssueList = this.state.issues.slice();\n            // newIssueList.push(issue);\n            // this.setState({ issues: newIssueList });\n            var query = 'mutation issueAdd($issue: IssueInputs!){\\n            issueAdd(issue:$issue) {\\n                id \\n                }\\n                }';\n            var data = await (0, _graphQLFetch2.default)(query, { issue: issue });\n            if (data) {\n                this.loadData();\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var issues = this.state.issues;\n\n            return React.createElement(\n                'div',\n                null,\n                React.createElement(\n                    'h1',\n                    null,\n                    'Issue Tracker'\n                ),\n                React.createElement(IssueFilter, null),\n                React.createElement('hr', null),\n                React.createElement(IssueTable, { issues: issues }),\n                React.createElement('hr', null),\n                React.createElement(IssueAdd, { createIssue: this.createIssue }),\n                React.createElement('hr', null)\n            );\n        }\n    }]);\n\n    return IssueList;\n}(React.Component);\n\n// eslint-disable-next-line react/prefer-stateless-function\n\n\nvar IssueFilter = function (_React$Component2) {\n    _inherits(IssueFilter, _React$Component2);\n\n    function IssueFilter() {\n        _classCallCheck(this, IssueFilter);\n\n        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));\n    }\n\n    _createClass(IssueFilter, [{\n        key: 'render',\n        value: function render() {\n            return React.createElement(\n                'div',\n                null,\n                'This is a placeholder for the issue filter'\n            );\n        }\n    }]);\n\n    return IssueFilter;\n}(React.Component);\n// function jsonDateReviver(key, value) {\n//     if (dateRegex.test(value)) return new Date(value);\n//     return value;\n// }\n\nfunction Issuerow(_ref) {\n    var issue = _ref.issue;\n\n    return React.createElement(\n        'tr',\n        null,\n        React.createElement(\n            'td',\n            null,\n            issue.id\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.status\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.owner\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.created\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.effort\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.completionDate\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.title\n        )\n    );\n}\n\n// Issuerow.propTypes = {\n//     issue_id: React.PropTypes.number.isRequired,\n//     issue_title: React.PropTypes.string\n//     };\n// Issuerow.defaultProps = {\n//     issue_title:'--no title--'\n// // };\n// Issuerow.defaultProps = {\n//     effort: 0              //doubt\n\n// };\nfunction IssueTable(_ref2) {\n    var issues = _ref2.issues;\n\n\n    // const sampleIssue1 = Object.assign({},sampleIssue);\n    // setTimeout(()=>{this.createIssue(sampleIssue1)},2500);\n\n\n    var issueRows = issues.map(function (issue) {\n        return React.createElement(Issuerow, { key: issue.id, issue: issue });\n    });\n    return React.createElement(\n        'table',\n        { className: 'bordered-table' },\n        React.createElement(\n            'thead',\n            null,\n            React.createElement(\n                'tr',\n                null,\n                React.createElement(\n                    'th',\n                    null,\n                    'Id'\n                ),\n                React.createElement(\n                    'th',\n                    null,\n                    'Status'\n                ),\n                React.createElement(\n                    'th',\n                    null,\n                    'Owner'\n                ),\n                React.createElement(\n                    'th',\n                    null,\n                    'created'\n                ),\n                React.createElement(\n                    'th',\n                    null,\n                    'Effort'\n                ),\n                React.createElement(\n                    'th',\n                    null,\n                    'Completion Date'\n                ),\n                React.createElement(\n                    'th',\n                    null,\n                    'Title'\n                )\n            )\n        ),\n        React.createElement(\n            'tbody',\n            null,\n            issueRows\n        )\n    );\n}\n\nvar IssueAdd = function (_React$Component3) {\n    _inherits(IssueAdd, _React$Component3);\n\n    function IssueAdd() {\n        _classCallCheck(this, IssueAdd);\n\n        // setTimeout(() => {\n        //     this.props.createIssue(sampleIssue);\n        // }, 2000);\n        var _this3 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));\n\n        _this3.handleSubmit = _this3.handleSubmit.bind(_this3);\n\n        return _this3;\n    }\n\n    _createClass(IssueAdd, [{\n        key: 'handleSubmit',\n        value: function handleSubmit(e) {\n            e.preventDefault();\n            var form = document.forms.issueAdd;\n            var issue = {\n                owner: form.owner.value,\n                title: form.title.value,\n                completionDate: \"4-3-2019\"\n\n            };\n            var createIssue = this.props.createIssue;\n\n            createIssue(issue);\n            form.owner.value = '';\n            form.title.value = '';\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return React.createElement(\n                'form',\n                { name: 'issueAdd', onSubmit: this.handleSubmit },\n                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),\n                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),\n                React.createElement(\n                    'button',\n                    { type: 'submit' },\n                    'Add'\n                )\n            );\n        }\n    }]);\n\n    return IssueAdd;\n}(React.Component);\n// IssueAdd.propTypes = {\n//     createIssue : React.propTypes.func.isRequired,\n// };\n\nReactDOM.render(React.createElement(IssueList, null), contentNode); // Render the component inside the content Node\n\n//# sourceURL=webpack:///./public/app.js?");

/***/ }),

/***/ "./public/graphQLFetch.js":
/*!********************************!*\
  !*** ./public/graphQLFetch.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = async function graphQLFetch(query) {\n    var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    try {\n        var response = await fetch(window.ENV.UI_API_ENDPOINT, {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify({ query: query, variables: variables })\n        });\n        var body = await response.text();\n        var result = JSON.parse(body);\n\n        if (result.errors) {\n            var error = result.errors[0];\n            if (error.extensions.code === 'BAD_USER_INPUT') {\n                var details = error.extensions.exception.errors.join('\\n ');\n                alert(error.message + ':\\n ' + details);\n            } else {\n                alert(error.extensions.code + ': ' + error.message);\n            }\n        }\n        return result.data;\n    } catch (e) {\n        alert('Error in sending data to server: ' + e.message);\n        return null;\n    }\n};\n\n//# sourceURL=webpack:///./public/graphQLFetch.js?");

/***/ })

/******/ });