const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, isAdmin, productCtrl.createProduct)

router.get('/:id', productCtrl.getaProduct)
router.put('/wishlist', authMiddleware, productCtrl.addToWishList)
router.put('/rating', authMiddleware, productCtrl.rating)

router.put('/:id', authMiddleware, isAdmin, productCtrl.updateProduct)
router.delete('/:id', authMiddleware, isAdmin, productCtrl.deleteProduct)

router.get('/', productCtrl.getallProduct)

module.exports = router