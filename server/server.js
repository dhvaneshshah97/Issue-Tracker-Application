const fs = require('fs');
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const {GraphQLScalarType} = require('graphql');

const GraphQLDate = new GraphQLScalarType({
    name : 'GraphQLDate',
    description : 'A Date() type in GraphQL as a scalar',
    serialize(value){
        return value.toISOString();
    },
});

let aboutMessage = "Issue Tracker API v1.0";
const issuesDB = [
    {
        id: 1, status: 'open', owner: 'Dhvanesh', created: new Date('2016-08-15'), effort: 5,
        completionDate: undefined, title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'assigned', owner: 'Dharmik', created: new Date('2016-08-16'), effort: 14,
        completionDate: new Date('2016-08-30'), title: 'Missing bottom border on panel',
    },
];

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
    },
    GraphQLDate,
};
function issueList(){
    return issuesDB;
}
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});
const app = express();
fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);
server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
    console.log('App started on port 3000');
})