require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TYPE_OF_PERSISTANCE: process.env.TYPE_OF_PERSISTANCE || 'MONGO',
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE,
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASS: process.env.ETHEREAL_PASS,
    GRAPHIQL: process.env.GRAPHIQL || true,
}