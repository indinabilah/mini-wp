const {Article} = require('../models/index')

class ArticleController{
    static create(req, res, next){
        const {title, subtitle, description, image} = req.body
        // const UserId = req.decoded.id  belom masih article an
        const newData = {title, subtitle, description, image}
        Article.create(newData)
        .then(response => {
            res.status(201).json({
                message: 'success create!',
                data: response
            })
        })
        .catch(next)
    }
    static findAll(req, res, next){
        Article.find()
        .then(response => {
            res.status(201).json({
                message: 'success get all article!',
                data: response
            })
        })
        .catch(next)
    }
    static findOne(req, res, next){
        const id = req.params.id
        Article.findById({_id: id})
        .then(response => {
            res.status(201).json({
                message: 'success find by id',
                data: response
            })
        })
        .catch(next)
    }
    static delete(req, res, next){
        const id = req.params.id
        Article.findByIdAndDelete({_id: id})
        .then(response => {
            console.log(response)
            res.status(200).json({
                message: 'deleted',
                data: response
            })
        })
        .catch(next)
    }
    static edit(req, res, next){
        const id = req.params.id
        const upData = req.body
        console.log(upData, 'masuk sini ngga?')
        Article.findByIdAndUpdate(id, upData, {new: true})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(next)
    }
}


module.exports = ArticleController