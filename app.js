const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
const methodOverride = require('method-override')

const db = require('./models')
const Restaurant = db.Restaurant

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
const keyword = req.query.search?.trim()

return Restaurant.findAll({
		attributes: ['id', 'name','name_en', 'category','image','location', 'phone','google_map','rating','description'],
		raw: true
	})
  .then((restaurants) => {
    const matchedRestaurants = keyword ? restaurants.filter((rest) => 
    Object.values(rest).some((property) => {
      if (typeof property === 'string')
      {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
    ):restaurants
    res.render('index', {restaurants: matchedRestaurants, keyword})
  })
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
		attributes: ['id', 'name','name_en', 'category','image','location', 'phone','google_map','rating','description'],
		raw: true
	})
  .then((restaurantid) => res.render('detail',{restaurantid}))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
	const newRestaurant = req.body
  return Restaurant.create({    
      name: newRestaurant.name,
      name_en: newRestaurant.name_en,
      category: newRestaurant.category,
      image: newRestaurant.image,
      location: newRestaurant.location,
      phone: newRestaurant.phone,
      google_map: newRestaurant.google_map,
      rating: newRestaurant.rating,
      description: newRestaurant.description
  })
        .then(() => res.redirect('/restaurants'))
        .catch((err) => console.log(err))
})

app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
		attributes: ['id', 'name','name_en', 'category','image','location', 'phone','google_map','rating','description'],
		raw: true
	})
  .then((restaurantid) => res.render('edit',{restaurantid}))
})

app.put('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  console.log(body)
  return Restaurant.update({
      name: body.name,
      name_en: body.name_en,
      category: body.category,
      image: body.image,
      location: body.location,
      phone: body.phone,
      google_map: body.google_map,
      rating: body.rating,
      description: body.description
  }, {where: { id }})
          .then(() => res.redirect(`/restaurant/${id}`))
	})


app.delete('/restaurant/:id', (req, res) => {
  const id = req.params.id
    return Restaurant.destroy({where: {id}})
            .then(() => res.redirect('/restaurants'))
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
