import axios from "axios";

export async function getPartnerById(partnerId) {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/partners/perfil/${partnerId}`
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

export async function updatePartnerById(partnerId, updatedData) {
  try {
    console.log("partnerId:", partnerId);
    console.log("updatedData:", updatedData);

    const formData = new FormData();

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] instanceof File) {
        formData.append(key, updatedData[key]);
      } else {
        formData.append(key, updatedData[key]);
      }
    });

    const response = await axios.put(
      `http://${process.env.REACT_APP_API}/api/partners/perfil/${partnerId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
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
export async function validarCodigoVisitante(qrCode) {
  const response = await axios.post(
    `http://${process.env.REACT_APP_API}/api/partners/validar-codigo-visitante`,
    { qrCode },
    { withCredentials: true }
  );
  return response.data;
}

export const getBemVindo = async (partnerId) => {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/partners/bem-vindo/${partnerId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação getBemVindo:", error);
    throw error;
  }
};

export const putBemVindo = async (partnerId, updatedData) => {
  try {
    const response = await axios.put(
      `http://${process.env.REACT_APP_API}/api/partners/bem-vindo/${partnerId}`,
      updatedData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação putBemVindo:", error);
    throw error;
  }
};
