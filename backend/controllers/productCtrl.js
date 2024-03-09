const productM = require('../models/productM');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const validateMongoDbId = require('../utils/validateMongodbId');

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await productM.create(req.body);
    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
})

const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await productM.findByIdAndUpdate(id,
      req.body
      , {
        new: true,
      });
    res.json(updateProduct);
  } catch (err) {
    throw new Error(err);
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteProduct = await productM.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await productM.findById(id);
    res.json(findProduct)
  } catch (err) {
    throw new Error(err);
  }
});

const getallProduct = asyncHandler(async (req, res, next) => {
  try {
    const getAllProduct = await productM.find();
    res.json(getAllProduct)
  } catch (err) {
    throw new Error(err);
  }
});



module.exports = {
  createProduct,
  getaProduct,
  getallProduct,
  updateProduct,
  deleteProduct,
}