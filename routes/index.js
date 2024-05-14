const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

const restaurants = require('./restaurant')
const users = require('./user')

const db = require('../models')
const authHandler = require('../middlewares/auth-handler')
const Users = db.User


router.use('/restaurants', authHandler,restaurants)
router.use('/users', users)

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.get('/login', (req, res) => {
    return res.render('login')    
})

router.post('/login', passport.authenticate('local', {
	successRedirect: '/restaurants',
	failureRedirect: '/login',
	failureFlash: true
}))

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
	successRedirect: '/restaurants',
	failureRedirect: '/login',
	failureFlash: true
}))

router.post('/logout', (req, res, next) =>{
  req.logout((error) =>{
    if(error){
      return next(error)
    }
    return res.redirect('/login')
  })
})

module.exports = router
