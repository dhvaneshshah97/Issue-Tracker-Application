// const initialIssues = [
//     {
//         id: 1, status: 'open', owner: 'Dhvanesh', created: new Date('2016-08-15'), effort: 5,
//         completionDate: undefined, title: 'Error in console when clicking Add',
//     },
//     {
//         id: 2, status: 'assigned', owner: 'Dharmik', created: new Date('2016-08-16'), effort: 14,
//         completionDate: new Date('2016-08-30'), title: 'Missing bottom border on panel',
//     },
// ];




const contentNode = document.getElementById('contents');
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        // setTimeout(() => { this.setState({ issues: initialIssues }) }, 500);
        const query = `
        query{
            issueList{
                id title status owner
                created effort completionDate 
            }
        }`;

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        // const result = await response.json();
        const body = await response.text()
        const result = JSON.parse(body, jsonDateReviver);
        this.setState({ issues: result.data.issueList });
    }
    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({ issues: newIssueList });

    }

    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <hr />
            </div>
        );

    }
}


class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter</div>
        );
    }
}
function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
    }

function Issuerow(props) {
    return (
        <tr>
            <td>{props.issue.id}</td>
            <td>{props.issue.status}</td>
            <td>{props.issue.owner}</td>
            <td>{props.issue.created.toDateString()}</td>
            <td>{props.issue.effort}</td>
            <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : 'Not Provided'}</td>
            <td>{props.issue.title}</td>
        </tr>
    );
}



// Issuerow.propTypes = {
//     issue_id: React.PropTypes.number.isRequired,
//     issue_title: React.PropTypes.string
//     };
// Issuerow.defaultProps = {
//     issue_title:'--no title--'
// // };
// Issuerow.defaultProps = {
//     effort: 0              //doubt

// };
function IssueTable(props) {

    // const sampleIssue1 = Object.assign({},sampleIssue);
    // setTimeout(()=>{this.createIssue(sampleIssue1)},2500);



    const issueRows = props.issues.map(issue => <Issuerow key={issue.id} issue={issue} />);
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

class IssueAdd extends React.Component {
    constructor() {
        super();
        // setTimeout(() => {
        //     this.props.createIssue(sampleIssue);
        // }, 2000);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = { owner: form.owner.value, title: form.title.value, status: 'New', }
        this.props.createIssue(issue);
        form.owner.value = ""; form.title.value = "";


    }

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>

        )
    }
}

ReactDOM.render(<IssueList />, contentNode); // Render the component inside the content Node