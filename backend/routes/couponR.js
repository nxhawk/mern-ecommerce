const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const couponCtrl = require('../controllers/couponCtrl');

router.post('/', authMiddleware, isAdmin, couponCtrl.createCoupon);
router.get("/", authMiddleware, isAdmin, couponCtrl.getAllCoupons);
router.get("/:id", authMiddleware, isAdmin, couponCtrl.getCoupon);
router.put("/:id", authMiddleware, isAdmin, couponCtrl.updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, couponCtrl.deleteCoupon);

module.exports = router;