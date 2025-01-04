const axios = require('axios')
const fs = require('fs')
const User = require('../models/User')
const downloadPdf = async(id) => {
    try {
        const user = await User.findById(id)
        if (!user.cvFile) {
            return null
        }
        const fileUrl = user.cvFile;
        const filePath = `../PDF/${id}.pdf`
        const response = await axios.get(fileUrl, { responseType: 'stream' });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        })
        return filePath
    } catch (err) {
        return err
    }
};

module.exports = downloadPdf;