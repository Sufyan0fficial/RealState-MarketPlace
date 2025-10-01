const fs = require('fs')
const path = require('path')
const ListingModel  = require('../Models/listing.model')

const uploadsCleanup = async()=>{
    const uploadsDir = path.join(__dirname,'../uploads')
    const uploadsFiles = fs.readdirSync(uploadsDir)

    const listedImages = await ListingModel.find({},'images')

    const refinedListedImages = listedImages.flatMap((imageObj)=>{
        return imageObj?.images
    })

    const unNecessaryImages = uploadsFiles?.filter((img)=>{
        return !refinedListedImages.includes(img)
    })

    unNecessaryImages.forEach((image)=>{
        const filePath = path.join(uploadsDir,image)
        fs.unlink(filePath,(err)=>{
            return console.error('failed to run cleanup function')
        })
    })

}

module.exports = uploadsCleanup