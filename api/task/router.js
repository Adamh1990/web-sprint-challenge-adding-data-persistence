// build your `/api/tasks` router here
const express = require('express')
const router = express.Router()

const Tasks = require('./model')

router.get('/', (req, res) => {
  Tasks.find()
      .then(tasks => {
          res.json(tasks)
      })
})

router.get('/:projectId/tasks', (req, res, next) => {
    Tasks.find(req.params.projectId)
    .then(tasks => res.status(200).json(tasks))
    .catch(err => next(err))
  })
  
  // intermediary table so task id restarts per project?
  router.get('/:projectId/tasks/:id', (req, res, next) => {
    Tasks.findById(req.params.projectId, req.params.id)
    .then(task => res.status(200).json(task))
    .catch(err => next(err))
  })
  
  router.post('/', (req, res, next) => {
    Tasks.add(req.body)
        .then(task => res.status(200).json(task))
        .catch(err => next(err))
        }
)

module.exports = router