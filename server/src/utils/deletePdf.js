const fs = require('fs/promises')

/**
 * @param {string} filePath - The path to the PDF file to be deleted.
 * @returns {Promise<boolean>} - `true` if the file was deleted successfully, `false` otherwise.
 */
const deletePdf = async(filePath) => {
    try {
        await fs.unlink(filePath)
        return true
    } catch {
        return false
    }
}

module.exports = deletePdf;