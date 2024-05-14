const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res, next) => {
  const keyword = req.query.search?.trim()
  const sorting = req.query.sorting
  let order

  switch(sorting){
    case "descending":
      order = [['name', 'DESC']]
      break
    case "category":
      order = [['category', 'ASC']]
      break
    case "area":
      order = [['location', 'ASC']]
      break
    default:
      order = [['name', 'ASC']]
  }

  return Restaurant.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    order: order,
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurants = keyword
        ? restaurants.filter((rest) =>
          Object.values(rest).some((property) => {
            if (typeof property === 'string') {
              return property.toLowerCase().includes(keyword.toLowerCase())
            }
            return false
          })
        )
        : restaurants
      res.render('index', { restaurants: matchedRestaurants, keyword, sorting})
    })
    .catch((error) => {
            error.errorMessage = '資料取得失敗'
            next(error)
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})


router.get('/:id', (req, res, next) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurantid) => {
      if(!restaurantid){
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      res.render('detail', { restaurantid })
    })
    .catch((error) =>{
      error.errorMessage = '資料取得失敗'
      next(error)
    })
})



router.post('/', (req, res, next) => {
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
    .then(() => {
      req.flash('success', '新增成功!')
      return res.redirect('/restaurants')
    })
    .catch((error) => {
    error.errorMessage = '新增失敗!'
    next(error)
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurantid) => res.render('edit', { restaurantid }))
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

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
  }, { where: { id } })
    .then(() => {
      req.flash('success', '修改成功!')
      res.redirect(`/restaurants/${id}`)
    })
    .catch((error) => {
      error.errorMessage = '修改失敗!'
      next(error)
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id } })
    .then(() => {
      req.flash('success', '刪除成功')
      res.redirect('/restaurants')
    })
    .catch((error) => {
      error.errorMessage = '刪取失敗!'
      next(error)
    })
})

module.exports = router
