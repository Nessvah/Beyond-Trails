import axios from "axios";

/**
 * Apaga uma promoção pelo ID
 *
 * @param {string} id - ID da promoção a ser apagada
 * @returns {Promise} que resolve com os dados da resposta do servidor
 * @throws {object|string} objeto de erro de resposta ou mensagem de erro em caso de falha
 */
async function deletePromotionById(id) {
  try {
    const response = await axios.delete(
      `http://${process.env.REACT_APP_API}/api/partners/promotion-DeleteOne/${id}`
    );

    return response.data;
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

/**
 * Atualiza uma promoção pelo ID com os dados atualizados
 *
 * @param {string} id - ID da promoção a ser atualizada
 * @param {object} updatedData - dados atualizados da promoção
 * @returns {Promise} que resolve com os dados da resposta do servidor
 * @throws {object|string} objeto de erro de resposta ou mensagem de erro em caso de falha
 */
async function updatePromotionById(id, updatedData) {
  try {
    console.log("Atualização da promoção iniciada.");

    const response = await axios.put(
      `http://${process.env.REACT_APP_API}/api/partners/promotions/${id}`,
      updatedData
    );

    console.log("Resposta da atualização da promoção recebida.", response);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta:", error.response);
      throw error.response;
    } else if (error.request) {
      console.error("Requisição de rede falhou:", error.request);
      throw "Network request failed.";
    } else {
      console.error("Erro desconhecido:", error);
      throw error;
    }
  }
}

export { deletePromotionById, updatePromotionById };
