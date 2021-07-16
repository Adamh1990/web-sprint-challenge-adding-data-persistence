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

router.get('/:projectId/tasks', checkForProject(), (req, res, next) => {
    Tasks.find(req.params.projectId)
    .then(tasks => res.status(200).json(tasks))
    .catch(err => next(err))
  })
  
  // intermediary table so task id restarts per project?
  router.get('/:projectId/tasks/:id', checkForProject(), checkForTask(), (req, res, next) => {
    Tasks.findById(req.params.projectId, req.params.id)
    .then(task => res.status(200).json(task))
    .catch(err => next(err))
  })
  
  router.post('/tasks', checkForProject(), validateTaskDataReqs(), (req, res, next) => {
    Tasks.add(req.body)
    .then(() => {
      res.status(201).json({message: 'task created'})
    })
    .catch(err => next(err))
  })
  
  router.put('/:projectId/tasks/:id', checkForProject(), checkForTask(), validateTaskDataReqs(), (req, res, next) => {
    Tasks.update(req.params.projectId, req.params.id, req.body)
    .then(() => {
      res.status(200).json({message: 'task updated successfully'})
    })
    .catch(err => next(err))
  })
  
  router.delete('/:projectId/tasks/:id', checkForProject(), checkForTask(), (req, res, next) => {
    Tasks.remove(req.params.projectId, req.params.id)
    .then(() => {
      res.status(200).json({message: 'project deleted'})
    })
    .catch(err => next(err))
  })
  
  function validateTaskDataReqs() {
    return (req, res, next) => {
      if(!req.body.project_id || !req.body.description) {
        res.status(400).json({error: 'project id and description are required fields'})
      }
      else {
        next()
      }
    }
  }
  
  function checkForProject() {
    return (req, res, next) => {
      const requestedProject = Tasks.findById(req.params.id)
  
      if (requestedProject) {
        next()
      }
      else{
        res.status(404).json({error: 'referenced project not found'})
      }
    }
  }
  
  function checkForTask() {
    return (req, res, next) => {
      const requestedTask = Tasks.findById(req.params.projectId, req.params.id)
  
      if (requestedTask) {
        next()
      }
      else{
        res.status(404).json({error: 'referenced task not found'})
      }
    }
  }
module.exports = router