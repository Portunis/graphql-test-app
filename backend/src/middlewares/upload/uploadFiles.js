const upload = require('../../config/multerConfig');

const uploadAudioFile = upload.single('audio');

module.exports = uploadAudioFile;
