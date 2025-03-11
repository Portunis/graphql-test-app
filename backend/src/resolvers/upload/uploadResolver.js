const { getRepository } = require('typeorm');
const Music  = require('../../entities/Music');

const uploadAudio = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('файл загрузил',req.body);
        const musicRepo = getRepository(Music);
        const newMusic = musicRepo.create({
            title: req.body.title,
            url: `/uploads/${req.file.filename}`,
            authorId: req.body.authorId,
            description: req.body.description,
        })

        await musicRepo.save(newMusic);

        return res.status(200).json({
            id: newMusic.id,
            title: newMusic.title,
            url: newMusic.url,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Error uploading file' });
    }
};

module.exports = uploadAudio;
