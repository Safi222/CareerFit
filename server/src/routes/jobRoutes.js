const express = require('express');
const { getJobs } = require('../controllers/jobController');

const jobRoutes = express.Router();

// Route to get jobs
jobRoutes.get('/home', getJobs);

module.exports = jobRoutes;
