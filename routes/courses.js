const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
  res.render('catalog', {
    title: 'Каталог'
  })
})

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const course = await Course.findById(req.params.id)

  res.render('course-edit', {
    title: `Редактировать ${course.title}`,
    course
  })
})

router.post('/edit', auth, async (req, res) => {
  const { id } = req.body
  delete req.body.id
  await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/catalog')
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id })
    res.redirect('/catalog')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:categoryname', async (req, res) => {

  const courses = await Course.find({ category: req.params.categoryname })
    .populate('userId', 'email name')
    .select('price title img img2 img3 mainDesc category')
 //   let courses2 = await courses.find(element => element.category == req.params.category);

  res.render('courses', {
    title: req.params.categoryname,
    isCourses: true,
    courses
  })
})

router.get('/:category/:id', async (req, res) => {

  const course = await Course.findById(req.params.id)
  const sizeArr = await course.sizes.split("/")
  res.render('course', {
    layout: 'empty',
    title: `${course.title}`,
    course,
    sizeArr
  })
})

module.exports = router