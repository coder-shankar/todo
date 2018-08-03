import Boom from 'boom';
import Token from '../models/token';


// save tokens in database
export function saveToken(token) {
  return new Token({
    user_id: token.user_id,
    refresh_token: token.refresh_token
  }).save().then(user => user.refresh());
}


export function getToken(user_id) {
  return new Token({
      user_id
    })
    .fetch()
    .then(token => {
      if (!token) {
        throw new Boom.notFound('token not found');
      }
      return token;
    });
}


export function deleteTokenByUserId(user_id) {
  return new Token({
    user_id
  }).fetch().then(token => {token.destroy()});
}


export function updateToken(user_id, refresh_token) {
  return new Token({user_id})
  .where({user_id})
    .save({
      refresh_token:refresh_token
    })
    .then(token => token.refresh());
}