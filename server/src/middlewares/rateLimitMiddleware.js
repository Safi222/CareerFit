const rateLimit = require('express-rate-limit')

const rateLimitMiddleware = () => {
    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        limit: 100,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
    })
    return limiter
}

module.exports = rateLimitMiddleware;