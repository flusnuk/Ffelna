const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'FFLENA',
    isHome: true
  })
})


module.exports = router