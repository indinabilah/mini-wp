const moongose = require('mongoose')
const Schema = moongose.Schema

const articleSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title can not be empty']
    },
    subtitle:{
        type: String,
        required: [true, 'Subtitle can not be empty']
    },
    description:{
        type: String,
        required: [true, 'Description can not be empty']
    },
    image:{
        type: String,
        required: [true, 'Image can not be empty, use the address image (temporary)']
    },
    UserId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
}, {timestamps: true})

const Article = moongose.model('Article', articleSchema)
module.exports = Article