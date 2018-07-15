import Boom from 'boom';
import Token from '../models/token';


// save tokens in database
export function saveToken(token) {
  return new Token({
    user_id: token.user_id,
    refresh_token: token.refresh_token
  }).save().then(user => user.refresh());
}


export function getToken(refresh) {
  return new Token({
      refresh_token: refresh
    })
    .fetch()
    .then(token => {
      if (!token) {
        throw new Boom.notFound('token not found');
      }
      return token;
    });
}

export function deleteToken(id) {
  return new Token({
    id
  }).fetch().then(token => token.destroy());
}

export function deleteTokenByUserId(id) {
  return new Token({
    user_id: id
  }).fetch().then(token => token.destroy());
}
