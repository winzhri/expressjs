const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
			
router.get('/', (req, res, next) => {
    const { page, total } = req.query;
    res.send({  // bisa html/json
        status: 'Successfully',
        message: 'Welcome to Express JS Tutorial',
        page,
        total
    });    
});

router.get('/product/:id', (req, res) => {
    console.log(req.query)
    res.json({
        id: req.params.id
    });
});

router.get('/product/', upload.single('image'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(--__dirname, 'uploads', image.originalname);
        fs.renameSync (image.path, target)
        res.json ({
            name,
            price,
            stock,
            status,
            image
        });
    }
});

router.get('/:category/:tag', (req, res) => {
    const {category, tag} = req.params;
    res.json({ category, tag });
});

module.exports = router;