/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import graphQLFetch from './graphQLFetch.js'
import { Route } from 'react-router-dom';
import IssueDetail from './IssueDetail.jsx';

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
        this.closeIssue = this.closeIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search.prevSearch !== this.props.location.search) {
            this.loadData();
        }
    }

    async loadData() {
        // const { location: { search } } = this.props;
        const params = new URLSearchParams(this.props.location.search);
        const vars = {};
        if (params.get('status')) vars.status = params.get('status');

        const effortMin = parseInt(params.get('effortMin'), 10);
        if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
        const effortMax = parseInt(params.get('effortMax'), 10);
        if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

        const query = `query issueList(
            $status: StatusType
            $effortMin: Int
            $effortMax: Int
            ){
            issueList(
                status: $status
                effortMin: $effortMin
                effortMax: $effortMax 
                ){
                id title status owner
                created effort completionDate 
            }
        }`;


        const data = await graphQLFetch(query, vars);
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
    async closeIssue(index) {
        const query = `mutation issueClose($id: Int!) {
        issueUpdate(id: $id, changes: { status: Closed }) {
        id title status owner
        effort created completionDate description
        }
        }`;
        const { issues } = this.state;
        const data = await graphQLFetch(query, { id: issues[index].id });
        if (data) {
            this.setState((prevState) => {
                const newList = [...prevState.issues];
                newList[index] = data.issueUpdate;
                return { issues: newList };
            });
        } else {
            this.loadData();
        }
    }
    async deleteIssue(index) {
        const query = `mutation issueDelete($id: Int!) {
        issueDelete(id: $id)
        }`;
        const { issues } = this.state;
        const { location: { pathname, search }, history } = this.props;
        const { id } = issues[index];
        const data = await graphQLFetch(query, { id });
        alert("Issue Deleted Successfully...!")
        if (data && data.issueDelete) {
            this.setState((prevState) => {
                const newList = [...prevState.issues];
                if (pathname === `/issues/${id}`) {
                    history.push({ pathname: '/issues', search });
                }
                newList.splice(index, 1);
                return { issues: newList };
            });
        } else {
            this.loadData();
        }
    }

    render() {
        const { issues } = this.state;
        const { match } = this.props
        return (
            <React.Fragment>
                <IssueFilter />
                <hr />
                <IssueTable issues={issues} closeIssue={this.closeIssue} deleteIssue={this.deleteIssue} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <hr />
                <Route path={`${match.path}/:id`} component={IssueDetail} />
            </React.Fragment>
        );

    }
}



