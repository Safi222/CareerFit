const request = require('supertest');
require('dotenv').config();
const express = require('express');
const User = require('../../src/models/User');
const { redisClient } = require('../../src/config/redis');
const downloadPdf = require('../../src/utils/downloadPdf');
const deletePdf = require('../../src/utils/deletePdf');
const chatBot = require('../../src/utils/chatbot');
const pdfParser = require('../../src/utils/pdfParser');
const recommendedTitles = require('../../src/controllers/jobRecommendation');
const { createToken } = require('../../src/utils/jwtHelper');

jest.mock('../../src/models/User');
jest.mock('../../src/utils/downloadPdf');
jest.mock('../../src/utils/deletePdf');
jest.mock('../../src/utils/chatbot');
jest.mock('../../src/utils/pdfParser');
jest.mock('../../src/config/redis', () => ({
    redisClient: {
        get: jest.fn(),
        setEx: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    req.user = { id: 'mockUserId' };
    next();
});
app.post('/recommendations', recommendedTitles);

describe('Recommended Titles Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return recommendations from Redis cache', async () => {
        const mockRecommendation = ['Job Title 1', 'Job Title 2'];
        User.findById.mockResolvedValue({ cvFile: 'mockRedisKey' });
        redisClient.get.mockResolvedValue(JSON.stringify(mockRecommendation));

        const response = await request(app).post('/recommendations').send({});

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.recommendation).toEqual(mockRecommendation);

        expect(redisClient.get).toHaveBeenCalledWith('mockRedisKey');
        expect(downloadPdf).not.toHaveBeenCalled();
        expect(pdfParser).not.toHaveBeenCalled();
        expect(chatBot).not.toHaveBeenCalled();
        expect(deletePdf).not.toHaveBeenCalled();
    });

    it('should process CV and return recommendations successfully', async () => {
        const mockContent = 'Parsed CV content';
        const mockRecommendation = ['Job Title 1', 'Job Title 2'];
        User.findById.mockResolvedValue({ cvFile: 'mockRedisKey' });
        redisClient.get.mockResolvedValue(null);
        downloadPdf.mockResolvedValue('mockFilePath');
        pdfParser.mockResolvedValue(mockContent);
        chatBot.mockResolvedValue(mockRecommendation);

        const response = await request(app).post('/recommendations').send({});

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.recommendation).toEqual(mockRecommendation);

        expect(downloadPdf).toHaveBeenCalledWith('mockUserId');
        expect(pdfParser).toHaveBeenCalledWith('mockFilePath');
        expect(chatBot).toHaveBeenCalledWith(mockContent);
        expect(deletePdf).toHaveBeenCalledWith('mockFilePath');
        expect(redisClient.setEx).toHaveBeenCalledWith(
            'mockRedisKey',
            3600,
            JSON.stringify(mockRecommendation)
        );
    });

    it('should handle missing CV file in user record', async () => {
        User.findById.mockResolvedValue({ cvFile: null });

        const response = await request(app).post('/recommendations').send({});

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('fail');
        expect(response.body.data.title).toBe('cv not found');

        expect(redisClient.get).not.toHaveBeenCalled();
        expect(downloadPdf).not.toHaveBeenCalled();
        expect(pdfParser).not.toHaveBeenCalled();
        expect(chatBot).not.toHaveBeenCalled();
        expect(deletePdf).not.toHaveBeenCalled();
    });

    it('should handle Redis key not found', async () => {
        User.findById.mockResolvedValue({ cvFile: 'mockRedisKey' });
        redisClient.get.mockResolvedValue(null);
        downloadPdf.mockResolvedValue(null);

        const response = await request(app).post('/recommendations').send({});

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('fail');
        expect(response.body.data.title).toBe('cv not found');

        expect(downloadPdf).toHaveBeenCalledWith('mockUserId');
        expect(pdfParser).not.toHaveBeenCalled();
        expect(chatBot).not.toHaveBeenCalled();
        expect(deletePdf).not.toHaveBeenCalled();
    });

    it('should handle error while preparing CV', async () => {
        User.findById.mockResolvedValue({ cvFile: 'mockRedisKey' });
        redisClient.get.mockResolvedValue(null);
        downloadPdf.mockResolvedValue(undefined);

        const response = await request(app).post('/recommendations').send({});

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('fail');
        expect(response.body.data.title).toBe('error while preparing your cv');

        expect(downloadPdf).toHaveBeenCalledWith('mockUserId');
        expect(pdfParser).not.toHaveBeenCalled();
        expect(chatBot).not.toHaveBeenCalled();
        expect(deletePdf).not.toHaveBeenCalled();
    });

    it('should handle internal server error', async () => {
        User.findById.mockRejectedValue(new Error('Unexpected Error'));

        const response = await request(app).post('/recommendations').send({});

        expect(response.status).toBe(500);
        expect(response.body.status).toBe('error');
        expect(response.body.data.title).toBe('internal server error');
    });
});
