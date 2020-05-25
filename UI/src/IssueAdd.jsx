/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';

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
            status: form.status.value,
            completionDate:  new Date(new Date().getTime() + 1000*60*60*24*10),

        }
        const { createIssue } = this.props;
        createIssue(issue);
        form.owner.value = '';
        form.title.value = '';
        form.status.value = '';
    }

    render() {
        // console.log("hello");
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" /><br/>
                <input type="text" name="title" placeholder="Title" /><br/>
                <input type="text" name="status" placeholder="Status" /><br/>
                <button type="submit">Add</button>
            </form>

        )
    }
}

IssueAdd.propTypes = {
    createIssue : PropTypes.func.isRequired,
}