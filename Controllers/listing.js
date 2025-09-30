const ListingModel = require("../Models/listing.model");
const asyncWrapper = require("../Middlewares/asyncWrapper");
const path = require("path");

const CreateListing = asyncWrapper(async (req, res, next) => {
    console.log('files are',req.files)
    let files = []
  if (req.files?.length > 0) {
        files = req.files.map((file) => {
      return file?.filename;
    });
  }
  const createdListing = await ListingModel.create({...req.body,images:files});
  return res.status(200).json({ success:true, data:createdListing });
});

module.exports = {
  CreateListing,
};
