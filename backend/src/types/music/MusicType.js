const {  GraphQLObjectType, GraphQLString } = require("graphql");
const {GraphQLID} = require("graphql/type");

const MusicType = new GraphQLObjectType({
    name: "Music",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        authorId: { type: GraphQLID },
    },
});

module.exports = { MusicType };
