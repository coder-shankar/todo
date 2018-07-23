import { Router } from "express";
import * as categoryService from "../services/categoryService";
import HttpStatus from "http-status-codes";

const router = Router();

/**
 * GET /api/category
 */
router.get("/", (req, res, next) => {
  categoryService
    .getAllCategories()
    .then(data =>
      res.json({
        data
      })
    )
    .catch(err => next(err));
});

/**
 * GET /api/categoriess/:id
 */

router.get("/:id", (req, res, next) => {
  categoryService
    .getCategorty(req.params.id)
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
router.post("/", (req, res, next) => {
  categoryService
    .createCategory(req.body)
    .then(data =>
      res.status(HttpStatus.CREATED).json({
        data
      })
    )
    .catch(err => next(err));
});

/**
 * PUT /api/category/:id
 */
router.put("/:id", (req, res, next) => {
  categoryService
    .updateCategory(req.params.id, req.body)
    .then(data =>
      res.json({
        data
      })
    )
    .catch(err => next(err));
});

/**
 * DELETE /api/categories/:id
 */
router.delete("/:id", (req, res, next) => {
  categoryService
    .deleteCategory(req.params.id)
    .then(data =>
      res.status(HttpStatus.NO_CONTENT).json({
        data
      })
    )
    .catch(err => next(err));
});

export default router;
