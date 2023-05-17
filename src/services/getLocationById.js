import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/";
export const getLocationById = async (locationId) => {
  try {
    const response = await axios.get(`${baseUrl}location/${locationId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
