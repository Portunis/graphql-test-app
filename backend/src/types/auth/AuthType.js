const { GraphQLObjectType, GraphQLString } = require("graphql");

const AuthType = new GraphQLObjectType({
    name: "Auth",
    description: "Передаваемые данные для регистрации/авторизации",
    fields: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
});

module.exports = { AuthType };
