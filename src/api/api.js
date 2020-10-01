import axios from "axios";

// Mock API for we-are-us MVP
export default axios.create({
  baseURL: "http://54.66.121.53:3000",
});
