import {
  Router
} from 'express';
import swaggerSpec from './utils/swagger';
import usersController from './controllers/users';
import todosController from './controllers/todos';
import categoriesController from './controllers/categories';
import loginController from './controllers/login';
import * as authMiddleWare from './middlewares/authenticator';
import refreshTokenController from './controllers/refresh';
import logoutController from './controllers/logout';
import signupController from './controllers/signup';
/**
 * Contains all API routes for the application.
 */
let router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * @swagger
 * definitions:
 *   App:
 *     title: App
 *     type: object
 *     properties:
 *       app:
 *         type: string
 *       apiVersion:
 *         type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API version
 *     description: App version
 *     produces:
 *       - application/json
 *     tags:
 *       - Base
 *     responses:
 *       200:
 *         description: Application and API version
 *         schema:
 *           title: Users
 *           type: object
 *           $ref: '#/definitions/App'
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});
router.use('/todos', authMiddleWare.authenicate, todosController);
router.use('/login', loginController);
router.use('/logout', logoutController);
router.use('/refresh', refreshTokenController);
router.use('/signup', signupController);
router.use('/users', usersController);
router.use('/categories', categoriesController);
export default router;
