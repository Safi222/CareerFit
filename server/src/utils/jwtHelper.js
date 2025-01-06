const jwt = require('jsonwebtoken')

const createToken = async(user) => {
    const token = 'Bearer ' + await jwt.sign({ firstName: user.firstName, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return token;
}


const verifyToken = async(token) => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken;
}

module.exports = {
    createToken,
    verifyToken
}