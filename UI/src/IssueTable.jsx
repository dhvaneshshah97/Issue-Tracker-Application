/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { Button, Glyphicon, Tooltip, OverlayTrigger, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserContext from './UserContext';

class IssueRowPlain extends React.Component {
    render() {
        const {
            issue, location: { search }, closeIssue, deleteIssue, index,
        } = this.props;
        const user = this.context;
        const disabled = !user.signedIn;
        const selectLocation = { pathname: `/issues/${issue.id}`, search };
        const editTooltip = (
            <Tooltip id="edit-tooltip" placement="top">Edit Issue</Tooltip>
        );
        const closeTooltip = (
            <Tooltip id="close-tooltip" placement="top">Close Issue</Tooltip>
        );
        const deleteTooltip = (
            <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
        );
        function onClose(e) {
            e.preventDefault();
            closeIssue(index);
        }
        function onDelete(e) {
            e.preventDefault();
            deleteIssue(index);
        }
        const tableRow = (<tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate ? issue.completionDate.toDateString() : ' '}</td>
            <td>{issue.title}</td>
            <td>
                <LinkContainer to={`/edit/${issue.id}`}>
                    <OverlayTrigger delayShow={300} overlay={editTooltip}>
                        <Button bsSize="xsmall">
                            <Glyphicon glyph="edit" />
                        </Button>
                    </OverlayTrigger>
                </LinkContainer>
                {' | '}
                <OverlayTrigger delayShow={300} overlay={closeTooltip}>
                    <Button bsSize="xsmall" type="button" onClick={onClose} disabled={disabled}><Glyphicon glyph="remove" /></Button>
                </OverlayTrigger>
                {'  '}
                <OverlayTrigger delayShow={300} overlay={deleteTooltip}>
                    <Button bsSize="xsmall" type="button" onClick={onDelete} disabled={disabled}><Glyphicon glyph="trash" /></Button>
                </OverlayTrigger>

            </td>
        </tr>)
        return (
            <LinkContainer to={selectLocation}>
                {tableRow}
            </LinkContainer>
        );
    }
}

IssueRowPlain.contextType = UserContext;
const IssueRow = withRouter(IssueRowPlain);
delete IssueRow.contextType;


export default function IssueTable({ issues, closeIssue, deleteIssue }) {

    // const sampleIssue1 = Object.assign({},sampleIssue);
    // setTimeout(()=>{this.createIssue(sampleIssue1)},2500);

    const issueRows = issues.map((issue, index) => <IssueRow key={issue.id} issue={issue} closeIssue={closeIssue} index={index} deleteIssue={deleteIssue} />);
    return (
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </Table>
    );
}
