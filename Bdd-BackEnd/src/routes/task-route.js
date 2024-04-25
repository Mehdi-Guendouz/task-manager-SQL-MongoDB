const express = require("express");
const router = express.Router();

router.route("/task").get((req, res) => {
  res.send("Task route");
});

module.exports = router;
