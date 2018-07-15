import bookshelf from '../db';
import Todo from './todo';

const TABLE_NAME = 'categories';

/**
 * Todo model.
 */
class Category extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  category() {
    return this.belongsToMany(Todo);
  }
}

export default Category;
