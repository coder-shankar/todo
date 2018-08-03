import {
  Router
} from 'express';

import * as logoutService from '../services/logoutServices';

const router = new Router();

/**
 * post request to login with email and password
 */

router.post('/', async (req, res, next) => {

  try {
    const response = await logoutService.logout(req.get('refreshToken'));
    res.json(response);


  } catch (err) {
    next(err);
  }
});

export default router;
