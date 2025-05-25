import axios from "axios";

const API_BASE = "/api/questions";

export const getAllQuestions = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
