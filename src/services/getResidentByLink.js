import axios from "axios";

export const getResidentByLink = async (link) => {
  try {
    const response = await axios.get(link);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
