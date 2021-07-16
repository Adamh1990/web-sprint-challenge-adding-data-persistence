
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'camera', description: null},
        {id: 2, name: 'backdrop', description: 'white'},
        {id: 3, name: 'microphone', description: null},
        {id: 4, name: 'lights', description: null}
      ]);
    });
};
