import * as yup from "yup";

const promoSchema = yup.object().shape({
  promotionName: yup
    .string()
    .required("O nome da promoção é obrigatório.")
    .min(2, "O nome da promoção deve ter pelo menos 2 caracteres."),

  description: yup
    .string()
    .required("A descrição da promoção é obrigatória.")
    .min(5, "A descrição da promoção deve ter pelo menos 5 caracteres."),

  endDate: yup
    .date()
    .required("A data de término é obrigatória.")
    .min(
      yup.ref("startDate"),
      "A data de término deve ser posterior à data de início."
    ),

  startDate: yup
    .date()
    .required("A data de início é obrigatória.")
    .min(
      new Date(),
      "A data de início deve ser posterior ou igual à data atual."
    )
    .max(
      yup.ref("endDate"),
      "A data de início deve ser anterior à data de término."
    ),

  requiredPoints: yup
    .number()
    .required("Os pontos necessários são obrigatórios.")
    .positive("Os pontos necessários devem ser um número positivo."),

  imageUrl: yup.string().url("A URL da imagem deve ser uma URL válida.")
});

export default promoSchema;
