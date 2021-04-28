import axios from "axios";

const apiURL = "/api/phonebook";

const getAll = () => {
  return axios.get(apiURL);
};

const create = (newObject) => {
  return axios.post(apiURL, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${apiURL}/${id}`, newObject);
};

export default {
  getAll,
  create,
  update,
};
