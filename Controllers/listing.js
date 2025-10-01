const ListingModel = require("../Models/listing.model");
const asyncWrapper = require("../Middlewares/asyncWrapper");
const path = require("path");
const customErrorHandler = require("../utils/error");

const CreateListing = asyncWrapper(async (req, res, next) => {
  console.log("files are", req.files);
  let files = [];
  if (req.files?.length > 0) {
    files = req.files.map((file) => {
      return file?.filename;
    });
  }

  const createdListing = await ListingModel.create({
    ...req.body,
    images: files,
    files:req.files
  });
  return res.status(200).json({ success: true, data: createdListing });
});

const getListings = asyncWrapper(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customErrorHandler(403, "Forbidden"));
  }
  const listings = await ListingModel.find({ userRef: req.params.id });
  return res.status(200).json({ success: true, data: listings });
});

const deleteListing = asyncWrapper(async (req, res, next) => {
  const response = await ListingModel.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({
      success: true,
      message: "Listing deleted Successfully",
      data: response,
    });
});

const getListing = asyncWrapper(async (req,res,next)=>{
    const listing = await ListingModel.findById(req.params.id)
    if(!listing){
        return next(customErrorHandler(404,'Listing not found'))
    }
    if(req.user.id !== listing.userRef){
        return next(customErrorHandler(403,'Forbidden'))
    }
    return res.status(200).json({success:true,data:listing})
})

const updateListing = asyncWrapper(async (req,res,next)=>{
    console.log('files are')
    const listing = await ListingModel.findById(req.params.id)
    if(!listing){
        return next(customErrorHandler(404, 'Listing not found'))
    }
    if(req.user.id !== listing.userRef){
        return next(customErrorHandler(403, 'Forbidden'))
    }
    let files = []
    if(req.files.length > 0){
        files = req.files.map((file)=>{
            return file?.filename
        })
    }
    const updatedListing = await ListingModel.findByIdAndUpdate(req.params.id,{...req.body,images:files,files:req.files},{new:true})
    return res.status(200).json({success:true,data:updatedListing})
})

module.exports = {
  CreateListing,
  getListings,
  deleteListing,
  getListing,
  updateListing
};
