const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/UserCtrl');
const paymentCtrl = require('../controllers/paymentCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', userCtrl.createUser);
router.post('/forgot-password-token', userCtrl.forgotPasswordToken);
router.put('/reset-password/:token', userCtrl.resetPassword);

router.put('/password', authMiddleware, userCtrl.updatePassword);
router.post('/login', userCtrl.loginUserCtrl);
router.post('/admin-login', userCtrl.loginAdmin);
router.post('/cart', authMiddleware, userCtrl.userCart);

router.post('/order/checkout', authMiddleware, paymentCtrl.checkout);
router.post('/order/paymentVerification', authMiddleware, paymentCtrl.paymentVerification);


router.post('/cart/applycoupon', authMiddleware, userCtrl.applyCoupon);
router.post('/cart/create-order', authMiddleware, userCtrl.createOrder);
router.post('/cart/cash-order', authMiddleware, userCtrl.createOrder);

router.get('/all-users', userCtrl.getallUser);
router.get('/getmyorders', authMiddleware, userCtrl.getMyOrders);
router.get('/getallorders', authMiddleware, userCtrl.getAllOrders);
router.get("/refresh", userCtrl.handleRefreshToken);
router.get("/logout", userCtrl.logout);
router.get('/wishlist', authMiddleware, userCtrl.getWishlist);
router.get('/cart', authMiddleware, userCtrl.getUserCart);

router.get('/:id', authMiddleware, isAdmin, userCtrl.getaUser);

router.delete("/empty-cart", authMiddleware, userCtrl.emptyCart);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, userCtrl.removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, userCtrl.updateProductQuantityFromCart);

router.delete("/:id", userCtrl.deleteaUser);
router.put("/edit-user", authMiddleware, userCtrl.updateaUser);
router.put("/save-address", authMiddleware, userCtrl.saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, userCtrl.blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, userCtrl.unblockUser);
router.put('/order/update-order/:id', authMiddleware, isAdmin, userCtrl.updateOrderStatus);

module.exports = router;