const request = require('supertest');
const express = require('express');
const { redisClient } = require('../../src/config/redis');
const jobRoutes = require('../../src/routes/jobRoutes');
const { fetchJobs, searchJobs } = require('../../src/services/jobService');

// Mock the jobService functions
jest.mock('../../src/services/jobService');

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/jobs', jobRoutes);

// Mock Redis client with all required methods
jest.mock('../../src/config/redis', () => ({
    redisClient: {
        get: jest.fn(),
        setEx: jest.fn(),
        connect: jest.fn(),
        on: jest.fn(),
        quit: jest.fn().mockResolvedValue(true),
    },
}));

describe('Job Routes Tests', () => {
    // Sample job data that mirrors real JSearch API response format
    const mockJobs = [{
            job_id: 'xwaHKWSZxcTkxp_UAAAAAA==',
            job_title: 'Senior Software Engineer',
            employer_name: 'Tech Corp',
            employer_logo: 'https://example.com/logos/techcorp.png',
            job_employment_type: 'Full-time',
            job_apply_link: 'https://example.com/careers/senior-swe',
            job_description: 'Looking for an experienced software engineer...',
            job_posted_at: '2024-01-07',
            job_posted_at_datetime_utc: '2024-01-07T08:30:00.000Z',
            job_state: 'Cairo',
            job_country: 'EG'
        },
        {
            job_id: 'KpmHWxscTkUp_UBBBBBBB==',
            job_title: 'Full Stack Developer',
            employer_name: 'Innovation Labs',
            employer_logo: 'https://example.com/logos/innovlabs.png',
            job_employment_type: 'Contract',
            job_apply_link: 'https://example.com/careers/fullstack-dev',
            job_description: 'Join our dynamic team of developers...',
            job_posted_at: '2024-01-06',
            job_posted_at_datetime_utc: '2024-01-06T14:15:00.000Z',
            job_state: 'Alexandria',
            job_country: 'EG'
        }
    ];

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Suppress console.error for expected error cases
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore console.error after each test
        console.error.mockRestore();
    });

    afterAll(async() => {
        await redisClient.quit();
    });

    describe('GET /api/jobs/home', () => {
        it('should return jobs with default query when no query is provided', async() => {
            fetchJobs.mockResolvedValue(mockJobs);

            const response = await request(app)
                .get('/api/jobs/home')
                .expect(200);

            expect(response.body.status).toBe('success');
            expect(response.body.data.jobs).toEqual(mockJobs);
            expect(response.body.data.jobs.length).toBe(mockJobs.length);
            expect(fetchJobs).toHaveBeenCalledWith('tech jobs in Egypt', undefined, undefined);

            // Updated regex to match actual job_id format
            response.body.data.jobs.forEach(job => {
                expect(job.job_id).toMatch(/^[A-Za-z0-9+/_-]+==$/)
            });
        });

        it('should return jobs with provided query parameters', async() => {
            fetchJobs.mockResolvedValue(mockJobs);

            const response = await request(app)
                .get('/api/jobs/home')
                .query({
                    query: 'software engineer in Cairo',
                    page: 1,
                    num_pages: 2
                })
                .expect(200);

            expect(response.body.status).toBe('success');
            expect(response.body.data.jobs[0].job_id).toMatch(/^[A-Za-z0-9+/_-]+==$/)
            expect(fetchJobs).toHaveBeenCalledWith('software engineer in Cairo', '1', '2');
        });

        it('should handle errors gracefully', async() => {
            fetchJobs.mockRejectedValue(new Error('API Error'));

            const response = await request(app)
                .get('/api/jobs/home')
                .expect(500);

            expect(response.body.status).toBe('fail');
            expect(response.body.data.title).toBe('Failed to fetch jobs');
        });
    });

    describe('GET /api/jobs/search', () => {
        it('should return filtered jobs based on search parameters', async() => {
            searchJobs.mockResolvedValue(mockJobs);

            const searchParams = {
                title: 'Software Engineer',
                location: 'Cairo',
                type: 'Full-time',
                level: 'Senior',
                page: '1',
                num_pages: '1'
            };

            const response = await request(app)
                .get('/api/jobs/search')
                .query(searchParams)
                .expect(200);

            expect(response.body.status).toBe('success');
            expect(response.body.data.jobs).toEqual(mockJobs);
            expect(searchJobs).toHaveBeenCalledWith(
                'Software Engineer Cairo Full-time Senior',
                '1',
                '1'
            );

            response.body.data.jobs.forEach(job => {
                expect(job.job_id).toMatch(/^[A-Za-z0-9+/_-]+==$/)
            });
        });

        it('should handle empty search parameters', async() => {
            searchJobs.mockResolvedValue(mockJobs);

            const response = await request(app)
                .get('/api/jobs/search')
                .expect(200);

            expect(response.body.status).toBe('success');
            expect(searchJobs).toHaveBeenCalledWith(' US  ', undefined, undefined);
            expect(response.body.data).toHaveProperty('jobs');
            expect(Array.isArray(response.body.data.jobs)).toBe(true);
        });

        it('should handle search errors gracefully', async() => {
            searchJobs.mockRejectedValue(new Error('Search Error'));

            const response = await request(app)
                .get('/api/jobs/search')
                .expect(500);

            expect(response.body.status).toBe('fail');
            expect(response.body.data.title).toBe('Failed to fetch jobs');
        });
    });
});
