const router = require ('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
// const db = require('../../config/mongodb');
const productController = require ('./controller');


// router.get('/product', (req, res) => {
//     db.collection('products').find()
//         .toArray()
//         .then(result => res.send(result))
//         .catch(error => res.send(error));
// });

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.get('/product', upload.single('image'), productController.store);

module.exports = router;