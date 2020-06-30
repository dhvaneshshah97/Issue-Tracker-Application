import React from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Panel, Form, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Toast from './Toast.jsx';
import UserContext from './UserContext.js';

export default class IssueEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            issue: {},
            toastVisible: false,
            toastMessage: ' ',
            toastType: 'success',
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (id !== prevId) {
            this.loadData();
        }
    }
    onChange(event, naturalValue) {
        const { name, value: textValue } = event.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState(prevState => ({
            issue: { ...prevState.issue, [name]: value },
        }));
    }
    async handleSubmit(e) {
        e.preventDefault();
        const { issue } = this.state;
        // console.log(issue); // eslint-disable-line no-console
        const query = `mutation issueUpdate(
            $id: Int!
            $changes: IssueUpdateInputs!
            ) {
                issueUpdate(
                    id: $id
                    changes: $changes
                ){
                    id title status owner
                    effort created completionDate description
                }
            }`;
        const { id, created, ...changes } = issue;
        const data = await graphQLFetch(query, { changes, id });
        if (data) {
            this.setState({ issue: data.issueUpdate });
            this.showSuccess('Issue Updated Successfully...!'); // eslint-disable-line no-alert
        }
    }
    async loadData() {
        const query = `query issue($id: Int!) {
            issue(id: $id) {
            id title status owner
            effort created completionDate description
            }
        }`;
        const id = parseInt(this.props.match.params.id);
        const data = await graphQLFetch(query, { id });
        if (data) {
            const { issue } = data;
            issue.completionDate = issue.completionDate ? issue.completionDate.toDateString() : '';
            // issue.effort = issue.effort != null ? issue.effort.toString() : '';
            issue.owner = issue.owner != null ? issue.owner : '';
            issue.description = issue.description != null ? issue.description : '';
            this.setState({ issue });
        } else {
            this.setState({ issue: {} });
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
        const { toastVisible, toastMessage, toastType } = this.state;
        const { issue: { id } } = this.state;
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
            if (propsId != null) {
                return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
            }
            return null;
        }
        const { issue: { title, status } } = this.state;
        const { issue: { owner, effort, description } } = this.state;
        const { issue: { created, completionDate } } = this.state;
        const user = this.context;

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>{`Editing issue: ${id}`}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Created</Col>
                            <Col sm={9}>
                                <FormControl.Static>
                                    {created.toDateString()}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Status</Col>
                            <Col sm={9}>
                                <FormControl componentClass="select" name="status" value={status} onChange={this.onChange}>
                                    <option value="New">New</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="Fixed">Fixed</option>
                                    <option value="Closed">Closed</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Owner</Col>
                            <Col sm={9}>
                                <FormControl name="owner" value={owner} onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Effort</Col>
                            <Col sm={9}>
                                <FormControl componentClass={NumInput} name="effort" value={effort} onChange={this.onChange} key={id} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Completion Date</Col>
                            <Col sm={9}>
                                <FormControl name="completionDate" value={completionDate} onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Title</Col>
                            <Col sm={9}>
                                <FormControl size={50} name="title" value={title} onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Description</Col>
                            <Col sm={9}>
                                <FormControl tag="textarea" rows={8} cols={50} name="description" value={description} onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={6}>
                                <ButtonToolbar>
                                    <Button disabled={!user.signedIn} bsStyle="primary" type="submit">Submit</Button>
                                    <LinkContainer to="/issues">
                                        <Button bsStyle="link">Back</Button>
                                    </LinkContainer>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
                <Panel.Footer>
                    <Link to={`/edit/${id - 1}`}>Prev</Link>
                    {' | '}
                    <Link to={`/edit/${id + 1}`}>Next</Link>
                </Panel.Footer>
                <Toast showing={toastVisible} onDismiss={this.dismissToast} bsStyle={toastType}> {toastMessage} </Toast>
            </Panel>
        );
    }
}

IssueEdit.contextType = UserContext;