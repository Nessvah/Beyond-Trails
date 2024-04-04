import axios from "axios";

async function createPt(PTData) {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_API}/api/gestor/pontos_turisticos`,
      PTData
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

async function updatePtById(id, updatedData) {
  try {
    const response = await axios.put(
      `http://${process.env.REACT_APP_API}/api/gestor/pontos_turisticos/${id}`,
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

async function deletePtById(id) {
  try {
    const response = await axios.delete(
      `http://${process.env.REACT_APP_API}/api/gestor/pontos_turisticos/${id}`
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

async function getAllPtData() {
  try {
    console.log("sending login data ");
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/gestor/pontos_turisticos`
      /* { withCredentials: true } */
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

export { createPt, updatePtById, deletePtById, getAllPtData };
