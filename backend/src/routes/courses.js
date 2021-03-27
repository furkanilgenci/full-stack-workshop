const express = require('express')
const Course = require('../models/course')

const router = express.Router()

router.get('/', async (req, res) => {
  const courses = await Course.find()

  res.send(courses)
})

router.post('/', async (req, res) => {
  const course = await Course.create(req.body)

  res.status(201).send(course)
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (!course) return res.sendStatus(404)

  res.send(course)
})

module.exports = router
