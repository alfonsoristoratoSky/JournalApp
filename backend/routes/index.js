const express = require("express");
const router = express.Router();

const journalEntries = require("./journalEntries");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/journalEntries", journalEntries);

module.exports = router;
