import Boom from 'boom';
import * as userServices from './userService';
import * as tokenUtils from '../utils/token';
import * as tokenServices from './tokenServices';
import bcrypt from 'bcryptjs';


// const bcrypt = require('bcryptjs');

export async function login(payload) {
  const {
    email,
    password
  } = payload;

  const user = await userServices.getUserEmail(email);

  const match = await bcrypt.compareSync(password, user.attributes.password);
  if (!match) {
    throw new Boom.notFound('password not match');
  }

  //generate token only if it is not in database 


  const accessToken = tokenUtils.createAccessToken(user.attributes.email);
  const refreshToken = tokenUtils.createRefreshToken(user.attributes.email);

  // save refresh token in db
  tokenServices.saveToken({
    user_id: user.attributes.id,
    refresh_token: refreshToken
  });

  const token = {
    accessToken: accessToken,
    refreshToken: refreshToken
  };



  return token;
}
