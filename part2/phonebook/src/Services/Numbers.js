import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getALL = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (numberObject) => {
  const request = axios.post(baseUrl, numberObject);
  return request.then((response) => response.data);
};

export default { getALL, create };
