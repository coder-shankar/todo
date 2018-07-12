import bookshelf from '../db';

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
}

export default Category;
