import axios from "axios";

// Mock API for we-are-us MVP
const production = "https://se-evidence-repo.herokuapp.com";
const development = "http://localhost:8080";
const url = process.env.NODE_ENV === "development" ? development : production;

export default axios.create({
  baseURL: url,
});
