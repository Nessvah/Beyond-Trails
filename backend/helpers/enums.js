/**
 * Better approach to keep track of user access/permissions
 * or event states, where an integer is associated with
 * each state defined usually in an enum. But since JS doesn't
 * have enums, we can implement this logic using an object
 * instead.
 */

const UserRole = {
  Admin: 1,
  Manager: 2,
  Partner: 3,
  Visitor: 4,
};

const EmailFlags = {
  Urgent: 0,
  FollowUp: 1,
  Important: 2,
  Read: 3,
  Unread: 4,
  Starred: 5,
  Archived: 6,
  Spam: 7,
  Trash: 8,
  Sent: 9,
  WaitingReply: 10,
  Attachments: 11,
};

const locations = {
  CastelosMuseus: 1,
  PatrimonioReligioso: 2,
  PontosNaturais: 3,
};

const partnerRole = {
  Aprovado: 0,
  Rejeitado: 1,
  Analise: 2,
  Pendente: 3,
};

module.exports = { UserRole, EmailFlags, partnerRole, locations };
