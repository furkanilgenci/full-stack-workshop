const express = require('express')
const User = require('../models/user')
const Course = require('../models/course')

const router = express.Router()

router.get('/', async (req, res) => {
  const user = await User.find()

  res.send(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)

  res.status(201).send(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  res.send(user)
})

router.post('/:id/attended-courses', async (req, res) => {
  const user = await User.findById(req.params.id)

  // eslint-disable-next-line no-underscore-dangle
  const course = await Course.findById(req.body._id)

  await user.attendToCourse(course)

  res.sendStatus(200)
})

module.exports = router
