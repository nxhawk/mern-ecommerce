const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/UserCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', userCtrl.createUser);
router.post('/login', userCtrl.loginUserCtrl);
router.get('/all-users', userCtrl.getallUser);
router.get("/refresh", userCtrl.handleRefreshToken);
router.get("/logout", userCtrl.logout);
router.get('/:id', authMiddleware, isAdmin, userCtrl.getaUser);
router.delete("/:id", userCtrl.deleteaUser);
router.put("/edit-user", authMiddleware, userCtrl.updateaUser);
router.put("/block-user/:id", authMiddleware, isAdmin, userCtrl.blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, userCtrl.unblockUser);

module.exports = router;