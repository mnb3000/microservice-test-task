import { RequestHandler } from 'express';
import { UnauthorizedError } from 'express-jwt';
import axios, { AxiosResponse } from 'axios';

interface ValidateJwtResponse {
  payload?: any;
  error?: string;
}

const checkJwt: RequestHandler = async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } else {
        return next(new UnauthorizedError('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' }));
      }
    } else {
      return next(new UnauthorizedError('credentials_bad_format', { message: 'Format is Authorization: Bearer [token]' }));
    }
  }

  if (!token) {
    return next(new UnauthorizedError('credentials_required', { message: 'No authorization token was found' }));
  }

  try {
    const validationResponse = await axios.post<ValidateJwtResponse>(`${process.env.AUTH_SERVICE_URL}/auth/validateToken`, { token });
    if (validationResponse.data.error || !validationResponse.data.payload) {
      return next(new UnauthorizedError('invalid_token', { message: "Invalid token!" }));
    }
    req.user = validationResponse.data.payload;
    return next();
  } catch (e) {
    return next(new UnauthorizedError('invalid_token', { message: "Invalid token!" }));
  }

}

export default checkJwt;
