import bookshelf from '../db';
import Category from './category';

const TABLE_NAME = 'todos';

/**
 * Todo model.
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;

  }

  // category() {

  //   return this.belongsToMany(Category);
  // }

}

export default Todo;
