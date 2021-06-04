const users = [
  {
    _id: "60abf0ea4c83ea103cd0ed7a",
    name: "user1",
    subscription: "none",
    token: null,
    email: "user1@mail.com",
    password: "123456789",
  },

  {
    _id: "60abf153ff100f54e40f3bd8",
    name: "user2",
    subscription: "none",
    token: null,
    email: "user2@mail.com",
    password: "123456789",
  },
];

const newUser = {
  name: "newUser",
  subscription: "none",
  token: null,
  email: "newUser@mail.com",
  password: "123456789",
};

module.exports = { users, newUser };
