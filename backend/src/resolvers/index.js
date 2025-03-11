const authResolver = require('./auth/authResolver');
const musicResolver = require('./music/musicResolver');

const resolvers = {
    Query: {
        ...authResolver.Query,
        ...musicResolver.Query
    },
    Mutation: {
        ...authResolver.Mutation
    },
};

module.exports = resolvers;