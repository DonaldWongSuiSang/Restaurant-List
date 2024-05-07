const express = require('express')
const router = express.Router()

const restaurant = require('./restaurant')

router.use('/restaurants', restaurant)

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.get('/new', (req, res) => {
  res.send('create new restaurant')
})


module.exports = router
