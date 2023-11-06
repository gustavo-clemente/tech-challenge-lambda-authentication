import * as jwt from 'jsonwebtoken';

export default class TokenGenerator {
  generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, { algorithm: 'HS256' });
  }
}