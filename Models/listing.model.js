const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    beds:{
        type:Number,
        required:true
    },
    baths:{
        type:Number,
        required:true
    },
    regPrice:{
        type:Number,
        required:true
    },
    disPrice:{
        type:Number,
        required:true
    },
    sell:{
        type:Boolean,
        required:true
    },
    rent:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    offer:{
        type:Boolean,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    userRef:{
        type:String,
        required:true
    },
    files:{
        type:[Object],
        required:true
    },
    type:{
        type:String,
        required:true
    }

},{timestamps:true})


const Model = mongoose.model('Listing',ListingSchema)

module.exports = Model