const users = require("./users");
const { HttpCode } = require("../helpers/constants");
const { UsersService } = require("../services");
const { AuthService } = require("../services");

const {
  users: usersFake,
  newUser,
} = require("../services/__mocks__/data-users");

jest.mock("../services");

describe("Unit testing auth controlller", () => {
  let req, res, next;
  beforeEach(() => {
    req = { user: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn((data) => data);
  });

  test("should login user", async () => {
    const { email, password } = usersFake[0];

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    req.body = { email, password };

    const result = await users.login(req, res, next);

    expect(AuthService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data).toHaveProperty("token", token);
  });
});
