/* eslint linebreak-style: ["error", "windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM PropTypes*/
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */



function Issuerow({ issue }) {
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate}</td>
            <td>{issue.title}</td>
        </tr>
    );
} 


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
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    );
}
