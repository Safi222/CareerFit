const jobFind = require('express').Router()

const jobFetchController = require('../controllers/jobController')

jobFind.get('/jobSearching', jobFetchController)


module.exports = jobFind;