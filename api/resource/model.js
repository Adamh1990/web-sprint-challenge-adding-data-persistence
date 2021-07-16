// build your `Resource` model here
const db = require('../../data/dbConfig')

const get = () => {
    return db('resources')
}

const insert = (data) => {
    return db("resources").insert(data).then(ids => ids[0])
} 

module.exports = {
    get,
    insert,
}