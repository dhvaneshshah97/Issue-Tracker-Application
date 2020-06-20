import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import IssueFilter from './IssueFilter.jsx';
import graphQLFetch from './graphQLFetch.js';

class IssueReport extends Component {
    constructor(props) {
        super(props);
        this.state = { stats: [] };
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
        console.log("load")
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
        ) {
        issueCounts(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
        ) {
        owner New Assigned Fixed Closed 
        }
        }`;
        const data = await graphQLFetch(query, vars);
        if (data) {
            this.setState({ stats: data.issueCounts });
        }
    }

    render() {
        const { stats } = this.state;
        console.log(stats);
        const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];
        const headerColumns = (
            statuses.map(status => (
                <th key={status}>{status}</th>
            ))
        );
        const statRows = stats.map(counts => (
            <tr key={counts.owner}>
                <td>{counts.owner}</td>
                {statuses.map(status => (
                    <td key={status}>{counts[status]}</td>
                ))}
            </tr>
        ));
        return (
            <>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Filter</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <IssueFilter urlBase="/report" />
                    </Panel.Body>
                </Panel>
                <Table bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th />
                            {headerColumns}
                        </tr>
                    </thead>
                    <tbody>
                        {statRows}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default IssueReport;