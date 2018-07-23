import { Router } from "express";

import * as todoService from "../services/todoService";
import HttpStatus from "http-status-codes";
import { findTodo, todoValidator } from "../validators/todoValidator";
import Todo from "../models/todo";
import { getCategorty } from "../services/categoryService";

const router = Router();

/**k
 * GET /api/todos
 */
router.get("/", (req, res, next) => {
  if (req.query.title) {
    let page = 1;
    let pageSize = 10;
    if (req.query.page) {
      page = parseInt(req.query.page);

      if (req.query.limit) {
        pageSize = parseInt(req.query.limit);
      }
    }
    let total = Todo.query(q => {
      q.where("user_id", "=", req.user.attributes.id).where(
        "title",
        "LIKE",
        "%" + req.query.title + "%"
      );
    }).count();

    todoService
      .filterByTitle(req.query.title, req.user.attributes.id, page, pageSize)
      .then(data =>
        res.json({
          data: data,
          total: total
        })
      )
      .catch(err => next(err));
  } else {
    let total = Todo.query(q => {
      q.where("user_id", "=", req.user.attributes.id);
    }).count();

    if (req.query.page) {
      let page = parseInt(req.query.page);
      let pageSize = 10;
      if (req.query.limit) {
        pageSize = parseInt(req.query.limit);
      }

      todoService
        .pagenation(page, pageSize, req.user.attributes.id)
        .then(data =>
          res.json({
            data: data,
            total: total
          })
        )
        .catch(err =>
          res.json({
            err
          })
        );
    } else {
      let total = Todo.query(q => {
        q.where("user_id", "=", req.user.attributes.id);
      }).count();

      todoService
        .getTodo(req.user.attributes.id)
        .then(data =>
          res.json({
            data: data,
            total: total
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
