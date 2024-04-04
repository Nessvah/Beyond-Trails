import axios from "axios";

export const aprovePartner = async (dados) => {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/gestor/approve/`,
      dados,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação de aprovação de parceiros", error);
    throw error;
  }
};

export const statusPartner = async (dados) => {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_API}/api/gestor/approve/${dados.partnerId}`,
      dados,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação de mudar status do parceiro", error);
    throw error;
  }
};
