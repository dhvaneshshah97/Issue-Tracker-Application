const fs = require('fs');
const express = require("express");
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url =  process.env.DB_URL || 'mongodb://localhost/issuetracker';
const port = process.env.API_SERVER_PORT || 3000;

let db;

let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
        issueAdd,
    },

};
async function connectToDb() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB at", url);
    db = client.db();
    // const c = await db.collection('issues').find({}).toArray();
    // console.log(c);
}

async function getNextSequence(name) {
    const result = await db.collection('counters').findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnOriginal: false },
    );
    return result.value.current;
}
async function issueList() {
    // return issuesDB;
    const issues = await db.collection('issues').find({}).toArray();
    return issues;
}


function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}
function validateIssue(issue) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.')
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned"');
    }
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }

}
async function issueAdd(_, { issue }) {
    validateIssue(issue);
    // issue.id = issuesDB.length + 1;
    issue.created = new Date();
    issue.id = await getNextSequence('issues');
    const result = await db.collection('issues').insertOne(issue);
    const savedIssue = await db.collection('issues').findOne({_id:result.insertedId});
    return savedIssue;

    // if (issue.status == undefined) issue.status = "New";
    // issuesDB.push(issue);
    // return issue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }

});
const app = express();
// fileServerMiddleware = express.static('public');
// app.use('/', fileServerMiddleware);
server.applyMiddleware({ app, path: '/graphql' });

(async function () {
    try {
        await connectToDb();
        app.listen(port, function () {
            console.log(`API server started on port ${port}`);
        });
    }
    catch (err) {
        console.log('ERROR:', err);
    }
})();
