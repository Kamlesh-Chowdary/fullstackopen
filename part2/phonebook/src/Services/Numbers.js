import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getALL = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (numberObject) => {
  const request = axios.post(baseUrl, numberObject);
  return request.then((response) => response.data);
};
const update = (id, updatedNumber) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedNumber);
  return request.then((response) => response.data);
};
const deleteNumber = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
export default { getALL, create, update, deleteNumber };
