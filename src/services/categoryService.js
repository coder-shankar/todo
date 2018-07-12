import Boom from 'boom';
import Category from '../models/category';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllCategories() {
  return Category.fetchAll();
}

/**
 * Get a category
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getCategorty(id) {
  return new Category({
    id
  }).fetch().then(category => {
    if (!category) {
      throw new Boom.notFound('Category not found');
    }

    return category;
  });
}

/**
 * Create new category.
 *
 * @param  {Object}  category
 * @return {Promise}
 */
export function createCategory(category) {
  return new Category({
    name: category.name
  }).save().then(category => category.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         category
 * @return {Promise}
 */
export function updateCategory(id, category) {

  return new Category({
    id
  }).save({
    name: category.name
  }).then(name => name.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteCategory(id) {
  return new Category({
    id
  }).fetch().then(category => category.destroy());
}
