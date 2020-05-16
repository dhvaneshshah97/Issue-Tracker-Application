/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { Link, withRouter } from 'react-router-dom'


// eslint-disable-next-line react/prefer-stateless-function
class IssueFilter extends React.Component {
    constructor({ location: { search } }) {
        super();
        const params = new URLSearchParams(search);
        this.state = {
            status: params.get('status') || '',
            changed: false,
        };
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.showOriginalFilter = this.showOriginalFilter.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search) {
            this.showOriginalFilter();
        }
    }
    showOriginalFilter() {
        const { location: { search } } = this.props;
        const params = new URLSearchParams(search);
        this.setState({
            status: params.get('status') || '',
            changed: false,
        });
    }

    onChangeStatus(e) {
        this.setState({ status: e.target.value, changed: true })
    }
    applyFilter() {
        const { status } = this.state;
        this.props.history.push({
            pathname: '/issues',
            search: status ? `?status=${status}` : '',
        });
    }
    render() {
        const { status, changed } = this.state;
        return (
            <div>
                Status:
                {' '}
                <select value={status} onChange={this.onChangeStatus}>
                    <option value="">All</option>
                    <option value="New">New</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Closed">Closed</option>
                </select>
                {' '}
                <button type="button" onClick={this.applyFilter}>Apply</button>
                {' '}
                <button type="button" onClick={this.showOriginalFilter} disabled={!changed}>Reset</button>
            </div>
        );
    };
};

export default withRouter(IssueFilter);