const { pool } = require("./../data/common");

const sendQueryAndReturnResponse = async (query, inputs) => {
  try {
    let inputsClean;
    if (inputs !== undefined) inputsClean = inputs;
    // handle the error of the below
    let data = await pool.query(query, inputsClean);

    // if (shouldReturnSingleValue && response.length > 0) response = response[0];
    return { error: false, data, status: 200 };
  } catch (error) {
    return { error: true, status: 500 };
    // throw error;
  }
};

const returnResponseOfDataAccessorResponse = async (
  dataAccessorResponse,
  res
) => {
  try {
    let response = await dataAccessorResponse;
    if (response.status === 500) {
      res.status(500);
      return res.end();
    } else if (response.status === 200) {
      res.status(response.status);
      return res.send(response.data);
    } else {
      res.status(404);
      return res.end();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendQueryAndReturnResponse,
  returnResponseOfDataAccessorResponse,
};
