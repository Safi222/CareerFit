const downloadPdf = require('../utils/downloadPdf')
const deletePdf = require('../utils/deletePdf')
const chatBot = require('../utils/chatbot')
const pdfParser = require('../utils/pdfParser')


const recommendedTitles = async(req, res) => {
    try {
        const id = req.user.id;
        const filePath = await downloadPdf(id)
        if (!filePath) {
            if (filePath === null)
                return res.status(404).json({
                    status: "fail",
                    "data": {
                        title: "cv not found"
                    }
                })
            else {
                return res.status(404).json({
                    status: "fail",
                    "data": {
                        title: "error while preparing your cv"
                    }
                })
            }
        }
        const content = await pdfParser(filePath)
        deletePdf(filePath)
        const recommendation = await chatBot(content)
        return res.status(200).json({
            status: "success",
            "data": { recommendation }
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            data: {
                title: "internal server error"
            }
        })
    }
}

module.exports = recommendedTitles;