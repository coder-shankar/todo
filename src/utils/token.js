import jwt from 'jsonwebtoken';
const accessSecretKey = '1997';
const refreshSecretKey = '1997';

export function createAccessToken(payload) {
  return jwt.sign({
    data: payload
  }, accessSecretKey, {
    expiresIn: '1h'
  });
}


export function createRefreshToken(payload) {
  return jwt.sign({
    data: payload
  }, refreshSecretKey);
}


export function verifyAccessToken(token) {
  return jwt.verify(token, accessSecretKey);
}


export function verifyRefreshToken(token) {
  return jwt.verify(token, refreshSecretKey);
}
