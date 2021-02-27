const Recipe = require("../models/recipe")
const Rate = require("../models/rate")
const mongoose = require('mongoose')

exports.addRecipe = async (req, res) => {
    
    try{

        let { name, region, ingridients, user } = req.body;

        if(
            !name ||
            !region ||
            !ingridients
        )
            return res.status(400).json({msg: 'Not all fields have been filled.'})

        if(ingridients.length < 1)
            return res.status(400).json({msg: 'You did not provided any ingridients.'})

        if(!user)
            return res.status(400).json({msg: 'No user assigned to this recipe.'})


        const newRecipe = new Recipe({
            name, region, ingridients, user 
        })

        const addedRecipe = await newRecipe.save();
        res.json(addedRecipe);

    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }
}

exports.allRecipes = async (req, res) => {
    
    try{

        let user = req.params.user

        let recipes = await (async function() {
            return await Recipe.find({user: user})
                .populate('rate')
                .exec()
        })()
        
        let userRates = new Object;
        
        for (let recipe of recipes) {  
            let rateAverage  = await (async function() { 
                return await Rate.aggregate([
                    { $match: { recipe: mongoose.Types.ObjectId(recipe._id) } },
                    { $group: {
                        _id: '$recipe',
                        avgRate: { $avg: '$rate'}
                    }}
                ])
            })()

            let rate = 0;

            if(Object.keys(rateAverage).length !== 0){
                rate = rateAverage[0].avgRate
            }
            userRates[recipe._id] = rate.toFixed(2)
        } 
        return res.json({recipes, userRates});

    } catch(err)
    {
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}

exports.allRates = async (req, res) => {
    
    try{

        let user = req.params.user

        let rates = await (async function() {
            return await Rate.find({user: user})
                .populate('recipe')
                .exec()
        })()
        
        return res.json(rates);

    } catch(err)
    {
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}


