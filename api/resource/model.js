const db = require('../../data/dbConfig')

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('resources')
}

// MIGHT NEED TO BE TWEAKED
function findById(id) {
  return db('resources')
  .where('id', id)
  .first()
}

function add(newResource) {
  return db('resources')
  .insert(newResource)
}

function update(id, newResource) {
  return db('resources')
  .where('id', id)
  .update(newResource)
}

function remove(id) {
  return db('resources')
  .where('id', id)
  .del()
}