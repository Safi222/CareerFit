const axios = require("axios");
const { redisClient } = require("../config/redis");

const JSEARCH_API_HOST = process.env.JSEARCH_HOST;
const JSEARCH_API_KEY = process.env.JSEARCH_API_KEY;

const fetchJobs = async (query, page = 1, num_pages = 1) => {
    const redisKey = `jobs:${query}:page:${page}`;
    
    try {
        // Check if data exists in Redis
        const cachedData = await redisClient.get(redisKey);
        if (cachedData) {
            console.log("Returning data from Redis cache");
            return JSON.parse(cachedData);
        }

        console.log(`Fetching data from JSearch API for query: ${query}, page: ${page}, num_pages: ${num_pages}`);
        // If not in Redis, fetch from JSearch API
        const response = await axios.get(`https://${JSEARCH_API_HOST}/search`, {
            params: { 
                query,
                page,
                num_pages 
            },
            headers: {
                "X-RapidAPI-Host": JSEARCH_API_HOST,
                "X-RapidAPI-Key": JSEARCH_API_KEY,
            },
        });

        if (response.data && response.data.data) {
            // Extract necessary fields
            const filteredJobs = response.data.data.map(job => ({
                job_title: job.job_title,
                employer_name: job.employer_name,
                employer_logo: job.employer_logo,
                job_employment_type: job.job_employment_type,
                job_apply_link: job.job_apply_link,
                job_description: job.job_description,
                job_posted_at: job.job_posted_at,
                job_posted_at_datetime_utc: job.job_posted_at_datetime_utc,
                job_state: job.job_state,
                job_country: job.job_country,
            }));

            // Save filtered data to Redis with expiration of 1 hour
            await redisClient.setEx(redisKey, 3600, JSON.stringify(filteredJobs));

            return filteredJobs;
        }

        throw new Error("No data found from JSearch API");
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        throw error;
    }
};

/**
 * Search for jobs with advanced filters.
 * @param {object} filters - Filters for the job search.
 * @param {number} page - Page number for pagination.
 * @param {number} num_pages - Number of pages to fetch.
 * @returns {array} Filtered jobs.
 */
const searchJobs = async (query, page = 1, num_pages = 1) => {
    const redisKey = `jobs:search:${query}:page:${page}`;
    console.log(query)
    try {
        // Check if data exists in Redis
        const cachedData = await redisClient.get(redisKey);
        if (cachedData) {
            console.log("Returning data from Redis cache");
            return JSON.parse(cachedData);
        }

        // Prepare query parameters for JSearch API
        const params = {
            query,
            page,
            num_pages,
        };

        // Fetch from JSearch API
        const response = await axios.get(`https://${JSEARCH_API_HOST}/search`, {
            params,
            headers: {
                "X-RapidAPI-Host": JSEARCH_API_HOST,
                "X-RapidAPI-Key": JSEARCH_API_KEY,
            },
        });

        if (response.data && response.data.data) {
            const filteredJobs = response.data.data.map(job => ({
                job_title: job.job_title,
                employer_name: job.employer_name,
                employer_logo: job.employer_logo,
                job_employment_type: job.job_employment_type,
                job_apply_link: job.job_apply_link,
                job_description: job.job_description,
                job_posted_at: job.job_posted_at,
                job_posted_at_datetime_utc: job.job_posted_at_datetime_utc,
                job_state: job.job_state,
                job_country: job.job_country,
                job_level: job.job_level, // Include additional fields if needed
            }));

            // Cache the response in Redis for 1 hour
            await redisClient.setEx(redisKey, 3600, JSON.stringify(filteredJobs));

            return filteredJobs;
        }

        throw new Error("No data found from JSearch API");
    } catch (error) {
        console.error("Error searching jobs:", error.message);
        throw error;
    }
};

module.exports = {
    fetchJobs,
    searchJobs
};
