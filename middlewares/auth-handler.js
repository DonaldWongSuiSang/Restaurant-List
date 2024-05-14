module.exports = (req, res, next) =>{
  if(req.isAuthenticated()){
    console.log("next")
    return next()
  }
  console.log("未登入")
  req.flash('error', '尚未登入')
  return res.redirect('/login')
}