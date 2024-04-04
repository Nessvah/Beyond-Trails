import axios from "axios";

async function createEvent(eventData) {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_API}/api/gestor/eventos`,
      eventData
    );

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

async function updateEventById(id, updatedData) {
  console.log(updatedData);
  try {
    const response = await axios.put(
      `http://${process.env.REACT_APP_API}/api/gestor/eventos/${id}`,
      updatedData
    );

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

async function deleteEventById(id) {
  try {
    const response = await axios.delete(
      `http://${process.env.REACT_APP_API}/api/gestor/eventos/${id}`
    );

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

async function getAllEvents() {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/gestor/eventos`
    );

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

export { createEvent, updateEventById, deleteEventById, getAllEvents };
