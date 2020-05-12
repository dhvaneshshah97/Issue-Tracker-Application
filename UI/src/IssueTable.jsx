/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';

// function Issuerow({ issue }) {
const Issuerow = withRouter(({ issue, location: { search } }) => {
    const selectLocation = { pathname: `/issues/${issue.id}`, search };
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate}</td>
            <td>{issue.title}</td>
            {/* <td><Link to={ `/edit/${issue.id}` }>Edit</Link></td> */}
            <td>
                <Link to={`/edit/${issue.id}`}>Edit</Link>
                {' | '}
                <NavLink to={selectLocation}>Select</NavLink>
            </td>
        </tr>
    );
});



export default function IssueTable({ issues }) {

    // const sampleIssue1 = Object.assign({},sampleIssue);
    // setTimeout(()=>{this.createIssue(sampleIssue1)},2500);



    const issueRows = issues.map(issue => <Issuerow key={issue.id} issue={issue} />);
    return (
        <table className="bordered-table">
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
        </table>
    );
}
