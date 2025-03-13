
const { getRepository } = require("typeorm");

const Music = require("../../entities/Music");

const musicResolver = {
    Query: {
        getMusicOne: async (parent, {id, authorId}) => {
            console.log('music',id);
            if (!id) throw new Error("Ничего не пришло");


            const foundTrack = await getRepository(Music).findOne({ where: { id: id, authorId: authorId } });

            if (!foundTrack) throw new Error("Трек не найден");

            return foundTrack;
        },
        getMusicList: async (_, __, { user }) => {
            if (!user) throw new Error('Ничего не найдено');


            const musicRepository = getRepository(Music);
            const foundTrackList = await musicRepository.find();



            if (!foundTrackList.length) throw new Error('Ничего не найдено');

            return foundTrackList;
        }

    },

    Mutation: {

    },
};

module.exports = musicResolver;
