const express = require("express");
const router = express.Router();
const {
  returnResponseOfDataAccessorResponse,
} = require("./../utils/serverFuncs");
const dataAccessor = require("../data");

router.get("/", async (req, res) => {
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.journalEntries.all(),
      res
    );
  } catch (error) {
    throw error;
  }
});

module.exports = router;
