import {
  Router
} from 'express';

import * as refreshService from '../services/refreshService';

const router = new Router();

/**
 * post request to login with email and password
 */


router.post('/', async (req, res, next) => {
  try {
    //check for token in database
    //if match then generate access token else send error msg
    const token = await refreshService.refresh(req);
    res.json(token);



  } catch (err) {
    next(err);
  }
});

export default router;
