const express = require('express')
const router = express.Router()

const passport = require('passport')
const LocalStrategy = require('passport-local')

const restaurants = require('./restaurant')
const users = require('./user')

const db = require('../models')
const Users = db.User

router.use('/restaurants', restaurants)
router.use('/user', users)


passport.use(new LocalStrategy({usernameField: 'email'}, (username, passport, done) => {
return Users.findOne({
  attributes: ['id', 'name', 'email', 'password'],
  where: {email: username},
  raw:true
})
  .then((user) => {
    if(!user || user.password !== password){
      return done(null, false, {message: 'email或密碼錯誤'})
    }
    return done(null, user)
  })
  .catch((error) => {
    error.message = '登入失敗'
    done(error)
  })
}))

passport.serializeUser((user, done) =>{
  const{id, name, email} = user
  return done(null, {id, name, email})
})

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
	successRedirect: '/restaurant',
	failureRedirect: '/login',
	failureFlash: true
}))

module.exports = router
