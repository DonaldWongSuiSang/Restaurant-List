const express = require('express')
const router = express.Router()


const db = require('../models')
const User = db.User

router.post('/', (req, res, next) =>{
  const {name, email, password, confirmPassword} = req.body

  if(!name || !email || !password || !confirmPassword){
    req.flash('error', '請輸入名字，電郵及密碼!')
    return res.redirect('back')
  }
  if(password !== confirmPassword){
    req.flash('error', '密碼與重覆驗證不符!')
    return res.redirect('back')
  }
  return User.count({where:{email}})
  .then((count) =>{
    if (count >0){
      req.flash('error', 'email已註冊')
      return
    }
    return User.create({name,email, password})
  })
      .then((user) => {
      console.log("user", user)
        if (!user){
          return res.redirect('back')
        }
        req.flash('success', '新增帳號成功!')
        return res.redirect('./login')
    })
    .catch((error) => {
        error.errorMessage = '註冊失敗:(!'
        next(error)
        })
})

module.exports = router 

