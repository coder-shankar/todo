/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('todos').insert([{
            title: 'learn node js',
            updated_at: new Date(),
            description: 'node js is powerfull javascript framework',
            user_id: 29
          },
          {
            title: 'learn react js',
            updated_at: new Date(),
            description: 'react js is powerfull javascript framework',
            user_id: 30
          }
        ])
      ]);
    });
}
