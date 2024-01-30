import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;

export class BlogService {
  setToken(newToken) {
    token = `Bearer ${newToken}`;
  }
  async getAll() {
    try {
      const request = await axios.get(baseUrl);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  }

  create = async (newBlog) => {
    try {
      const config = {
        headers: { authorization: token },
      };
      const request = await axios.post(baseUrl, newBlog, config);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (newBlog) => {
    try {
      const request = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  };
  remove = async (id) => {
    try {
      const config = {
        headers: { authorization: token },
      };

      const request = await axios.delete(`${baseUrl}/${id}`, config);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  };
}

const blogService = new BlogService();
export default blogService;
