import * as yup from "yup";

const eventSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório."),
  shortDescription: yup.string().required("A descrição é obrigatória."),
  local: yup.string().required("O local é obrigatório."),
  hora: yup
    .string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inválido (HH:MM)."
    ),
  bilhete: yup
    .string()
    .test(
      "Tá tudo! 👍 ",
      "O bilhete deve ser 'Entrada Livre' ou um valor válido (XX€)",
      (value) => {
        if (value === "Entrada Livre") {
          return true; // Válido se for "Entrada Livre"
        }
        return /^(\d+(\.\d{1,2})?)€$/.test(value);
      }
    ),
  images: yup.mixed().nullable(),
  images1: yup.mixed().nullable()
});

export default eventSchema;
