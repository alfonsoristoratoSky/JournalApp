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

  editEntry: async (newMessage, messageId) => {
    let query = "UPDATE journalEntries SET `entry` = ? WHERE `id` = ?";
    let inputs = [];

    Object.entries(newMessage).forEach(async ([columnName, value]) => {
      inputs.push(value);
    });
    inputs.push(messageId);
    return await sendQueryAndReturnResponse(query, inputs);
  },

  deleteEntry: async (messageId) => {
    let query = "DELETE FROM journalEntries WHERE `id` = ?";

    return await sendQueryAndReturnResponse(query, messageId);
  },
};
