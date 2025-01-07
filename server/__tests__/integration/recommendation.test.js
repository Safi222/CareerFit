const request = require('supertest');
const express = require('express')
const app = express();
const downloadPdf = require('../../src/utils/downloadPdf');
const deletePdf = require('../../src/utils/deletePdf');
const chatBot = require('../../src/utils/chatbot');
const pdfParser = require('../../src/utils/pdfParser');
const recommendedTitles = require('../../src/controllers/jobRecommendation')
jest.mock('../../src/utils/downloadPdf');
jest.mock('../../src/utils/deletePdf');
jest.mock('../../src/utils/chatbot');
jest.mock('../../src/utils/pdfParser');
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

    it('should return recommendations successfully', async() => {
        const mockContent = 'Parsed CV content';
        const mockRecommendation = ['Job Title 1', 'Job Title 2'];

        downloadPdf.mockResolvedValue('mockFilePath');
        pdfParser.mockResolvedValue(mockContent);
        chatBot.mockResolvedValue(mockRecommendation);
        deletePdf.mockImplementation(() => {});

        const response = await request(app)
            .post('/recommendations')
            .send({});

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.recommendation).toEqual(mockRecommendation);

        expect(downloadPdf).toHaveBeenCalledWith('mockUserId');
        expect(pdfParser).toHaveBeenCalledWith('mockFilePath');
        expect(deletePdf).toHaveBeenCalledWith('mockFilePath');
        expect(chatBot).toHaveBeenCalledWith(mockContent);
    });

    it('should handle CV not found error', async() => {
        downloadPdf.mockResolvedValue(null);

        const response = await request(app)
            .post('/recommendations')
            .send({});

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('fail');
        expect(response.body.data.title).toBe('cv not found');

        expect(downloadPdf).toHaveBeenCalledWith('mockUserId');
        expect(pdfParser).not.toHaveBeenCalled();
        expect(deletePdf).not.toHaveBeenCalled();
        expect(chatBot).not.toHaveBeenCalled();
    });

    it('should handle error while preparing CV', async() => {
        downloadPdf.mockResolvedValue(undefined);

        const response = await request(app)
            .post('/recommendations')
            .send({});

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('fail');
        expect(response.body.data.title).toBe('error while preparing your cv');

        expect(downloadPdf).toHaveBeenCalledWith('mockUserId');
        expect(pdfParser).not.toHaveBeenCalled();
        expect(deletePdf).not.toHaveBeenCalled();
        expect(chatBot).not.toHaveBeenCalled();
    });

    it('should handle internal server error', async() => {
        downloadPdf.mockRejectedValue(new Error('Unexpected Error'));

        const response = await request(app)
            .post('/recommendations')
            .send({});

        expect(response.status).toBe(500);
        expect(response.body.status).toBe('error');
        expect(response.body.data.title).toBe('internal server error');

        expect(downloadPdf).toHaveBeenCalledWith('mockUserId');
        expect(pdfParser).not.toHaveBeenCalled();
        expect(deletePdf).not.toHaveBeenCalled();
        expect(chatBot).not.toHaveBeenCalled();
    });
});