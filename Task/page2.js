const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const data = {
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
    }
  };
  res.json(data);
});

module.exports = router;