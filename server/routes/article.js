const router = require('express').Router()
const article = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', article.findAll)
router.use(authentication)
router.post('/', article.create)
router.get('/:id', article.articleByUser)
router.get('/up/:id', article.findOne)

// authorization
router.patch('/:id', article.edit)
router.delete('/:id', article.delete)


module.exports = router