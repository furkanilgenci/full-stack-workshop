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

module.exports = router
