const {Router} = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', auth, async (req, res) => {
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    img2: req.body.img2,
    img3: req.body.img3,
    color: req.body.color,
    mainDesc: req.body.mainDesc,
    desc: req.body.mainDesc,
    property: req.body.property,
    sizes: req.body.sizes,
    category: req.body.category,
    inStock: req.body.inStock,
    userId: req.user
  })

  try {
    await course.save()
    res.redirect('/catalog')
  } catch (e) {
    console.log(e)
  }
})


module.exports = router