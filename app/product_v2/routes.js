// const router = require ('express').Router;
// const Product = require('./model');
// const multer = require ('multer');
// const path = require ('path');
// const fs = require ('fs');
// const upload = require({dest: 'upload}'});


// router.post('./product', async (req, res) => {
//     const {user_id, name, price, stock, status} = req.body;
//     const image = req.files;
//     if(image){
//         const target = path.join(__dirname, '../../uploads', image.originalname);
//         FileSystem.renameSync(image.path, terget);
//     }
//     try {
//         await Product.sync();
//         const result = await Product.create({users_id, name, price, stock, status, image_url: 'http://loaclhost: 3000/public/${image.originalname}'});
//         res.send(result);
//     }
//     catch(e) {
//         res.send(e);
//     }
// });

// module.exports = router;

const router = require("express").Router();
const Product = require("./model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const upload = multer({ dest: "upload}" });

// create a new product
router.post("/product", upload.single("image"), async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    await Product.sync();
    const result = await Product.create({ users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

// get all product
router.get("/product", async (req, res) => {
  const { search } = req.query;

  try {
    let products;
    if (search) {
      products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else {
      products = await Product.findAll();
    }

    res.status(200).json({
      status: "success",
      response: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// get a product by ID
router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// update a product
router.put("/product/:id", upload.single("image"), async (req, res) => {
  const productId = req.params.id;
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    product.users_id = users_id;
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.status = status;
    product.image_url = `http://localhost:3000/public/${image.originalname}`;
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// delete a product
router.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    await product.destroy();
    res.send("Product deleted successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;