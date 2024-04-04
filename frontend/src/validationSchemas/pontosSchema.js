import * as yup from "yup";

const pontosSchema = yup.object().shape({
  local: yup
    .string()
    .min(2, "O local precisa de pelo menos 2 letras.")
    .required("Este campo é obrigatório"),

  imgUrl: yup.mixed().required("Este campo é obrigatório"),

  morada: yup.string().required("Este campo é obrigatório"),

  coordenadas: yup.string().required("Este campo é obrigatório"),

  horario: yup
    .string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] - (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inválido (HH:MM - HH:MM)."
    )
    .required("Este campo é obrigatório"),

  descricao: yup
    .string()
    .min(20, "A descrição precisa de pelo menos 20 letras.")
    .required("Este campo é obrigatório"),

  telefone: yup
    .string()
    .matches(/^\d+$/, "O número de telefone deve conter apenas números")
    .min(9, "O número de telefone deve conter pelo menos 9 dígitos."),

  telemovel: yup
    .string()
    .matches(/^\d+$/, "O número de telemóvel deve conter apenas números")
    .min(9, "O número de telemóvel deve conter pelo menos 9 dígitos."),

  website: yup.string().min(5, "O website precisa de pelo menos 5 letras."),

  acessibilidade: yup
    .string()
    .min(2, "Este campo precisa de pelo menos 2 letras."),

  qrcode: yup
    .string()
    .min(2, "Este campo precisa de pelo menos 2 letras.")
    .required("Este campo é obrigatório"),

  tipo: yup.number().required("Este campo é obrigatório"),

  pontosAssociados: yup.number().required("Este campo é obrigatório")
});

const updatePontosSchema = yup.object().shape({
  local: yup
    .string()
    .min(2, "O local precisa de pelo menos 2 letras.")
    .required("Este campo é obrigatório")
    .nullable(),

  imgUrl: yup.string().required("Este campo é obrigatório").nullable(),

  morada: yup.string().required("Este campo é obrigatório").nullable(),

  coordenadas: yup.string().required("Este campo é obrigatório").nullable(),

  horario: yup
    .string()
    .test(
      "valid-format",
      "Formato de hora inválido (HH:MM - HH:MM).",
      (value) =>
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] - (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(
          value
        )
    )
    .required("Este campo é obrigatório")
    .nullable(),

  descricao: yup
    .string()
    .min(20, "A descrição precisa de pelo menos 20 letras.")
    .required("Este campo é obrigatório")
    .nullable(),

  telefone: yup
    .string()
    .min(9, "O número de telefone deve conter pelo menos 9 dígitos.")
    .test(
      "valid-format",
      "O número de telefone deve conter apenas números.",
      (value) => /^\d+$/.test(value)
    )
    .required("Este campo é obrigatório")
    .nullable(),

  telemovel: yup
    .string()
    .test(
      "valid-format",
      "O número de telemóvel deve conter apenas números.",
      (value) => /^\d+$/.test(value)
    )
    .min(9, "O número de telemóvel deve conter pelo menos 9 dígitos.")
    .required("Este campo é obrigatório")
    .nullable(),

  website: yup
    .string()
    .min(5, "O website precisa de pelo menos 5 letras.")
    .nullable(),

  acessibilidade: yup
    .string()
    .min(2, "Este campo precisa de pelo menos 2 letras.")
    .nullable(),

  qrcode: yup
    .string()
    .min(2, "Este campo precisa de pelo menos 2 letras.")
    .required("Este campo é obrigatório")
    .nullable(),

  tipo: yup.number().required("Este campo é obrigatório").nullable(),

  pontosAssociados: yup.number().required("Este campo é obrigatório").nullable()
});

export { pontosSchema, updatePontosSchema };
