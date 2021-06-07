const users = require("./users");
const { HttpCode } = require("../helpers/constants");
const { UsersService } = require("../services");
const { AuthService } = require("../services");

const {
  users: usersFake,
  newUser,
  newUserError,
} = require("../services/__mocks__/data-users");

jest.mock("../services");

describe("Unit testing auth controlller", () => {
  let req, res, next;
  beforeEach(() => {
    req = { user: { id: 12 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn((data) => data);
  });

  test("should login user", async () => {
    const { email, password } = usersFake[1];

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    req.body = { email, password };

    const result = await users.login(req, res, next);

    expect(AuthService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data).toHaveProperty("token", token);
  });

  test("should get error when try login user", async () => {
    const email = "error@gmail.com";
    const password = "1111111";

    req.body = { email, password };

    await users.login(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: HttpCode.UNAUTHORIZED,
      message: "Invalid creadentials",
    });
  });

  test("should be error when try login user without email", async () => {
    await users.login({}, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("should logout user", async () => {
    const { _id } = usersFake[1];

    req.user.id = _id;

    const result = await users.logout(req, res, next);
    expect(AuthService).toHaveBeenCalled();
    expect(result).toStrictEqual({
      code: HttpCode.NO_CONTENT,
      status: "success",
    });
  });
});

describe("Unit testing auth controlller", () => {
  let req, res, next;
  beforeEach(() => {
    req = { user: { id: 12 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn((data) => data);
  });

  // test("should create new user", async () => {
  //   const { email, subscription } = newUser;

  //   req.body = newUser;
  //   const result = await users.reg(req, res, next);

  //   expect(UsersService).toHaveBeenCalled();
  //   expect(result).toBeDefined();
  //   expect(result.data).toHaveProperty("id");
  //   expect(result.data).toHaveProperty("email", email);
  //   expect(result.data).toHaveProperty("subscription", subscription);
  // });

  // test("should get error when try create new user with existing email", async () => {
  //   req.body = newUserError;

  //   await users.reg(req, res, next);

  //   expect(UsersService).toHaveBeenCalled();
  //   expect(next).toBeCalledTimes(1);
  //   expect(next).toReturnTimes(1);
  //   expect(next).toBeCalledWith({
  //     status: HttpCode.CONFLICT,
  //     message: "This email already exist",
  //   });
  // });

  test("should get error when try create new user", async () => {
    await users.reg(req, res, next);

    expect(UsersService).toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
  });

  test("should get current user", async () => {
    const { _id, name, email, subscription } = usersFake[1];

    req.user.id = _id;

    const result = await users.currentUser(req, res, next);
    expect(UsersService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.user).toHaveProperty("name", name);
    expect(result.data.user).toHaveProperty("email", email);
    expect(result.data.user).toHaveProperty("subscription", subscription);
  });

  test("should be error unauthorized when try get current user", async () => {
    req.user.id = 11;

    await users.currentUser(req, res, next);
    expect(UsersService).toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: HttpCode.UNAUTHORIZED,
      message: "You are not authorized, please login on your account",
    });
  });

  test("should be error when try get current user", async () => {
    await users.currentUser({}, res, next);
    expect(UsersService).toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
  });

  test(" should update user subscription", async () => {
    const { _id, name, email } = usersFake[1];

    const subscription = "pro";

    req.body = subscription;
    req.user.id = _id;
    const result = await users.updateSubscriptionStatus(req, res, next);
    expect(UsersService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.user).toHaveProperty("name", name);
    expect(result.data.user).toHaveProperty("email", email);
    expect(result.data.user).toHaveProperty("subscription", subscription);
  });

  test(" should return error unauthorized when try update user subscription", async () => {
    const subscription = "pro";

    req.body = subscription;

    await users.updateSubscriptionStatus(req, res, next);
    expect(UsersService).toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: HttpCode.UNAUTHORIZED,
      message: "You are not authorized",
    });
  });

  test(" should return error when try update user subscription", async () => {
    await users.updateSubscriptionStatus({}, res, next);
    expect(UsersService).toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
  });
});
