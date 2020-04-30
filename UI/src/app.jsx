const contentNode = document.getElementById('contents');
// const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');


async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch(window.ENV.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body);

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code == 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

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

        const data = await graphQLFetch(query);
        // console.log(data.issueList);
        // console.log("Program halted above");
        if (data) {
            this.setState({ issues: data.issueList });
        }

    }
    async createIssue(issue) {
        // issue.id = this.state.issues.length + 1;
        // issue.created = new Date();
        // const newIssueList = this.state.issues.slice();
        // newIssueList.push(issue);
        // this.setState({ issues: newIssueList });
        const query = `mutation issueAdd($issue: IssueInputs!){
            issueAdd(issue:$issue) {
                id 
                }
                }`;
        const data = await graphQLFetch(query, { issue });
        if (data) {
            this.loadData();
        }

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
// function jsonDateReviver(key, value) {
//     if (dateRegex.test(value)) return new Date(value);
//     return value;
// }

function Issuerow(props) {
    return (
        <tr>
            <td>{props.issue.id}</td>
            <td>{props.issue.status}</td>
            <td>{props.issue.owner}</td>
            <td>{props.issue.created}</td>
            <td>{props.issue.effort}</td>
            <td>{props.issue.completionDate}</td>
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
        const issue = {
            owner: form.owner.value, title: form.title.value,
            completionDate: "4-3-2019",

        }
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