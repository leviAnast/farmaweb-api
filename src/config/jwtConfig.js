const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET não definido no .env');
if (!REFRESH_TOKEN_SECRET) throw new Error('REFRESH_TOKEN_SECRET não definido no .env');

function generateAccessToken(payload) {
  if (!payload || !payload.id || !payload.role) {
    throw new Error('Payload inválido para gerar Access Token');
  }
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
  if (!payload || !payload.id || !payload.role) {
    throw new Error('Payload inválido para gerar Refresh Token');
  }
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
