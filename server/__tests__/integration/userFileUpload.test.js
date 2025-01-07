const request = require('supertest');
require('dotenv').config();
const express = require('express');
const User = require('../../src/models/User');
const { createToken } = require('../../src/utils/jwtHelper');
const path = require('path');
const fs = require('fs');
const cloudinaryService = require('../../src/services/cloudinaryService');
const { uploadPic, uploadcv } = require('../../src/middlewares/fileUpload');
const { authorizationVerfication } = require('../../src/middlewares/authMiddleware');
const detectMiddleware = require('../../src/middlewares/detectMalware');

// Mock external services
jest.mock('../../src/services/cloudinaryService');
jest.mock('../../src/middlewares/detectMalware', () => (req, res, next) => next());

const app = express();
app.use(express.json());

// Configure test routes
app.post('/api/users/profile-picture', 
//   authorizationVerfication,
  uploadPic.single('profilePic'),
  detectMiddleware,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          status: "fail",
          data: { 
            title: "No file uploaded" 
          } 
        });
      }

      const result = await cloudinaryService.uploadProfilePic(req.file.path);
      await fs.promises.unlink(req.file.path);

      res.status(200).json({
        status: "success",
        data: {
          profilePic: result.secure_url
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: {
          title: error.message
        }
      });
    }
  }
);

app.post('/api/users/cv',
//   authorizationVerfication,
  uploadcv.single('cvFile'),
  detectMiddleware,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "fail",
          data: {
            title: "No file uploaded"
          }
        });
      }

      const result = await cloudinaryService.uploadCvFile(req.file.path);
      await fs.promises.unlink(req.file.path);

      res.status(200).json({
        status: "success",
        data: {
          cvFile: result.secure_url
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: {
          title: error.message
        }
      });
    }
  }
);

describe('User File Upload Endpoints', () => {
  let authToken;
  const mockUser = {
    _id: '67781e083328fcc9a13b0aae',
    firstName: 'Test',
    email: 'test@example.com',
    profilePic: null,
    cvFile: null
  };

  // Increase timeout for file operations
  jest.setTimeout(15000);

  beforeAll(async () => {
    // Generate authentication token
    authToken = await createToken({
      id: mockUser._id,
      firstName: mockUser.firstName
    });
    console.log(authToken)
    // Create necessary directories
    const fixturesDir = path.join(__dirname, '../fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }
    
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
  });

  afterAll(() => {
    if (fs.existsSync('uploads')) {
      fs.rmSync('uploads', { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock database operations
    User.findById = jest.fn().mockResolvedValue(mockUser);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

    // Mock cloudinary operations
    cloudinaryService.uploadProfilePic = jest.fn().mockResolvedValue({
      secure_url: 'https://cloudinary.com/fake-profile-pic.jpg'
    });
    cloudinaryService.uploadCvFile = jest.fn().mockResolvedValue({
      secure_url: 'https://cloudinary.com/fake-cv.pdf'
    });
    cloudinaryService.deleteFileFromCloudinary = jest.fn().mockResolvedValue(true);
  });

  describe('POST /users/profile-picture', () => {
    const testImagePath = path.join(__dirname, '../fixtures/test-image.jpg');

    beforeEach(() => {
      fs.writeFileSync(testImagePath, 'fake image content');
    });

    it('should upload profile picture successfully', async () => {
      const response = await request(app)
        .post('/api/users/profile-picture')
        .set('Authorization', `${authToken}`)  // Added Bearer prefix
        .attach('profilePic', testImagePath);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.profilePic).toBe('https://cloudinary.com/fake-profile-pic.jpg');
      expect(cloudinaryService.uploadProfilePic).toHaveBeenCalled();
    });

    it('should return 400 when no file is uploaded', async () => {
      const response = await request(app)
        .post('/api/users/profile-picture')
        .set('Authorization', `${authToken}`);  // Added Bearer prefix

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('fail');
      expect(response.body.data.title).toBe('No file uploaded');
    });

    // it('should return 400 when no auth token is provided', async () => {
    //   const response = await request(app)
    //     .post('/api/users/profile-picture')
    //     .attach('profilePic', testImagePath);

    //   expect(response.status).toBe(400);
    //   expect(response.body.status).toBe('fail');
    //   expect(response.body.data.title).toBe('Missing Authorization Header');
    // });
  });

  describe('POST /users/cv', () => {
    const testPdfPath = path.join(__dirname, '../fixtures/test-cv.pdf');

    beforeEach(() => {
      fs.writeFileSync(testPdfPath, 'fake pdf content');
    });

    it('should upload CV successfully', async () => {
      const response = await request(app)
        .post('/api/users/cv')
        .set('Authorization', `${authToken}`)  // Added Bearer prefix
        .attach('cvFile', testPdfPath);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.cvFile).toBe('https://cloudinary.com/fake-cv.pdf');
      expect(cloudinaryService.uploadCvFile).toHaveBeenCalled();
    });

    it('should return 400 when no file is uploaded', async () => {
      const response = await request(app)
        .post('/api/users/cv')
        .set('Authorization', `${authToken}`);  // Added Bearer prefix

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('fail');
      expect(response.body.data.title).toBe('No file uploaded');
    });

    // it('should return 400 when no auth token is provided', async () => {
    //   const response = await request(app)
    //     .post('/api/users/cv')
    //     .attach('cvFile', testPdfPath);

    //   expect(response.status).toBe(400);
    //   expect(response.body.status).toBe('fail');
    //   expect(response.body.data.title).toBe('Missing Authorization Header');
    // });
  });
});