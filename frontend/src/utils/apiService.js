import axios from "axios";

const apiOrigin = "http://localhost:8080";

export const callApi = async (route, methodUsed, bodyUsed, token) => {
  try {
    const axiosInit = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(bodyUsed && { data: bodyUsed }),
      ...(methodUsed && { method: methodUsed }),
    };

    const response = await axios.request(`${apiOrigin}/${route}`, axiosInit);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const readEntries = async (
  tokenGenerator,
  email,
  setter,
  tokenPassed
) => {
  try {
    let token;
    tokenPassed ? (token = tokenPassed) : (token = await tokenGenerator());

    let response = await callApi(
      `journalEntries/?email=${email}`,
      null,
      null,
      token
    );
    setter(response);
  } catch (error) {
    throw error;
  }
};

export const addEntry = async (tokenGenerator, setter, data) => {
  try {
    let token = await tokenGenerator("create:entries");
    await callApi("journalEntries", "POST", data, token);
    await readEntries(null, data.email, setter, token);
  } catch (error) {
    throw error;
  }
};

export const editEntry = async (tokenGenerator, setter, data, id, email) => {
  try {
    let token = await tokenGenerator("edit:entries");

    await callApi(`journalEntries/${id}`, "PUT", data, token);
    await readEntries(null, email, setter, token);
  } catch (error) {
    throw error;
  }
};

export const deleteEntry = async (tokenGenerator, setter, data) => {
  try {
    let token = await tokenGenerator("delete:entries");
    await callApi(`journalEntries/${data.id}`, "DELETE", null, token);
    await readEntries(null, data.email, setter, token);
  } catch (error) {
    throw error;
  }
};
