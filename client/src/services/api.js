import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});

export const askQuestion = async (query) => {
  try {
    const response = await API.post("/ask", {
      query: query,
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    throw error;
  }
};