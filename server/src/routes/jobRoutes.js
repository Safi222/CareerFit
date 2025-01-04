const express = require('express');
const { getJobs, searchJobsController } = require('../controllers/jobController');

const jobRoutes = express.Router();

// Route to get jobs
jobRoutes.get('/home', getJobs);
jobRoutes.get('/search', searchJobsController);

module.exports = jobRoutes;
