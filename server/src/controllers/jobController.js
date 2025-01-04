const { fetchJobs, searchJobs } = require('../services/jobService');

/**
 * Get jobs based on query.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getJobs = async (req, res) => {
  try {
    const query = req.query.query || 'tech jobs in Egypt'; // Default query
	const page = req.query.page;
	const num_pages = req.query.num_pages
    const jobs = await fetchJobs(query, page, num_pages);
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

/**
 * Search for jobs based on filters.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const searchJobsController = async (req, res) => {
    try {
        const { title, location, type, level, page, num_pages } = req.query;

        // Construct filters object
		const query = `${title?title:''} ${location?location:''} ${type?type:''} ${level?level:''}`

        const jobs = await searchJobs(query, page, num_pages);
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search for jobs' });
    }
};

module.exports = { getJobs, searchJobsController };
