const { Router } = require('express')
const Item = require('../models/item')
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

  const item = await Item.findById(req.params.id)


  res.render('item-edit', {
    title: `Редактировать ${item.title}`,
    item
  })
})

router.post('/edit', auth, async (req, res) => {
  const { id } = req.body
  delete req.body.id

  await Item.findByIdAndUpdate(id, req.body)
  res.redirect('/catalog')
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.body.id })
    res.redirect('/catalog')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:categoryname', async (req, res) => {

  const items = await Item.find({ category: req.params.categoryname })
    .populate('userId', 'email name')
    .select('price title img img2 img3 mainDesc category sizes')

  res.render('items', {
    title: req.params.categoryname,
    isItems: true,
    items
  })
})

router.get('/:category/:id', async (req, res) => {
 const item = await Item.findById(req.params.id)
  const sizeArr = await item.sizes.split("/")
  res.render('item', {
    layout: 'empty',
    title: `${item.title}`,
    item,
    sizeArr
  })
})

module.exports = router