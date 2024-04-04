import axios from "axios";

async function changePartnerApprovedStatus(partnerId, status) {
  try {
    if (status < 0 || status > 3) {
      return { message: "Valor de status não permitido!" };
    }
    const response = await axios.post(
      `http://${process.env.REACT_APP_API}/api/gestor/approve`,
      { status, partnerId }
    );
    const message = response.data.message;
    const partner = response.data.partner;
    return { message, partner };
  } catch (error) {
    console.error(error);
    return { message: "Erro ao aprovar o parceiro." };
  }
}

async function getVerifiedPartners() {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API}/api/gestor/approve`
    );

    const verifiedPartners = response.data;

    return verifiedPartners;
  } catch (error) {
    console.error(error);
    return { message: "Erro ao encontrar parceiros com o email verificado." };
  }
}

export { changePartnerApprovedStatus, getVerifiedPartners };
