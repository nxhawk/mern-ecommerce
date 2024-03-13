const express = require('express');
const router = express.Router();
const uploadCtrl = require('../controllers/uploadCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage');

router.post('/',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadCtrl.uploadImages)


router.delete('/delete-img/:id', authMiddleware, isAdmin, uploadCtrl.deleteImages)


module.exports = router

module.exports = router;