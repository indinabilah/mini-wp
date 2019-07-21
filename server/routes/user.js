const router = require('express').Router()
const user = require('../controllers/user')
const {authentication} = require('../middlewares/auth')

//register
router.post('/', user.create)
//get all
router.get('/', user.findAll)
//login
router.post('/login', user.login)
//loginGoogle
router.post('/login/google', user.loginGoogle)
//get user data
router.get('/userdata', authentication, (req, res, next) => {
    res.status(200).json({
        user: req.decoded
    })
})

module.exports = router