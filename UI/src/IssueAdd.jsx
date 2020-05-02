/* eslint linebreak-style: ["error", "windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM PropTypes*/
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */




export default class IssueAdd extends React.Component {
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
            owner: form.owner.value,
            title: form.title.value,
            completionDate: "4-3-2019",

        }
        const { createIssue } = this.props;
        createIssue(issue);
        form.owner.value = '';
        form.title.value = '';


    }

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button type="submit">Add</button>
            </form>

        )
    }
}