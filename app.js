// const express = require("express");
// const path = require("path");
// const app = express();
// // const productRouter = require("./app/product/routes");
// // const productRouterV2 = require("./app/product_v2/routes");
// const productRouterV3 = require("./app/product_v3/routes");
// const logger = require("morgan");

// app.use(logger("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/public", express.static(path.join(__dirname, "uploads")));
// // app.use("/api/v1", productRouter);
// // app.use("/api/v2", productRouterV2);
// app.use("/api/v3", productRouterV3);
// app.use(router);
// app.use((req, res, next) => {
//   res.send({
//     status: "failed",
//     message: "Resource" + req.originalURL + "  Not Found",
//   });
// });
// app.listen(3000, () => console.log("Server : http://localhost:3000"));


const express = require("express");
const path = require("path");
const app = express();
const productRouter = require("./app/product/routes");
const productRouterV2 = require("./app/product_v2/routes");
// const productRouterV3 = require("./app/product_v3/routes");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouter);
app.use("/api/v2", productRouterV2);
// app.use("/api/v3", productRouterV3);
app.use(router);
app.use((req, res, next) => {
  res.send({
    status: "failed",
    message: "Resource" + req.originalURL + "  Not Found",
  });
});
app.listen(3000, () => console.log("Server : http://localhost:3000"));