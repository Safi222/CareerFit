const rateLimit = require('express-rate-limit')
    /**
     * @returns {Object} - The rate limit middleware configured with a window of 10 minutes and a limit of 100 requests.
     */
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