import Boom from 'boom';
import Todo from '../models/todo';
import Category from '../models/category';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllTodos(query) {
  if (query.sort) {

    return new Todo({

    }).orderBy('title', query.sort).fetchAll();
  } else {
    return Todo.fetchAll();
  }
}

/**
 * Get a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(id) {
  return new Todo({
    id
  }).fetch().then(todo => {
    if (!todo) {
      throw new Boom.notFound('Todo not found');
    }

    return todo;
  });
}

/**
 * Create new todo.
 *
 * @param  {Object}  todo
 * @return {Promise}
 */
export function createTodo(todo) {
  return new Todo({
    title: todo.title,
    description: todo.description,
    user_id: todo.user_id
  }).save().then(todo => todo.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         todo
 * @return {Promise}
 */
export function updateTodo(id, todo) {

  return new Todo({
    id
  }).save({
    title: todo.title
  }).then(title => title.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new Todo({
    id
  }).fetch().then(todo => todo.destroy());
}


export function filterByTitle(title, id) {

  return Todo.query((qb) => {

    qb.where('title', 'LIKE', title, 'AND', 'user_id', '=', id);
  }).fetchAll();

}

export function getTodoCategory(name) {
  return Category.forge({
    name: name
  })
    .fetch({
      withRelated: 'category'
    })
    .then(category => {
      if (!category) {
        throw new Boom.notFound('item not found');
      }
      return category;
    })
}
