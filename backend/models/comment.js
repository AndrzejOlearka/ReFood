const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true,
    },
    parent_comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment