const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res, next) => {
  const keyword = req.query.search?.trim()
  const sorting = req.query.sorting
  const userId = req.user.id
  let order
  switch (sorting) {
    case 'descending':
      order = [['name', 'DESC']]
      break
    case 'category':
      order = [['category', 'ASC']]
      break
    case 'area':
      order = [['location', 'ASC']]
      break
    default:
      order = [['name', 'ASC']]
  }

  return Restaurant.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    where: { userId },
    order,
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
      res.render('index', { restaurants: matchedRestaurants, keyword, sorting })
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗'
      next(error)
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res, next) => {
  const userId = req.user.id
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
    description: newRestaurant.description,
    UserId: userId
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

router.get('/:id', (req, res, next) => {
  const userId = req.user.id
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId'],
    raw: true
  })
    .then((restaurantId) => {
      if (!restaurantId) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      if (restaurantId.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }
      res.render('detail', { restaurantId })
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗'
      next(error)
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId'],
    raw: true
  })
    .then((restaurantId) => {
      if (!restaurantId) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      if (restaurantId.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }
      res.render('edit', { restaurantId })
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗'
      next(error)
    })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const userId = req.user.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'userId'],
    raw: true
  })
    .then((restaurantId) => {
      if (!restaurantId) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      if (restaurantId.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }
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
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'userId'],
    raw: true
  })
    .then((restaurantId) => {
      if (!restaurantId) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      if (restaurantId.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }
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
})

module.exports = router
