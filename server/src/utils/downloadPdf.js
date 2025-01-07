const axios = require('axios');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

/**
 * @param {string} id - The user ID for which the PDF file will be downloaded.
 * @returns {Promise<string|null|undefined>} - The file path of the downloaded PDF if successful, `null` if the user or CV file is not found, and `undefined` if an error occurs.
 */
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