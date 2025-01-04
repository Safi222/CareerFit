const cvAnalyzer = require('express').Router()
const recommendedTitles = require('../controllers/jobRecommendation')
const authorizationVerfication = require('../middlewares/authMiddleware')

cvAnalyzer.get('/analyze', authorizationVerfication.authorizationVerfication, recommendedTitles)


module.exports = cvAnalyzer