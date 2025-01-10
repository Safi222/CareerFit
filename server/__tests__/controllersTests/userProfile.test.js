const profileController = require('../../src/controllers/profileController');
const User = require('../../src/models/User');

jest.mock('../../src/models/User');

describe('profileController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { id: 'mockUserId' },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should return 200 and user data for a user with name "shady" and Gmail "shadimahmod@gmail.com"', async() => {
        const mockUser = {
            firstName: 'Shady',
            lastName: 'Mahmoud',
            email: 'shadimahmod@gmail.com',
            profilePic: 'mockProfilePic.jpg',
        };

        User.findById.mockResolvedValue(mockUser);

        await profileController(req, res);

        expect(User.findById).toHaveBeenCalledWith('mockUserId', 'firstName lastName email profilePic cvFile');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: {
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                email: mockUser.email,
                profilePic: mockUser.profilePic,
            },
        });
    });
    it('should return 500 if an error occurs', async() => {
        req.user = { id: 'mockUserId' };
        User.findById.mockRejectedValue(new Error('Database error'));

        await profileController(req, res);

        expect(User.findById).toHaveBeenCalledWith('mockUserId', 'firstName lastName email profilePic cvFile');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            data: {
                title: "Internal Server Error",
            },
        });
    });
});