const router = require('express').Router()
const article = require('../controllers/article')
// const { authentication, authorization } = require('../middlewares/auth')

// router.use(authentication)
router.post('/', article.create)
router.get('/', article.findAll)
// router.get('/id/:id', article.findById)
// router.get('/user', article.findAllById)
router.get('/:id', article.findOne)
// router.get('/status/:status', article.sortBystatus)

// authorization
router.patch('/:id', article.edit)
router.delete('/:id', article.delete)


module.exports = router