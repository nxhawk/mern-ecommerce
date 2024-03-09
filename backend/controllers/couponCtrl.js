const couponM = require('../models/couponM');
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await couponM.create(req.body);

    res.json(newCoupon);
  } catch (err) {
    throw new Error(err)
  }
})

const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await couponM.find();
    res.json(coupons);
  } catch (err) {
    throw new Error(err);
  }
})

const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatecoupon = await couponM.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (err) {
    throw new Error(err);
  }
})

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletecoupon = await couponM.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (err) {
    throw new Error(err);
  }
})

const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getAcoupon = await couponM.findById(id);
    res.json(getAcoupon);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon
}