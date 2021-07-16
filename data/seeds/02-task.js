
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {id: 1, project_id: 1, description: 'first task desc for first project', notes: 'porp', completed: false},
        {id: 2, project_id: 3, description: 'another project task', notes: 'plurp', completed: false},
        {id: 3, project_id: 3, description: 'last task for third project', notes: 'paropidypoop', completed: false}
      ]);
    });
};
