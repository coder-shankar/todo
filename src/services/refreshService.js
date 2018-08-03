import Boom from 'boom';
import * as userServices from './userService';
import * as tokenUtils from '../utils/token';
import * as tokenServices from './tokenServices';


export async function refresh(req) {


  const email = await tokenUtils.verifyRefreshToken(req.get('refreshToken')).data;



  //getting data from databs

const usr = await userServices.getUserEmail(email);
console.log(usr.attributes.id);

const token = await tokenServices.getToken(usr.attributes.id);
console.log(token,"token");



  

  await tokenServices.deleteTokenByUserId(usr.attributes.id);


  const newAccessToken = tokenUtils.createAccessToken(email);
  const newRefreshToken = tokenUtils.createRefreshToken(email);
  const newToken = {
    user_id: usr.attributes.id,
    refresh_token: newRefreshToken
  };   
  console.log(newToken.user_id)
  // write refresh token in database
  await tokenServices.updateToken(newToken.user_id,newToken.refresh_token);
  return {
    newAccessToken: newAccessToken,
    newRefreshToken: newRefreshToken
  };

}  
