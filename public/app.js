'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const initialIssues = [
//     {
//         id: 1, status: 'open', owner: 'Dhvanesh', created: new Date('2016-08-15'), effort: 5,
//         completionDate: undefined, title: 'Error in console when clicking Add',
//     },
//     {
//         id: 2, status: 'assigned', owner: 'Dharmik', created: new Date('2016-08-16'), effort: 14,
//         completionDate: new Date('2016-08-30'), title: 'Missing bottom border on panel',
//     },
// ];


var contentNode = document.getElementById('contents');
var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

var IssueList = function (_React$Component) {
    _inherits(IssueList, _React$Component);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this.state = { issues: [] };
        _this.createIssue = _this.createIssue.bind(_this);
        return _this;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: async function loadData() {
            // setTimeout(() => { this.setState({ issues: initialIssues }) }, 500);
            var query = '\n        query{\n            issueList{\n                id title status owner\n                created effort completionDate \n            }\n        }';

            var response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query })
            });

            // const result = await response.json();
            var body = await response.text();
            var result = JSON.parse(body, jsonDateReviver);
            this.setState({ issues: result.data.issueList });
        }
    }, {
        key: 'createIssue',
        value: function createIssue(issue) {
            issue.id = this.state.issues.length + 1;
            issue.created = new Date();
            var newIssueList = this.state.issues.slice();
            newIssueList.push(issue);
            this.setState({ issues: newIssueList });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Issue Tracker'
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: this.state.issues }),
                React.createElement('hr', null),
                React.createElement(IssueAdd, { createIssue: this.createIssue }),
                React.createElement('hr', null)
            );
        }
    }]);

    return IssueList;
}(React.Component);

var IssueFilter = function (_React$Component2) {
    _inherits(IssueFilter, _React$Component2);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a placeholder for the issue filter'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

function Issuerow(props) {
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            props.issue.id
        ),
        React.createElement(
            'td',
            null,
            props.issue.status
        ),
        React.createElement(
            'td',
            null,
            props.issue.owner
        ),
        React.createElement(
            'td',
            null,
            props.issue.created.toDateString()
        ),
        React.createElement(
            'td',
            null,
            props.issue.effort
        ),
        React.createElement(
            'td',
            null,
            props.issue.completionDate ? props.issue.completionDate.toDateString() : 'Not Provided'
        ),
        React.createElement(
            'td',
            null,
            props.issue.title
        )
    );
}

// Issuerow.propTypes = {
//     issue_id: React.PropTypes.number.isRequired,
//     issue_title: React.PropTypes.string
//     };
// Issuerow.defaultProps = {
//     issue_title:'--no title--'
// // };
// Issuerow.defaultProps = {
//     effort: 0              //doubt

// };
function IssueTable(props) {

    // const sampleIssue1 = Object.assign({},sampleIssue);
    // setTimeout(()=>{this.createIssue(sampleIssue1)},2500);


    var issueRows = props.issues.map(function (issue) {
        return React.createElement(Issuerow, { key: issue.id, issue: issue });
    });
    return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Id'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                React.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issueRows
        )
    );
}

var IssueAdd = function (_React$Component3) {
    _inherits(IssueAdd, _React$Component3);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        // setTimeout(() => {
        //     this.props.createIssue(sampleIssue);
        // }, 2000);
        var _this3 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this3.handleSubmit = _this3.handleSubmit.bind(_this3);

        return _this3;
    }

    _createClass(IssueAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.issueAdd;
            var issue = { owner: form.owner.value, title: form.title.value, status: 'New' };
            this.props.createIssue(issue);
            form.owner.value = "";form.title.value = "";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { name: 'issueAdd', onSubmit: this.handleSubmit },
                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                React.createElement(
                    'button',
                    null,
                    'Add'
                )
            );
        }
    }]);

    return IssueAdd;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode); // Render the component inside the content Node