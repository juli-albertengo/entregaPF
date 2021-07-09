require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TYPE_OF_PERSISTANCE: process.env.TYPE_OF_PERSISTANCE || 'MONGO',
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    PASSPORT_SECRET: process.env.PASSPORT_SECRET,
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASS: process.env.ETHEREAL_PASS,
    GRAPHIQL: process.env.GRAPHIQL || true,
}