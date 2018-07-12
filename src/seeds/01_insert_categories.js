/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('categories')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('categories').insert([{
            name: 'Office Work',
            updated_at: new Date()
          },
          {
            name: 'Home Work',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
