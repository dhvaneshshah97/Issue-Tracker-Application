/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {  withRouter } from 'react-router-dom'
import {
    ButtonToolbar, Button, FormGroup, FormControl, ControlLabel, InputGroup, Row, Col
} from 'react-bootstrap';

// eslint-disable-next-line react/prefer-stateless-function
class IssueFilter extends React.Component {
    constructor({ location: { search } }) {
        super();
        const params = new URLSearchParams(search);
        this.state = {
            status: params.get('status') || '',
            effortMin: params.get('effortMin') || '',
            effortMax: params.get('effortMax') || '',
            changed: false,
        };
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.showOriginalFilter = this.showOriginalFilter.bind(this);
        this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
        this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
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
            effortMin: params.get('effortMin') || '',
            effortMax: params.get('effortMax') || '',
            changed: false,
        });
    }
    onChangeEffortMin(e) {
        const effortString = e.target.value;
        if (effortString.match(/^\d*$/)) {
            this.setState({ effortMin: e.target.value, changed: true });
        }
    }
    onChangeEffortMax(e) {
        const effortString = e.target.value;
        if (effortString.match(/^\d*$/)) {
            this.setState({ effortMax: e.target.value, changed: true });
        }
    }

    onChangeStatus(e) {
        this.setState({ status: e.target.value, changed: true })
    }
    applyFilter() {
        const { status, effortMin, effortMax } = this.state;
        const { history, urlBase } = this.props;

        const params = new URLSearchParams();
        if (status) params.set('status', status);
        if (effortMin) params.set('effortMin', effortMin);
        if (effortMax) params.set('effortMax', effortMax);
        const search = params.toString() ? `?${params.toString()}` : '';
        history.push({ pathname: urlBase, search });

    }
    render() {
        const { status, changed } = this.state;
        const { effortMin, effortMax } = this.state;
        return (
            <Row>
                {/* here ControlLabel works as label component, and FormControl works as select component because of componentClass property, otherwise bydefault it works as input component if componentClass property is not specified */}
                <Col xs={6} sm={4} md={3} lg={2}>
                    <FormGroup bsSize="small">
                        <ControlLabel>Status:</ControlLabel>
                        <FormControl componentClass = "select" value={status} onChange={this.onChangeStatus}>
                            <option value="">All</option>
                            <option value="New">New</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Closed">Closed</option>
                        </FormControl>
                    </FormGroup>
                </Col>
                <Col xs={6} sm={4} md={3} lg={2}>
                    <FormGroup bsSize="small">
                        <ControlLabel>Effort between:</ControlLabel>
                        <InputGroup>
                            <FormControl value={effortMin} onChange={this.onChangeEffortMin} />
                            {/* The InputGroup.Addon component can be used to display the inputs next to each other, as well as
    show the dash between the two inputs. */}
                            <InputGroup.Addon>-</InputGroup.Addon>
                            <FormControl value={effortMax} onChange={this.onChangeEffortMax} />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col xs={6} sm={4} md={3} lg={2}>
                    <FormGroup>
                        <ControlLabel>&nbsp;</ControlLabel>
                        <ButtonToolbar>
                            <Button type="button" bsStyle="primary" onClick={this.applyFilter} bsSize="small">Apply</Button>
                            <Button type="button" onClick={this.showOriginalFilter} disabled={!changed} bsSize="small">Reset</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Col>
            </Row>
        );
    };
};

export default withRouter(IssueFilter);