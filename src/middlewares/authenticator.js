import * as userServices from '../services/userService';
import * as tokenUtils from '../utils/token';
import * as tokenServices from '../services/tokenServices';
import Boom from 'boom';



export async function authenicate(req, res, next) {


  const token = req.get('oauth');
  try {
    const email = await tokenUtils.verifyAccessToken(token).data;


    //check the user email

    const user = await userServices.getUserEmail(email);

    req.user = user;
    next();
  } catch (err) {
    res.json({
      code: 401,
      error: 'authenicate error'
    });
  }

}
