const fs = require('fs/promises');
const pdf = require('pdf-parse');


const cvData = async(filePath) => {
    const fileContent = await fs.readFile(filePath)
    const parsedData = await pdf(fileContent)
    if (!parsedData.text) {
        return null
    }
    return parsedData.text
}

module.exports = cvData