const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { UserType } = require("../../types/user/userType");
const { AuthType } = require("../../types/auth/AuthType");
const {GraphQLNonNull, GraphQLString} = require("graphql/type");

const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: { type: UserType },
    },
});

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        login: {
            type: AuthType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
        },
        register: {
            type: AuthType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
        },
    },
});

const authSchema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});

module.exports = authSchema;
