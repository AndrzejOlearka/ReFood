const Rate = require("../models/rate");
const Recipe = require("../models/recipe")
const Comment = require("../models/comment")
const mongoose = require('mongoose')


exports.getRegionRandom = async (req, res) => {
    /**
     *     
     * let region = req.originalUrl
    region = region.replace(/^\//g, '')
    region = region.split("/")[0]
     */


    try{

        let recipes = await Recipe.aggregate([
            {$match: {'region': 'europe'}},
            {$sample: {size: 6}},
            { $lookup: {from: 'users', localField: 'user', foreignField: '_id', as: 'user'} }
        ]);
        
        let rates = [];

        for (let recipe of recipes) {   
            let rateAverage = await (async function() { 
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
            rates.push(rate)
        }

        res.json({recipes, rates});

    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }
}

exports.getRecipe = async (req, res) => {

    try{
        let id = req.params.id;     
        let rateAverage = await getRateAverage(id);
        rateAverage = rateAverage[0].avgRate
        await Recipe.findOne({_id: id})
            .populate('user')
            .exec(function (err, rec) {
                if (err) return handleError(err);
                res.json({rec, rateAverage});
            });
  
           
    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }
}

exports.rateRecipe = async (req, res) => {

    let { rate, userid } = req.body;
    let recipe = req.params.id;

    try{
       
        if(
            !recipe ||
            !rate ||
            !userid
        )
            return res.status(400).json({msg: 'Cannot rate this recipe.'})

        const newRate = new Rate({
            recipe, user:userid, rate 
        })

        const addedRate = await newRate.save();
        res.json(addedRate);
    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }
}

exports.getRate = async (req, res) => {

    let user = req.query.user;
    let recipe = req.params.id;
    try{
       
        const rate = await Rate.findOne({recipe: recipe, user: user})

        res.json(rate);
    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }
}

exports.getComments = async (req, res) => {

    try{
        let id = req.params.id;     

        let comments = await (async function() {
            return await Comment.find({recipe: id})
                .populate('user')
                .exec()
        })()

        let userRates = new Object;
        
        for (let comment of comments) {  
            let rate = await Rate.findOne({recipe: comment.recipe, user: comment.user})
            userRates[comment.user._id] = rate.rate
        } 
        return res.json({comments, userRates});
           
    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }
}

exports.addComment = async (req, res) => {

    let { comment, parent_comment, user } = req.body
    let recipe = req.params.id

    try{
       
        if(
            !recipe ||
            !comment ||
            !user 
        )
            return res.status(400).json({msg: 'Cannot save this comment.'})

        const newComment = new Comment({
            recipe:recipe, user:user, comment:comment, parent_comment:parent_comment
        })

        const addedComment = await newComment.save();
        res.json(addedComment);
    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }
}

async function getRateAverage (recipe_id) {

    try{
        return await Rate.aggregate([
            { $match: { recipe: mongoose.Types.ObjectId(recipe_id) } },
            { $group: {
                _id: '$recipe',
                avgRate: { $avg: '$rate'}
            }}
        ])
    } catch(err)
    {
        console.log(err)
    }
}
