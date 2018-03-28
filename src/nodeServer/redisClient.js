const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient('redis://ec2-54-183-163-121.us-west-1.compute.amazonaws.com:6379');

redisClient.on('connect', () => console.log('CONNECTED REDIS'));

module.exports = redisClient;
