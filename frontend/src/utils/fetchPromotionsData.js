/**
 * Obtém todos os dados de promoções do servidor
 *
 * @returns {Promise} que resolve com os dados de promoções do servidor
 * @throws {Error} erro em caso de falha na solicitação ou análise da resposta
 */
async function getAllPromotionsData(id) {
  try {
    const resp = await fetch(
      `http://${process.env.REACT_APP_API}/api/partners/promotions/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const info = await resp.json();

    return info.data;
  } catch (error) {
    console.error("Erro ao buscar dados de promoções:", error);
    throw error;
  }
}

export default getAllPromotionsData;
