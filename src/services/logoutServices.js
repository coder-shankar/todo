import * as tokenUtils from '../utils/token';
import * as userServices from './userService';
import * as tokenServices from './tokenServices';

export async function logout(refreshToken) {
  const email = await tokenUtils.verifyAccessToken(refreshToken).data;
  //check the user email

  const user = await userServices.getUserEmail(email);
  const user_id = user.attributes.id;
  console.log(user_id);
  
  //remove entry in database
  await tokenServices.deleteTokenByUserId(user_id);


}
