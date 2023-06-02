const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const mainpage = `<h1 align="center"> Welcome ! </h1>
                   <h4 align="center">
                    <a href="/home"> HOME </a>
                    &emsp;
                    <a href="/about"> ABOUT </a>
                   </h4>`;

  res.send(mainpage);
});

module.exports = router;