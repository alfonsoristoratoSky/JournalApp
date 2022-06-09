const { sendQueryAndReturnResponse } = require("./../../utils/serverFuncs");
module.exports = {
  all: async () => {
    const query = "SELECT * FROM journalEntries";
    return await sendQueryAndReturnResponse(query);
  },
};
