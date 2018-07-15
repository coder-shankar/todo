/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([{
            name: 'Saugat Acharya',
            email: 'saugat@gmail.com',
            password: '$2a$04$tcyTa1kxS8dBLk.fu44Guuwdd1/hAHMOZLaeldOeoD4LggVrr/tV6',
            updated_at: new Date()
          },
          {
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '$2a$04$tcyTa1kxS8dBLk.fu44Guuwdd1/hAHMOZLaeldOeoD4LggVrr/tV6',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
