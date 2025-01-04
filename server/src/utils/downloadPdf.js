const axios = require('axios')
const fs = require('fs')
const cloudinary = require('../config/cloudinary');

const downloadPdf = async(publicId) => {
    try {
        const filePath = `../PDF/${publicId}`
        const fileUrl = cloudinary.url(publicId, { resource_type: 'raw' });
        const response = await axios.get(fileUrl, { responseType: 'stream' });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, rejects) => {
            writer.on('finish', resolve);
            writer.on('error', rejects);
        })
        return filePath
    } catch (err) {
        return null
    }
};

module.exports = downloadPdf;