const fs = require('fs/promises')

const deletePdf = async(filePath) => {
    try {
        await fs.unlink(filePath)
        return true
    } catch {
        return false
    }
}

module.exports = deletePdf;