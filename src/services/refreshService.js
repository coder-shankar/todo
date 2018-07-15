import Boom from 'boom';
import * as userServices from './userService';
import * as tokenUtils from '../utils/token';
import * as tokenServices from './tokenServices';

export async function refresh(req) {


  const email = await tokenUtils.verifyRefreshToken(req.get('refreshToken')).data;



  //getting data from databs


  const token = await tokenServices.getToken(req.get('refreshToken'));

  const {
    userId,
    id
  } = token.attributes;
  console.log(token);


  await tokenServices.deleteToken(id);


  const newAccessToken = tokenUtils.createAccessToken(email);
  const newRefreshToken = tokenUtils.createRefreshToken(email);
  const newToken = {
    user_id: userId,
    refresh_token: newRefreshToken
  };
  // write refresh token in database
  await tokenServices.saveToken(newToken);

  return {
    newAccessToken: newAccessToken,
    newRefreshToken: newRefreshToken
  };

}
