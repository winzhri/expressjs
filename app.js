// const express = require ('express');
// const app = express();

// app.use('/', (req, res) => {
//     res.send({
//         status: 'Successfully',
//         message: 'Welcome to Express JS Tutorial'
//     });    
// });

// app.listen(3000, () => console.log('Server: http://localhost:3000'));

// //sebagai root	
// const express = require ('express');
// const app = express();
// const router = require('./routes');

// app.use(router);
// app.listen(3000, () => console.log('Server: http://localhost:3000'));

// //  MIDDLEWARE
// const express = require ('express');
// const path =require ('path');
// const app = express();
// const router = require('./routes');
// const log = require('./middlewares/logger');

// app.use(log);
// app.use(express.urlencoded({extended: true}));  // untuk mengembalikan request
// app.use(express.json());
// app.use('/public', express.static(path.join (__dirname, 'uploads'))); // copy namefile di url browser
// app.use(router);

// // --> membuat routing untuk Error Not Found
// app.use (( req, res, next) => {	// bisa ditambah param err --> digunakan untuk handle error yg lain
//     res.status(404);
//     res.send({
//         status: 'failed',
//         message: 'Resource ' + req.originalUrl + ' Not Found'
//     })
// });

// app.listen(3000, () => console.log('Server: http://localhost:3000'));

const express = require("express");
const app = express();

const indexRouter = require("./Task/index");
const htmlRouter = require("./Task/page1.js");
const jsonRouter = require("./Task/page2.js");

app.use(express.json());
app.use("/", indexRouter);
app.use("/home", htmlRouter);
app.use("/about", jsonRouter);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => console.log('Server: http://localhost:3000'));
