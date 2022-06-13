const { sendQueryAndReturnResponse } = require("./../../utils/serverFuncs");
module.exports = {
  findAll: async (data) => {
    const query = "SELECT * FROM journalEntries WHERE emailHashed = ?";
    let inputs = [];
    Object.entries(data).forEach(([columnName, value]) => {
      inputs.push(value);
    });

    return await sendQueryAndReturnResponse(query, inputs);
  },

  addEntry: async (data) => {
    let query =
      "INSERT INTO journalEntries (entry, feelingState, emailHashed) VALUES (?, ?, ?)";
    let inputs = [];
    Object.entries(data).forEach(([columnName, value]) => {
      inputs.push(value);
    });
    return await sendQueryAndReturnResponse(query, inputs);
  },

  editEntry: async (newEntry, entryId) => {
    let query =
      "UPDATE journalEntries SET entry = ?, feelingState = ? WHERE id = ?";
    let inputs = [];

    Object.entries(newEntry).forEach(async ([columnName, value]) => {
      inputs.push(value);
    });
    inputs.push(entryId);
    return await sendQueryAndReturnResponse(query, inputs);
  },

  deleteEntry: async (entryId) => {
    let query = "DELETE FROM journalEntries WHERE `id` = ?";

    return await sendQueryAndReturnResponse(query, entryId);
  },
};
