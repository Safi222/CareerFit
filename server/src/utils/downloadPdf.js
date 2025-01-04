const axios = require('axios')
const fs = require('fs')
const cloudinary = require('../config/cloudinary');

const downloadPdf = async(publicId) => {
    try {
        const fileUrl = cloudinary.url(publicId, { resource_type: 'raw' });
        const response = await axios.get(fileUrl, { responseType: 'stream' });

        const writer = fs.createWriteStream(`../PDF/${publicId}`);
        response.data.pipe(writer);

        await new Promise((resolve, rejects) => {
            writer.on('finish', resolve);
            writer.on('error', rejects);
        })
        return true
    } catch (err) {
        return false
    }
};

module.exports = downloadPdf;