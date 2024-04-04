/**
 * Envia um feedback para o servidor
 *
 * @param {Object} feedbackData - dados feedback a ser enviado
 * @returns {Promise} que resolve com os dados da resposta do servidor
 */
async function createFeedback(id, feedbackData) {
  try {
    console.log("Enviando feedback para o servidor:", feedbackData);
    const response = await fetch(
      `http://${process.env.REACT_APP_API}/api/partners/feedback/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackData)
      }
    );
    const responseData = await response.json();
    console.log("Resposta do servidor:", responseData);
    return responseData;
  } catch (error) {
    console.error("Erro ao buscar histórico de feedbacks", error);
    throw error;
  }
}

/**
 * Obtém o histórico de feedbacks do servidor
 *
 * @returns {Promise} que resolve com os dados do histórico de feedbacks
 */
async function getFeedbackHistory(id) {
  try {
    const response = await fetch(
      `http://${process.env.REACT_APP_API}/api/partners/feedback/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Erro ao buscar histórico de feedbacks", error);
    throw error;
  }
}

/**
 * Exclui um feedback do servidor.
 *
 * @param {string} feedbackId - ID do feedback a ser excluído
 * @returns {Promise} que resolve com um objeto que indica o sucesso ou  erro
 */

const deleteFeedback = async (feedbackId) => {
  try {
    const response = await fetch(
      `http://${process.env.REACT_APP_API}/api/partners/feedback/${feedbackId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      const responseData = await response.json();
      return { success: false, message: responseData.message };
    }
  } catch (error) {
    console.error("Erro ao excluir feedback", error);
    return { success: false, message: "Erro ao excluir feedback" };
  }
};

export { createFeedback, getFeedbackHistory, deleteFeedback };
