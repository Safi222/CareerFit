const fs = require('fs/promises');
const pdf = require('pdf-parse');


const cvData = async() => {
    const fileContent = await fs.readFile('path')
    const parsedData = await pdf(fileContent)
    return parsedData.text
}

module.exports = cvData