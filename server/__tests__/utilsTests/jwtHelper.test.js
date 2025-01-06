const jwt = require('jsonwebtoken');
const { createToken, verifyToken } = require('../../src/utils/jwtHelper');

jest.mock('jsonwebtoken');

describe('Auth Utils', () => {
    const mockUser = { firstName: 'Shady', id: 'mockUserId' };
    const mockToken = 'Bearer mockJwtToken';
    const decodedToken = { firstName: 'Shady', id: 'mockUserId', iat: 1670012345, exp: 1670098745 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createToken', () => {
        it('should return a token when given a user object', async() => {
            jwt.sign.mockReturnValue('mockJwtToken');

            const token = await createToken(mockUser);

            expect(jwt.sign).toHaveBeenCalledWith({ firstName: mockUser.firstName, id: mockUser.id },
                process.env.JWT_SECRET, { expiresIn: '1d' }
            );
            expect(token).toBe(mockToken);
        });

        it('should throw an error if jwt.sign fails', async() => {
            jwt.sign.mockImplementation(() => {
                throw new Error('JWT signing error');
            });

            await expect(createToken(mockUser)).rejects.toThrow('JWT signing error');
        });
    });

    describe('verifyToken', () => {
        it('should return decoded token when given a valid token', async() => {
            jwt.verify.mockReturnValue(decodedToken);

            const result = await verifyToken('mockJwtToken');

            expect(jwt.verify).toHaveBeenCalledWith('mockJwtToken', process.env.JWT_SECRET);
            expect(result).toEqual(decodedToken);
        });

        it('should throw an error if jwt.verify fails', async() => {
            jwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            await expect(verifyToken('invalidJwtToken')).rejects.toThrow('Invalid token');
        });
    });
});