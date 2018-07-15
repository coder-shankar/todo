import {
  Router
} from 'express';

import * as userServices from '../services/userService';

const router = new Router();


router.post('/', async (req, res, next) => {
  try {
    await userServices.createUser(req.body);
    res.json({
      "sucess": "user created sucessfully"
    });
  } catch (err) {
    next(err);
  }


});


export default router;
