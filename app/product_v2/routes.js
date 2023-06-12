const router = require ('express').Router;
const Product = require('./model');
const multer = require ('multer');
const path = require ('path');
const fs = require ('fs');
const upload = require({dest: 'upload}'});


router.post('./product', async (req, res) => {
    const {user_id, name, price, stock, status} = req.body;
    const image = req.files;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        FileSystem.renameSync(image.path, terget);
    }
    try {
        await Product.sync();
        const result = await Product.create({users_id, name, price, stock, status, image_url: 'http://loaclhost: 3000/public/${image.originalname}'});
        res.send(result);
    }
    catch(e) {
        res.send(e);
    }
});

module.exports = router;