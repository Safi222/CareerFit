const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createToken } = require('../../src/utils/jwtHelper');
const {
    registerController,
    loginController,
    googleAuth
} = require('../../src/controllers/authController')
jest.mock('../../src/models/User');
jest.mock('bcrypt');
jest.mock('../../src/utils/jwtHelper');

app.post('/auth/register', registerController);
app.post('/auth/login', loginController);
app.post('/auth/google', googleAuth);

describe('Authentication Controllers', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Register Controller', () => {
        it('should register a new user successfully', async() => {
            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.prototype.save = jest.fn().mockResolvedValue();
            createToken.mockResolvedValue('mockToken');

            const response = await request(app)
                .post('/auth/register')
                .send({
                    firstName: 'shadi',
                    lastName: 'mahmoud',
                    email: 'shadimahmoud@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data.token).toBe('mockToken');
        });

        it('should return 400 for existing email', async() => {
            User.findOne.mockResolvedValue({ email: 'shadimahmoud@example.com' });

            const response = await request(app)
                .post('/auth/register')
                .send({
                    firstName: 'shadi',
                    lastName: 'mahmoud',
                    email: 'shadimahmoud@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('fail');
            expect(response.body.data.title).toBe('cannot use that email');
        });

        it('should handle validation errors', async() => {
            const response = await request(app)
                .post('/auth/register')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('fail');
        });
    });

    describe('Login Controller', () => {
        it('should login successfully', async() => {
            const mockUser = {
                email: 'shadimahmoud@example.com',
                matchPassword: jest.fn().mockResolvedValue(true),
            };

            User.findOne.mockResolvedValue(mockUser);
            createToken.mockResolvedValue('mockToken');

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'shadimahmoud@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.token).toBe('mockToken');
        });

        it('should return 404 if user not found', async() => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'shadimahmoud@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(404);
            expect(response.body.status).toBe('fail');
            expect(response.body.data.title).toBe('User Not Found');
        });

        it('should return 400 for wrong password', async() => {
            const mockUser = {
                email: 'shadimahmoud@example.com',
                matchPassword: jest.fn().mockResolvedValue(false),
            };

            User.findOne.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'shadimahmoud@example.com',
                    password: 'wrongPassword'
                });

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('fail');
            expect(response.body.data.title).toBe('Wrong password');
        });
    });

    describe('Google Auth Controller', () => {
        it('should handle Google authentication successfully', async() => {
            createToken.mockResolvedValue('mockToken');

            const response = await request(app)
                .post('/auth/google')
                .send({ user: { email: 'shadimahmoud@example.com' } });

            expect(response.status).toBe(302);
        });
    });
});