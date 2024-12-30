const { createClient } = require('redis');

// Redis configuration
const REDIS_URL = process.env.REDIS_URL;

// Create Redis client
const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('connect', () => {
    console.log('Redis client connected successfully.');
  });
redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
  });

module.exports = {
    redisClient,
};
