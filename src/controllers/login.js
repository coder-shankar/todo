import {
  Router
} from 'express';

import * as loginService from '../services/loginService';

const router = new Router();

/**
 * post request to login with email and password
 */

router.post('/', async (req, res, next) => {
  try {
    const response = await loginService.login(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
