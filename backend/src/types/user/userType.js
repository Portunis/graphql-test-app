const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");
const { MusicType } = require("../music/MusicType");


const UserType = new GraphQLObjectType({
    name: "User",
    description: "Данные информации о пользователе",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        music: {
            args: { limit: { type: GraphQLInt, defaultValue: 5 } },
            type: new GraphQLList(MusicType),
            resolve: (source, args, context) => {
                const { limit } = args;


                console.log('Resolving music for user with id:', source.id);
                console.log('Arguments:', args);
                console.log('Context:', context);

                const currentAuthorId = source.id;

                if (!currentAuthorId) {
                    console.log('No currentAuthorId found, returning null');
                    return null;
                }

                const MusicModel = context.db.Music;

                console.log('Querying database for music by authorId:', currentAuthorId);

                return MusicModel.find({ authorId: currentAuthorId })
                    .limit(limit)
                    .then(result => {
                        console.log('Found music:', result);
                        return result;
                    })
                    .catch(err => {
                        console.error('Error while querying music:', err);
                        throw new Error("Error fetching music");
                    });
            },
        },
    }),
});

module.exports = { UserType };
