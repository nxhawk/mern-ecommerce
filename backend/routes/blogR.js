const express = require('express');
const router = express.Router();
const blogCtrl = require('../controllers/blogCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, isAdmin, blogCtrl.createBlog)
router.put('/likes', authMiddleware, blogCtrl.likeBlog)
router.put('/dislikes', authMiddleware, blogCtrl.dislikeBlog)

router.put('/:id', authMiddleware, isAdmin, blogCtrl.updateBlog)
router.get('/:id', blogCtrl.getBlog)
router.get('/', blogCtrl.getAllBlogs)
router.delete('/:id', authMiddleware, isAdmin, blogCtrl.deleteBlog)

module.exports = router;