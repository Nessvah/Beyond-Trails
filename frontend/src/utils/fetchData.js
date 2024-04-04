import axios from "axios";

async function getAllManagersData() {
  try {
    console.log("sending login data ");
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/admin/managers`,
      { withCredentials: true }
    );

    // this will return the data array
    return await response.data.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw "Network request failed.";
    } else {
      throw error;
    }
  }
}

export default getAllManagersData;
