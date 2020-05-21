const fs = require('fs');
const about = require('./about');
const issue = require('./issue');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const resolvers = {
    Query: {
        about: about.getMessage,
        issueList: issue.list,
        issue: issue.get,
    },
    Mutation: {
        setAboutMessage: about.setMessage,
        issueAdd: issue.add,
        issueUpdate: issue.update,
        issueDelete: issue.delete,
    },

};

const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: (error) => {
        console.log(error);
        return error;
    }

});

function installHandler(app) {
    server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { installHandler };