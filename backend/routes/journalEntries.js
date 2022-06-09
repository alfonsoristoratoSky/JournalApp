const express = require("express");
const router = express.Router();
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const {
  returnResponseOfDataAccessorResponse,
} = require("./../utils/serverFuncs");
const dataAccessor = require("../data");
const createEntriesScope = requiredScopes("create:entries");
const editEntriesScope = requiredScopes("edit:entries");
const deleteEntriesScope = requiredScopes("delete:entries");

router.get("/", async (req, res) => {
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.journalEntries.findAll(),
      res
    );
  } catch (error) {
    throw error;
  }
});
router.post("/", createEntriesScope, async (req, res) => {
  let data = req.body;

  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.journalEntries.addEntry(data),
      res
    );
  } catch (err) {
    throw err;
  }
});
router.put("/:entryId", editEntriesScope, async (req, res) => {
  let entryId = req.params.entryId;
  let data = req.body;
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.journalEntries.editEntry(data, entryId),
      res
    );
  } catch (err) {
    throw err;
  }
});

router.delete("/:entryId", deleteEntriesScope, async (req, res) => {
  let entryId = req.params.entryId;
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.journalEntries.deleteEntry(entryId),
      res
    );
  } catch (err) {
    throw err;
  }
});

module.exports = router;
