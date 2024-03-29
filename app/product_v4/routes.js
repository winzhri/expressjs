// const router = require ('express').Router();
// const multer = require ('multer');
// const upload = multer ({dest: 'uploads'});
// const Product = require ('./model');
// const fs = require ('fs');
// const path = require ('path');


// router.post('/product', upload.single('image'), (res, req) => { 
//     const { name, price, stock, status } = req.body;
//     const image = req.file;
//     if (image) {
//         const target = path.join(__dirname, "../../uploads", image.originalname);
//         fs.renameSync(image.path, target);
//         Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
//             .then(result => res.send(result))
//             .catch(error => res.send(error));      
//     }
// });

// router.get('/product', (req, res) => {
//     Product.find()
//         .then(result => res.send(result))
//         .catch(error => res.send(error));
// })
    
// module.exports = router;

const router = require ("express").Router();
const multer = require ("multer");
const upload = multer ({ dest: "uploads" });
const Product = require ("./model");
const fs = require ("fs");
const path = require ("path");

router.post("/product", upload.single("image"), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
});

router.get("/product", (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

router.put("/product/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
  }

  Product.findByIdAndUpdate(id, { name, price, stock, status, image_url: image ? `http://localhost:3000/public/${image.originalname}` : undefined }, { new: true })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => res.send({ message: "Product deleted successfully" }))
    .catch((error) => res.send(error));
});

module.exports = router;