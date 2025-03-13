const { getRepository } = require('typeorm');
const Music = require('../../entities/Music');

const uploadAudio = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const musicRepo = getRepository(Music);

        console.log('req', req);
        const music = {
            title: req.body.title,
            url:`/uploads/${req.file.filename}`,
            description: req.body.description,
            authorId:req.body.authorId
        }


        await musicRepo.save(music);

        return res.status(200).json({
            id: musicRepo.id,
            title: musicRepo.title,
            url: musicRepo.url,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Error uploading file' });
    }
};

module.exports = uploadAudio;