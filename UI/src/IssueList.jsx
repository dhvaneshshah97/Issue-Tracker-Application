/* globals React */
/* eslint "react/jsx-no-undef": "off" */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM PropTypes*/
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import graphQLFetch from './graphQLFetch.js'

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }


    async loadData() {
        // setTimeout(() => { this.setState({ issues: initialIssues }) }, 500);
        const query = `
        query{
            issueList{
                id title status owner
                created effort completionDate 
            }
        }`;

        const data = await graphQLFetch(query);
        // console.log(data.issueList);
        // console.log("Program halted above");
        if (data) {
            this.setState({ issues: data.issueList });
        }

    }
    async createIssue(issue) {
        // issue.id = this.state.issues.length + 1;
        // issue.created = new Date();
        // const newIssueList = this.state.issues.slice();
        // newIssueList.push(issue);
        // this.setState({ issues: newIssueList });
        const query = `mutation issueAdd($issue: IssueInputs!){
            issueAdd(issue:$issue) {
                id 
                }
                }`;
        const data = await graphQLFetch(query, { issue });
        if (data) {
            this.loadData();
        }

    }

    render() {
        const { issues } = this.state;
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <hr />
            </div>
        );

    }
}



