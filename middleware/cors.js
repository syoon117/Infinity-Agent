// middleware/cors.js
const cors = require('cors');
const corsOptions = {
  origin: '*', // Update to restrict to Lovable.dev domain in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
module.exports = cors(corsOptions);
