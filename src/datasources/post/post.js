import { RESTDataSource } from "@apollo/datasource-rest";
import axios from "axios";

class PostAPI extends RESTDataSource {
  baseURL = process.env.NICV_WECAMP_3_CAPSTONE_SERVER;

  constructor(options) {
    super(options);
    this.contextValue = options?.contextValue;
  }

  async getPosts() {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { PostAPI };
