const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
const keyword = req.query.search?.trim()
const matchedRestaurants = keyword ? restaurants.filter((rest) => 
Object.values(rest).some((property) => {
  if (typeof property === 'string'){
    return property.toLowerCase().includes(keyword.toLowerCase())
  }
  return false
})
):restaurants
  res.render('index', {restaurants: matchedRestaurants, keyword})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((rest) => rest.id.toString() === id)
  res.render('detail', {restaurant})
})