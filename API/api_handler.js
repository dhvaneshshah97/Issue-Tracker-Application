const fs = require('fs');
const about = require('./about');
const issue = require('./issue');
const auth = require('./auth.js');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const GraphQLDate = require('./graphql_date');

const resolvers = {
    Query: {
        about: about.getMessage,
        issueList: issue.list,
        issue: issue.get,
        issueCounts: issue.counts,
    },
    Mutation: {
        setAboutMessage: about.setMessage,
        issueAdd: issue.add,
        issueUpdate: issue.update,
        issueDelete: issue.delete,
        issueRestore: issue.restore,
    },
    GraphQLDate

};

const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    context: getContext,
    formatError: (error) => {
        console.log(error);
        return error;
    }

});

function getContext({ req }) {
    const user = auth.getUser(req);
    return { user };
}

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') == 'true';
    console.log('CORS setting:', enableCors);
    let cors;
    if (enableCors) {
        const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
        const methods = 'POST';
        cors = { origin, methods, credentials: true };
    } else {
        cors = 'false';
    }
    server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };