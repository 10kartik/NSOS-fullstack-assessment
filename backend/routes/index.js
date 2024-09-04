const express = require("express"),
  router = express.Router();

router.use("/products", require("./product"));

module.exports = router;
