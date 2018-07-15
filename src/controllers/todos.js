import {
  Router
} from 'express';

import * as todoService from '../services/todoService';
import HttpStatus from 'http-status-codes';
import {
  findTodo,
  todoValidator
} from '../validators/todoValidator';
import Todo from '../models/todo';
import {
  getCategorty
} from '../services/categoryService';

const router = Router();

/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => {
  todoService
    .getTodo(req.user.attributes.id)
    .then(data =>
      res.json({
        data
      })
    )
    .catch(err => next(err));



  // if (req.query.name) {
  //   todoService
  //     .getTodoCategory(req.query.name)
  //     .then(data =>
  //       res.json({
  //         data
  //       })
  //     )
  //     .catch(err => next(err));
  // } else {
  //   if (req.query.page) {
  //     let page = parseInt(req.query.page);
  //     let pageSize = 10;
  //     if (req.query.limit) {
  //       pageSize = parseInt(req.query.limit);
  //     }

  //     return new Todo({})
  //       .fetchPage({
  //         pageSize: pageSize,
  //         page: page
  //       })
  //       .then(data =>
  //         res.json({
  //           data
  //         })
  //       )
  //       .catch(err =>
  //         res.json({
  //           err
  //         })
  //       );
  //   }

  //   if (req.query.title) {
  //     todoService
  //       .filterByTitle(req.query.title)
  //       .then(data =>
  //         res.json({
  //           data
  //         })
  //       )
  //       .catch(err => next(err));
  //   } else {
  //     todoService
  //       .getAllTodos(req.query)
  //       .then(data =>
  //         res.json({
  //           data
  //         })
  //       )
  //       .catch(err => next(err));
  //   }
  // }
});

/**
 * get id
 */

router.get('/:id', (req, res, next) => {
  todoService
    .getTodo(req.params.id)
    .then(data =>
      res.json({
        data
      })
    )
    .catch(err => next(err));
});

/**
 * post
 */
router.post('/', (req, res, next) => {
  todoService
    .createTodo(req.body)
    .then(data =>
      res.status(HttpStatus.CREATED).json({
        data
      })
    )
    .catch(err => next(err));
});

/**
 * PUT /api/todos/:id
 */
router.put('/:id', findTodo, todoValidator, (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data =>
      res.json({
        data
      })
    )
    .catch(err => next(err));
});

/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.id)
    .then(data =>
      res.status(HttpStatus.NO_CONTENT).json({
        data
      })
    )
    .catch(err => next(err));
});

/**
 * test
 */

export default router;
