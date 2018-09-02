import { Router } from 'express';
import Sentry from '../sentry';
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
    Sentry.log({
      message: 'login failed',
      error: err
    });
  }
});

export default router;
