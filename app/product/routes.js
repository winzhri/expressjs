const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const path = require('path');
const productController = require ('./controller')
			
router.get('/product', productController.index);
router.get('/product', productController.view);
router.get('/product/', upload.single('image'), productController.store); 

router.put('/product/:id', upload.single('image'), productController.update);
router.delete('/product/:id', upload.single('image'), productController.destroy);

module.exports = router;