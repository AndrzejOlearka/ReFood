const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true,
    },
    ingridients: {
        type: Array,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe