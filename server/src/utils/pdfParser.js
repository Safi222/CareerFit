const fs = require('fs/promises');
const pdf = require('pdf-parse');


/**
 * @param {string} filePath - The path of the file to be parsed.
 * @returns {Promise<string|null>} - The extracted text from the PDF file or null if no text is found.
 */
const cvData = async(filePath) => {
    const fileContent = await fs.readFile(filePath)
    const parsedData = await pdf(fileContent)
    if (!parsedData.text) {
        return null
    }
    return parsedData.text
}

module.exports = cvData