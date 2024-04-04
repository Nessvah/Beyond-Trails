/**
 * Função que recebe um callback de validação e retorna uma função de middleware
 * @param {function} validator -valida o req.body
 * @returns {function} - middleware que verifica o req.body usando o validador
 */

export const registerVisitor = async (formData) => {
  try {
    console.log("Enviada requisição para registar visitante...");
    console.log("Dados do visitante:", formData);

    const response = await fetch(
      `http://${process.env.REACT_APP_API}/api/users/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    console.log("Resposta do servidor:", response);

    return response;
  } catch (error) {
    console.error("Erro na solicitação:", error.message);
    return false;
  }
};

export const registerPartner = async (formData) => {
  try {
    if (!formData.has("nif")) {
      throw new Error("'nif' is required.");
    }
    console.log("Dados do parceiro:", formData);
    const response = await fetch(
      `http://${process.env.REACT_APP_API}/api/users/register-partner`,
      {
        method: "POST",
        body: formData
      }
    );
    console.log("Resposta do servidor:", response);
    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      console.error("Erro no registo de colaborador:", data.error);
      return false;
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return false;
  }
};
