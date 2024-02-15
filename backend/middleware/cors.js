const cors = require('cors');

//allowed origins for requests
const allowedOrigins = [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://discoverus.fairuse.org',
    'http://discoverus.fairuse.org',
    'http://www.discoverus.fairuse.org',
    'https://www.discoverus.fairuse.org'
  ]

  const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
  };

  module.exports = cors(corsOptions);