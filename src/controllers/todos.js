import {
  Router
} from 'express';

import * as todoService from '../services/todoService';
import HttpStatus from 'http-status-codes';
import {
  findTodo,
  todoValidator
} from '../validators/todoValidator';


const router = Router();


/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => {

  if (req.query.title) {


    todoService
      .filterByTitle(req.query.title)
      .then(data => res.json({
        data
      }))
      .catch(err => next(err));
  } else {
    todoService
      .getAllTodos()
      .then(data => res.json({
        data
      }))
      .catch(err => next(err));
  }



});


/**
 * get id 
 */

router.get('/:id', (req, res, next) => {
  todoService
    .getTodo(req.params.id)
    .then(data => res.json({
      data
    }))
    .catch(err => next(err));


});






/**
 * post
 */
router.post('/', (req, res, next) => {
  todoService
    .createTodo(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({
      data
    }))
    .catch(err => next(err));
});



/**
 * PUT /api/todos/:id
 */
router.put('/:id', findTodo, todoValidator, (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json({
      data
    }))
    .catch(err => next(err));
});



/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({
      data
    }))
    .catch(err => next(err));
});





export default router;
