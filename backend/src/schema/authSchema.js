const { gql } = require("apollo-server-express");

const authSchema = gql`
    type User {
        id: ID!
        email: String!
        token: String
    }

    type Query {
        me: User
    }

    type Mutation {
        register(email: String!, password: String!): User
        login(email: String!, password: String!): User
    }
`;

module.exports = authSchema;
