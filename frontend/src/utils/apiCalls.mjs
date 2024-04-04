import axios from "axios";

export async function deleteManagerById(id) {
  try {
    const response = axios.delete(
      `http://${process.env.API}/api/admin/managers/${id}`,
      { withCredentials: true }
    );

    return (await response).data;
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

export async function updateManagerById(id, updatedData) {
  try {
    const response = await axios.patch(
      `http://${process.env.REACT_APP_API}/api/admin/managers/${id}`,
      updatedData,
      { withCredentials: true }
    );

    return await response.data;
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

export async function login(formData) {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_API}/api/users/login`,
      formData
    );

    return await response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw "Pedido falhou devido a problemas de rede.";
    } else {
      throw error;
    }
  }
}

export async function resetPwd(email) {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_API}/api/users/reset-password`,
      email
    );

    return await response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw "Pedido falhou devido a problemas de rede.";
    } else {
      throw error;
    }
  }
}

export async function verifyCredentials(id, token) {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/users/reset-password/${id}/${token}`
    );

    return await response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw "Pedido falhou devido a problemas de rede.";
    } else {
      throw error;
    }
  }
}
