import axios from "axios";

const baseUrl = "/api/login";

export class AuthService {
  async login(loginCredentials) {
    try {
      const user = await axios.post(baseUrl, loginCredentials);
      return user.data;
    } catch (error) {
      console.log(error);
    }
  }
}
const loginService = new AuthService();

export default loginService;
