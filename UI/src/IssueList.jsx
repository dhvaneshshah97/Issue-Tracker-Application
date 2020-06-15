/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
// import IssueAdd from './IssueAdd.jsx';
import graphQLFetch from './graphQLFetch.js'
import { Route } from 'react-router-dom';
import IssueDetail from './IssueDetail.jsx';
import { Panel, Glyphicon, Pagination, Button } from 'react-bootstrap';
import Toast from './Toast.jsx';
import { LinkContainer } from 'react-router-bootstrap';
const SECTION_SIZE = 5;

function PageLink({
    params, page, activePage, children,
}) {
    params.set('page', page);
    if (page === 0) return React.cloneElement(children, { disabled: true });
    return (
        <LinkContainer
            isActive={() => page === activePage}
            to={{ search: `?${params.toString()}` }}
        >
            {children}
        </LinkContainer>
    );
}
export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: [],
            pages: 0,
            toastVisible: false,
            toastMessage: ' ',
            toastType: 'info',
        };
        // this.createIssue = this.createIssue.bind(this);
        this.closeIssue = this.closeIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search) {
            this.loadData();
        }
    }
    async loadData() {
        // const { location: { search } } = this.props;
        const params = new URLSearchParams(this.props.location.search);
        const vars = {};
        let page = parseInt(params.get('page'), 10);
        if (params.get('status')) vars.status = params.get('status');
        if (Number.isNaN(page)) page = 1;
        vars.page = page;
        const effortMin = parseInt(params.get('effortMin'), 10);
        if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
        const effortMax = parseInt(params.get('effortMax'), 10);
        if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

        const query = `query issueList(
            $status: StatusType
            $effortMin: Int
            $effortMax: Int
            $page: Int
            ){
            issueList(
                status: $status
                effortMin: $effortMin
                effortMax: $effortMax
                page: $page 
                ){
                    issues{
                        id title status owner
                        created effort completionDate
                    }
                    pages
                 
            }
        }`;


        const data = await graphQLFetch(query, vars);
        // console.log(data.issueList);
        // console.log("Program halted above");
        if (data) {
            this.setState({
                issues: data.issueList.issues,
                pages: data.issueList.pages,
            });
        }

    }
    // async createIssue(issue) {
    //     // issue.id = this.state.issues.length + 1;
    //     // issue.created = new Date();
    //     // const newIssueList = this.state.issues.slice();
    //     // newIssueList.push(issue);
    //     // this.setState({ issues: newIssueList });
    //     const query = `mutation issueAdd($issue: IssueInputs!){
    //         issueAdd(issue:$issue) {
    //             id 
    //             }
    //             }`;
    //     const data = await graphQLFetch(query, { issue });
    //     if (data) {
    //         this.loadData();
    //     }

    // }
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
        // this.showSuccess("Issue Deleted Successfully...!")
        const undoMessage = (
            <span>
                {`Deleted issue ${id} successfully.`}
                <Button bsStyle="link" onClick={() => this.restoreIssue(id)}>
                    UNDO
            </Button>
            </span>
        );
        this.showSuccess(undoMessage);
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
    async restoreIssue(id) {
        const query = `mutation issueRestore($id: Int!) {
        issueRestore(id: $id)
        }`;
        const { showSuccess, showError } = this.props;
        const data = await graphQLFetch(query, { id }, showError);
        if (data) {
            this.showSuccess(`Issue ${id} restored successfully.`);
            this.loadData();
        }
    }
    showSuccess(message) {
        this.setState({
            toastVisible: true, toastMessage: message, toastType: 'success',
        });
    }
    showError(message) {
        this.setState({
            toastVisible: true, toastMessage: message, toastType: 'danger',
        });
    }
    dismissToast() {
        this.setState({ toastVisible: false });
    }
    render() {
        const { selectedIssue, pages } = this.state;
        const { location: { search } } = this.props;
        const params = new URLSearchParams(search);
        let page = parseInt(params.get('page'), 10);
        if (Number.isNaN(page)) page = 1;
        const startPage = Math.floor((page - 1) / SECTION_SIZE) * SECTION_SIZE + 1;
        const endPage = startPage + SECTION_SIZE - 1;
        const prevSection = startPage === 1 ? 0 : startPage - SECTION_SIZE;
        const nextSection = endPage >= pages ? 0 : startPage + SECTION_SIZE;
        const items = [];
        for (let i = startPage; i <= Math.min(endPage, pages); i += 1) {
            params.set('page', i);
            items.push((
                <PageLink key={i} params={params} activePage={page} page={i}>
                    <Pagination.Item>{i}</Pagination.Item>
                </PageLink>
            ));
        }
        const { issues } = this.state;
        const { match } = this.props
        const hasFilter = this.props.location.search !== '';
        const { toastVisible, toastType, toastMessage } = this.state;
        return (
            <React.Fragment>
                <Panel defaultExpanded={hasFilter}>
                    <Panel.Heading>
                        <Panel.Title toggle><Glyphicon glyph="filter" /> Issues Filtered By:</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <IssueFilter urlBase="/issues" />
                    </Panel.Body>
                </Panel>
                <hr />
                <IssueTable issues={issues} closeIssue={this.closeIssue} deleteIssue={this.deleteIssue} />
                {/* <IssueAdd createIssue={this.createIssue} /> */}
                <Route path={`${match.path}/:id`} component={IssueDetail} />
                <div className="text-center">
                    <Pagination>
                        <PageLink params={params} page={prevSection}>
                            <Pagination.Item>{'<'}</Pagination.Item>
                        </PageLink>
                        {items}
                        <PageLink params={params} page={nextSection}>
                            <Pagination.Item>{'>'}</Pagination.Item>
                        </PageLink>
                    </Pagination>
                </div>
                <Toast showing={toastVisible} onDismiss={this.dismissToast} bsStyle={toastType}>{toastMessage}</Toast>
            </React.Fragment>
        );

    }
}



