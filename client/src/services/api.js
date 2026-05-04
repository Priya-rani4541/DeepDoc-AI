import axios from "axios";

export const askQuestion = (query) => {
  return axios.post("http://localhost:8000/query", null, {
    params: { query },
  });
};