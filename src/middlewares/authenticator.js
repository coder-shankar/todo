import * as userServices from '../services/userService';
import * as tokenUtils from '../utils/token';
import * as tokenServices from '../services/tokenServices';
import Boom from 'boom';
import Sentry from '../sentry';

export async function authenicate(req, res, next) {
  const token = req.get('oauth');
  try {
    const email = await tokenUtils.verifyAccessToken(token).data;

    // check the user email

    const user = await userServices.getUserEmail(email);
    req.user = user;
    next();
  } catch (err) {
    // generate new token if token expires
    if (err.TokenExpiredError == 'jwt expired') {
      const token = req.get('refreshToken');
      const email = await tokenUtils.verifyAccessToken(token).data;
      const accessToken = tokenUtils.createAccessToken(email);

      res.json({
        newAccessToken: accessToken
      });
    } else {
      Sentry.log({
        message: 'token verification failed',
        error: err
      });
    }
  }
}
