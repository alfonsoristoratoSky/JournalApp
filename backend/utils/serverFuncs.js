const { pool } = require("./../data/common");

const sendQueryAndReturnResponse = async (query, inputs) => {
  try {
    let inputsClean;
    if (inputs !== undefined) inputsClean = inputs;
    let data = await pool.query(query, inputsClean);
    // if (shouldReturnSingleValue && response.length > 0) response = response[0];
    return { error: false, data, status: 200 };
  } catch (error) {
    throw error;
  }
};

const returnResponseOfDataAccessorResponse = async (
  dataAccessorResponse,
  res
) => {
  try {
    let response = await dataAccessorResponse;

    // if (response.data.length > 0) {
    //   res.status(response.status);
    //   return res.send(response.data);
    // }
    // else {
    //   res.status(404);
    //   return res.end();

    // }
    res.status(response.status);
    return res.send(response.data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendQueryAndReturnResponse,
  returnResponseOfDataAccessorResponse,
};
