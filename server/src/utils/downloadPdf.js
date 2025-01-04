const axios = require('axios');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const downloadPdf = async(id) => {
    try {
        const user = await User.findById(id);
        if (!user || !user.cvFile) {
            return null;
        }

        const fileUrl = user.cvFile;
        const filePath = path.resolve(__dirname, '../PDF', `${id}.pdf`);

        const response = await axios.get(fileUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`File downloaded successfully to: ${filePath}`);
        return filePath;
    } catch (err) {
        return undefined
    }
};

module.exports = downloadPdf;