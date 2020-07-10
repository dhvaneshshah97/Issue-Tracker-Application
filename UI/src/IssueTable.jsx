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
            <Tooltip id="edit-tooltip" >Edit Issue</Tooltip>
        );
        const closeTooltip = (
            <Tooltip id="close-tooltip" >Close Issue</Tooltip>
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
                    <OverlayTrigger delayShow={300} overlay={editTooltip} key="left" placement="left">
                        <Button bsSize="xsmall">
                            <Glyphicon glyph="edit" />
                        </Button>
                    </OverlayTrigger>
                </LinkContainer>
                {' | '}
                {user.signedIn ? (<OverlayTrigger delayShow={300} overlay={closeTooltip} key="top" placement="top">
                    <Button bsSize="xsmall" type="button" onClick={onClose} disabled={disabled}><Glyphicon glyph="remove" /></Button>
                </OverlayTrigger>) : (
                        <OverlayTrigger overlay={<Tooltip id="msg-tooltip" >Signin required!</Tooltip>} key="top" placement="top">
                            <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
                                <Button bsSize="xsmall" disabled={true} type="button" style={{ pointerEvents: 'none' }}><Glyphicon glyph="remove" /></Button>
                            </div>
                        </OverlayTrigger>
                    )}

                {'  '}
                {user.signedIn ? (<OverlayTrigger delayShow={300} overlay={deleteTooltip}>
                    <Button bsSize="xsmall" type="button" onClick={onDelete} disabled={disabled}><Glyphicon glyph="trash" /></Button>
                </OverlayTrigger>) : (
                        <OverlayTrigger overlay={<Tooltip id="msg-tooltip" >Signin required!</Tooltip>} key="right" placement="right">
                            <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
                                <Button bsSize="xsmall" disabled={true} type="button" style={{ pointerEvents: 'none' }}><Glyphicon glyph="trash" /></Button>
                            </div>
                        </OverlayTrigger>
                    )}

                {/* <OverlayTrigger delayShow={300} overlay={deleteTooltip}>
                    <Button bsSize="xsmall" type="button" onClick={onDelete} disabled={disabled}><Glyphicon glyph="trash" /></Button>
                </OverlayTrigger> */}

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
