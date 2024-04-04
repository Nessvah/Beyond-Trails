import axios from "axios";

export async function updateVisitorProfile(id, updatedData) {
  try {
    const response = await axios.patch(
      `http://${process.env.REACT_APP_API}/api/users/editar-perfil/${id}`,
      updatedData,
      { withCredentials: true }
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

export async function getVisitorProfile(id, getData) {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/users/editar-perfil/${id}`,
      getData,
      { withCredentials: true }
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

export async function resetPasswordUser(id, newPassword, confirmPassword) {
  const requestData = {
    newPassword,
    confirmPassword
  };

  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_API}/api/users/reset-password-user/${id}`,
      requestData,
      { withCredentials: true }
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
