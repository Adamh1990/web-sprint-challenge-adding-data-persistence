
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('project').insert([
        {id: 1, name: 'first project', description:'test 1', completed: false},
        {id: 2, name: 'second project', description:'test 2', completed: false},
        {id: 3, name: 'third project', description:'test 3', completed: false},
        {id: 4, name: 'fourth project', description:'test 4', completed: false}
      ]);
    });
};
