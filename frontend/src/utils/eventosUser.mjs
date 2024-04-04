import axios from "axios";
async function getAllEventsUser() {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/users/events`
    );

    // ${process.env.REACT_APP_API}

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw "Network request failed.";
    } else {
      throw error;
    }
  }
}

export { getAllEventsUser };
