/**
 * Better approach to keep track of user access/permissions
 * or event states, where an integer is associated with
 * each state defined usually in an enum. But since JS doesn't
 * have enums, we can implement this logic using an object
 * instead.
 */

const UserRole = {
  NotAuthenticated: 0,
  Admin: 1,
  Manager: 2,
  Partner: 3,
  Visitor: 4
};

const locations = {
  CastelosMuseus: 1,
  PatrimonioReligioso: 2,
  PontosNaturais: 3
};

const partnerRole = {
  Aprovado: 0,
  Rejeitado: 1,
  Analise: 2,
  Pendente: 3
};

export { UserRole, locations, partnerRole };
