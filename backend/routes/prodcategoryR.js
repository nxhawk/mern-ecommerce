const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/prodcategoryCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, isAdmin, categoryCtrl.createCategory)
router.put('/:id', authMiddleware, isAdmin, categoryCtrl.updateCategory)
router.delete('/:id', authMiddleware, isAdmin, categoryCtrl.deleteCategory);
router.get('/:id', categoryCtrl.getCategory);
router.get('/', categoryCtrl.getallCategory);

module.exports = router;