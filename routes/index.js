const express = require('express')
const router = express.Router()

const passport = require('passport')
const LocalStrategy = require('passport-local')

const restaurants = require('./restaurant')
const users = require('./user')

const db = require('../models')
const authHandler = require('../middlewares/auth-handler')
const Users = db.User

passport.use(new LocalStrategy({usernameField: 'email'}, (username, password, done) => {
return Users.findOne({
  attributes: ['id', 'name', 'email', 'password'],
  where: {email: username},
  raw:true
})
  .then((user) => {
    console.log(user)
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

passport.deserializeUser((user, done) =>{
  done(null, {id: user.id})
})

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

router.post('/logout', (req, res, next) =>{
  req.logout((error) =>{
    if(error){
      return next(error)
    }
    return res.redirect('/login')
  })
})

module.exports = router
