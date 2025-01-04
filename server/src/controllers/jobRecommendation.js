const downloadPdf = require('../utils/downloadPdf')
const deletePdf = require('../utils/deletePdf')
const chatBot = require('../utils/chatbot')
const pdfParser = require('../utils/pdfParser')


const recommendedTitles = async(req, res) => {
    const id = req.user.id;
    const filePath = await downloadPdf(id)
    if (!filePath) {
        if (filePath === null)
            return res.status(404).json({
                status: "fail",
                "data": "cv not found"
            })
        else {
            return res.status(404).json({
                status: "fail",
                "data": "error while preparing your cv"
            })
        }
    }
    const content = await pdfParser(filePath)
    deletePdf(filePath)
    const recommendation = await chatBot(content)
    return res.status(200).json({
        status: "success",
        "data": recommendation
    })
}

module.exports = recommendedTitles;