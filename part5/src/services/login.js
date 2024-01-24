import axios from "axios";

const baseUrl = "/api/login";

const login = async (loginCredentials) => {
  const user = await axios.post(baseUrl, loginCredentials);
  return user.data;
};

export default { login };
