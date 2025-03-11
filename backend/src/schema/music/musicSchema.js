const {MusicType} = require("../../types/music/MusicType");
const {GraphQLSchema} = require("graphql/index");
const {GraphQLObjectType} = require("graphql/type");

const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        getMusicOne: { type: MusicType },
        getMusicList: { type: MusicType },
    },
});

const musicSchema = new GraphQLSchema({
    query: QueryType,
});

module.exports = musicSchema;
