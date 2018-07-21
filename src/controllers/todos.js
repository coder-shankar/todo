import { Router } from "express";

import * as todoService from "../services/todoService";
import HttpStatus from "http-status-codes";
import { findTodo, todoValidator } from "../validators/todoValidator";
import Todo from "../models/todo";
import { getCategorty } from "../services/categoryService";

const router = Router();

/**
 * GET /api/todos
 */
router.get("/", (req, res, next) => {
  if (req.query.title) {
    console.log(req.user.attributes.id);
    todoService
      .filterByTitle(req.query.title, req.user.attributes.id)
      .then(data =>
        res.json({
          data
        })
      )
      .catch(err => next(err));
  } else {
    if (req.query.page) {
      let page = parseInt(req.query.page);
      let pageSize = 10;
      if (req.query.limit) {
        pageSize = parseInt(req.query.limit);
      }

      return new Todo({})
        .fetchPage({
          pageSize: pageSize,
          page: page,
          userId: req.user.attributes.id
        })
        .then(data =>
          res.json({
            data
          })
        )
        .catch(err =>
          res.json({
            err
          })
        );
    } else {
      todoService
        .getTodo(req.user.attributes.id)
        .then(data =>
          res.json({
            data
          })
        )
        .catch(err => next(err));
    }
  }
});

/**
 * post
 */
router.post("/", (req, res, next) => {
  console.log(req.body);
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
router.put("/", findTodo, todoValidator, (req, res, next) => {
  todoService
    .updateTodo(req.users.attributes.id, req.body)
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
router.delete("/", findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.attributes.id)
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
