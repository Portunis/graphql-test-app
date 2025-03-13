const {  GraphQLObjectType, GraphQLString } = require("graphql");
const {GraphQLID, GraphQLList} = require("graphql/type");
const {getRepository} = require("typeorm");



const MusicType = new GraphQLObjectType({
    name: "Music",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        authorId: { type: GraphQLID },
        url: { type: GraphQLString },
        author: {
            type: require("../user/UserType").UserType,
            resolve: source => {
                console.log('🔥 Вызван resolve для music:', source.authorId);
            }
        }
    }),
});
module.exports = { MusicType };
