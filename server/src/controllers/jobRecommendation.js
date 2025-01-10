const downloadPdf = require('../utils/downloadPdf')
const deletePdf = require('../utils/deletePdf')
const chatBot = require('../utils/chatbot')
const pdfParser = require('../utils/pdfParser')
const { redisClient } = require("../config/redis");
const User = require('../models/User');
/**
 * Get recommended titles for a user based on their CV.
 * 
 * @params {Object} req - The request object containing user information (user ID).
 * @params {Object} res - The response object to send the response back to the client.
 * 
 * @returns {Object} JSON response with status and data (recommendation or error message).
 */
const recommendedTitles = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const redisKey = user.cvFile
        if(!redisKey){
            return res.status(404).json({
                status: "fail",
                "data": {
                    title: "cv not found"
                }
            })
        }
        const redisRes = await redisClient.get(redisKey)
        if (redisRes){
            const recommendation =  JSON.parse(redisRes)
            return res.status(200).json({
                status: "success",
                "data": { recommendation }
            })
        }
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
        await redisClient.setEx(redisKey, 3600, JSON.stringify(recommendation))
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