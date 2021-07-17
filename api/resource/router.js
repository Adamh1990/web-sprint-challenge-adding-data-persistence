// build your `/api/resources` router here
const express = require('express')
const router = express.Router()

const Resources = require('./model')

router.get('/', (req, res, next) => {
    Resources.find()
    .then(resources => res.status(200).json(resources))
    .catch(err => next(err))
  })
  
  router.get('/:id', (req, res, next) => {
    Resources.findById(req.params.id)
    .then(resource => res.status(200).json(resource))
    .catch(err => next(err))
  })

  router.post('/', (req, res, next) => {
    Resources.add(req.body)
        .then(resource => res.status(200).json(resource))
        .catch(err => next(err))
        }
)

module.exports = router