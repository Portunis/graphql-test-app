const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");


const UserType = new GraphQLObjectType({
    name: "User",
    description: "Данные информации о пользователе",
    fields: () => ({
        id: { type: GraphQLInt },
        email: { type: GraphQLString },
    }),
});

module.exports = { UserType };
