const {  GraphQLObjectType, GraphQLString } = require("graphql");
const {GraphQLID} = require("graphql/type");


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
            async resolve(obj, args, { db }) {
                console.log("Resolve author:", obj);
                if (!obj.authorId) return '1';
                return await db.User.findOne({ where: { id: obj.authorId } });
            }
        }
    }),
});

module.exports = { MusicType };
