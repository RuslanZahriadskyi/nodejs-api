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

const mockCreateContact = jest.fn();

const mockUpdateContact = jest.fn();

const mockrRemoveContact = jest.fn();

const mockUpdateStatusContact = jest.fn();

const ContactsService = jest.fn().mockImplementation(() => {
  return {
    getAllContacts: mockGetAllContacs,
    getContactById: mockGetContactById,
    createContact: mockCreateContact,
    updateContact: mockUpdateContact,
    removeContact: mockrRemoveContact,
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
