import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);

  return request.data;
};

const update = async (newBlog) => {
  const request = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog);
  return request.data;
};

const remove = async (id) => {
  const config = {
    headers: { authorization: token },
  };

  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

export default { getAll, create, setToken, update, remove };
