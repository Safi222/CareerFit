const jwt = require('jsonwebtoken')

/**
 * @param {Object} user - The user object containing user details.
 * @param {string} user.firstName - The user's first name.
 * @param {string} user.id - The user's ID.
 * @returns {Promise<string>} - The generated JWT token.
 */
const createToken = async(user) => {
    const token = 'Bearer ' + await jwt.sign({ firstName: user.firstName, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return token;
}

/**
 * @param {string} token - The JWT token to be verified.
 * @returns {Promise<Object>} - The decoded token data.
 */
const verifyToken = async(token) => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken;
}

module.exports = {
    createToken,
    verifyToken
}