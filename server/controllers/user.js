const {User, Todo} = require('../models/index')
const {getToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library')

class UserController{
    static create(req, res, next){
        // console.log('masuk controller error ngga?')
        // console.log(req.body)
        const {username, email, password} = req.body
        const newData = {username, email, password}
        User.create(newData)
        .then(response => {
            // console.log('atau udh masuk sini?')
            res.status(200).json({
                message: 'success create !!', 
                data: response
            })
        })
        .catch(next)
    }
    static findAll(req, res, next){
        User.find()
        .then(response => {
            res.status(200).json({
                message: 'Success Get All data Users',
                data: response
            })
        })
        .catch(next)
    }
    static login(req, res, next){
        // email & password => jwt
        console.log('masuk diiii login user controller 😭')
        const {email, password} = req.body
        User.findOne({email: email})
        .then(data => {
            if(data){
                if(comparePassword(data.password, password)){
                    const forJwt = {
                        id: data._id,
                        email: data.email,
                        username: data.username
                    }
                    const token = getToken(forJwt)
                    res.status(200).json({
                        message: 'Valid',
                        data: {
                            id: data._id,
                            name: data.username,
                            email: data.email
                        },
                        jwt: token
                    })
                }else{
                    next({
                        status: 400,
                        message: 'Username/Password Invalid'
                    })
                }
            }else{
                next({
                    status: 400,
                    message: 'Username/Password Invalid'
                })
            }
            // dataFind di client return Todo.findOne({UserId: ObjectID(data._id)})
            console.log(data)
        })
        .catch(next)
    }
    static loginGoogle(req, res, next){
        User.findOne({
            email:  req.body.email
        })
        .then((data) => {
            if (data) {
                if(comparePassword(data.password, req.body.password)){
                    const forJwt = {
                        id: data._id,
                        email: data.email,
                        username: data.username
                    }
                    const token = getToken(forJwt)
                    res.status(200).json({
                        message: 'Valid',
                        data: {
                            id: data._id,
                            name: data.username,
                            email: data.email
                        },
                        jwt: token
                    })
                }else{
                    next({
                        status: 400,
                        message: 'Username/Password Invalid'
                    })
                }
            } else {
                return User.create({
                    username: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
            }
        })
        .then((data) => {
            const forJwt = {
                id: data._id,
                email: data.email,
                username: data.username
            }
            const token = getToken(forJwt)
            res.status(200).json({
                message: 'Valid',
                data: {
                    id: data._id,
                    name: data.username,
                    email: data.email
                },
                jwt: token
            })
        })
        .catch(next)
    }
}

module.exports = UserController