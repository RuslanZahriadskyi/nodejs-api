const { contacts } = require("./data-contacts");

const mockGetAllContacs = jest.fn(() => {
  return { contacts, total: contacts.length, limit: 2, offset: 0 };
});

const mockGetContactById = jest.fn((userId, id) => {
  const [contact] = contacts.filter(
    (el) => String(el.id) === String(id) && String(el.owner) === String(userId)
  );
  return contact;
});

const mockCreateContact = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: "60abf0a78955325d2c90895z" });
  return { ...body, _id: "60abf0a78955325d2c90895z" };
});

const mockUpdateContact = jest.fn((userId, id, body) => {
  const [contact] = contacts.filter((el) => {
    return String(el._id) === String(id) && String(el.owner) === String(userId);
  });

  if (contact) {
    contact.name = body.name;
  }

  return contact;
});

const mockRemoveContact = jest.fn((userId, id) => {
  const index = contacts.findIndex(
    (el) => String(el._id) === String(id) && String(el.owner) === String(userId)
  );
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    return contact;
  }
  return null;
});

const mockUpdateStatusContact = jest.fn((userId, id, body) => {
  const [contact] = contacts.filter((el) => {
    return String(el._id) === String(id) && String(el.owner) === String(userId);
  });

  if (contact) {
    contact.favorite = body.favorite;
  }

  return contact;
});

const ContactsService = jest.fn().mockImplementation(() => {
  return {
    getAllContacts: mockGetAllContacs,
    getContactById: mockGetContactById,
    createContact: mockCreateContact,
    updateContact: mockUpdateContact,
    removeContact: mockRemoveContact,
    updateStatusContact: mockUpdateStatusContact,
  };
});

const AuthService = jest.fn().mockImplementation(() => {
  return {
    // login: mockLogin,
    // logout: mockLogout,
    login: jest.fn(),
    logout: jest.fn(),
  };
});

const UsersService = jest.fn().mockImplementation(() => {
  return {
    // create: mockCreate,
    // getUserByEmail: mockGetUserByEmail,
    // getUserById: mockGetUserById,
    // getCurrentUser: mockGetCurrentUser,
    // updateSubscriptionStatus: mockrUpdateSubscriptionStatus,
    // updateAvatars: mockUpdateAvatars,
    create: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserById: jest.fn(),
    getCurrentUser: jest.fn(),
    updateSubscriptionStatus: jest.fn(),
    updateAvatars: jest.fn(),
  };
});

module.exports = { ContactsService, AuthService, UsersService };
