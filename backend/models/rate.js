const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rate: {
        type: Number,
        required: true,
    }
})

const Rate = mongoose.model('Rate', rateSchema)

module.exports = Rate