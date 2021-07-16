// build your `/api/tasks` router here
const express = require('express')
const router = express.Router()

const Tasks = require('./model')

router.post('/', (req, res) => {
    Tasks.insert(req.body)
        .then(task => {
            res.json(task)
        })
})

router.get('/', (req, res) => {
    Tasks.get()
        .then(tasks => {
            res.json(tasks)
        })
})
module.exports = router