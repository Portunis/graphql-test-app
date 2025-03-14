const {MusicType} = require("../../types/music/MusicType");
const {GraphQLSchema} = require("graphql/index");
const {GraphQLObjectType, GraphQLList} = require("graphql/type");

const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        getMusicOne: {type: MusicType},
        getMusicList: {type: new GraphQLList(MusicType)}
    }),
});

const musicSchema = new GraphQLSchema({
    query: QueryType,
});

module.exports = musicSchema;
