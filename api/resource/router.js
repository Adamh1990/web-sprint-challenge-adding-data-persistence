// build your `/api/resources` router here
const express = require('express')
const router = express.Router()

const Resources = require('./model')

router.get('/', (req, res, next) => {
    Resources.find()
    .then(resources => res.status(200).json(resources))
    .catch(err => next(err))
  })
  
  router.get('/:id', checkForResource(), (req, res, next) => {
    Resources.findById(req.params.id)
    .then(resource => res.status(200).json(resource))
    .catch(err => next(err))
  })
  
  router.post('/', validateResourceDataReqs(), (req, res, next) => {
    Resources.add(req.body)
    .then(() => {
      res.status(201).json({message: 'resource created'})
    })
    .catch(err => next(err))
  })
  
  router.put('/:id', checkForResource(), validateResourceDataReqs(), (req, res, next) => {
    Resources.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({message: 'resource updated successfully'})
    })
    .catch(err => next(err))
  })
  
  router.delete('/:id', checkForResource(), (req, res, next) => {
    Resources.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: 'resource deleted'})
    })
    .catch(err => next(err))
  })
  
  function validateResourceDataReqs() {
    return (req, res, next) => {
      if(!req.body.name) {
        res.status(400).json({error: 'name is a required field'})
      }
      else { next() }
    }
  }
  
  function checkForResource() {
    return (req, res, next) => {
      const requestedResource = Resources.findById(req.params.id)
  
      if (requestedResource) { next() }
      else {
        res.status(404).json({error: 'referenced resource not found'})
      }
    }
  }
module.exports = router