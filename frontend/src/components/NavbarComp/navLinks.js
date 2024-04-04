import { UserRole } from "../../helpers/enums";
import { locations } from "../../helpers/enums";

// ! To use UserRole.NotAuthenticated or others, as a dynamic key, we need to wrap it in square brackets:
// This way, we can create properties with dynamic keys based on the values of our enumeration.
export const UserLinks = {
  [UserRole.NotAuthenticated]: [
    {
      to: "/passaporte-digital",
      text: "Passaporte Digital",
      items: [{ to: "/como-funciona", text: "Como funciona?" }]
    },
    {
      to: "/pontos_turisticos",
      text: "Pontos a visitar",
      items: [
        {
          to: `/pontos_turisticos?ponto=${locations.PatrimonioReligioso}`,
          text: "Património religioso"
        },
        {
          to: `/pontos_turisticos?ponto=${locations.PontosNaturais}`,
          text: "Pontos naturais"
        },
        {
          to: `/pontos_turisticos?ponto=${locations.CastelosMuseus}`,
          text: "Museus e castelos"
        }
      ]
    },
    {
      to: "/servicos",
      text: "Serviços",
      items: [
        { to: "/alojamento", text: "Alojamento" },
        { to: "/artesanato", text: "Artesanato" },
        { to: "/restauracao", text: "Restauração" }
      ]
    },
    { to: "/eventos", text: "Eventos" }
  ],
  [UserRole.Visitor]: [
    {
      to: "/passaporte-digital",
      text: "Passaporte Digital",
      items: [
        { to: "/passaporte-digital/pontuacao", text: "A minha pontuação" },
        {
          to: "/passaporte-digital/historico-pontos",
          text: "Histórico de Pontos"
        },
        { to: "/como-funciona", text: "Como funciona?" }
      ]
    }
  ],
  [UserRole.Manager]: [
    {
      to: "/gestor/eventos",
      text: "Eventos"
    },
    {
      to: "/gestor/pontos-turisticos",
      text: "Pontos Turísticos"
    },
    {
      to: "/gestor/servicos-turisticos",
      text: "Serviços Turísticos"
    }
  ]
};
