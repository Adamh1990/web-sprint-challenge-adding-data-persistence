// build your `Task` model here
const db = require('../../data/dbConfig')

const get = () => {
    return db('tasks')
}

const insert = (data) => {
    return db("tasks").insert(data).then(ids => ids[0])
} 

module.exports = {
    get,
    insert,
}