const jwt = require("jsonwebtoken");
const request = require("supertest");
const { HttpCode } = require("../src/helpers/constants");
const app = require("../src/app");
require("dotenv").config();
const { user } = require("../src/services/__mocks__/data-users");

jest.mock("../src/services");

const SECRET_KEY = process.env.SECRET_KEY_JWT;

beforeAll(async () => {
  const setToken = (payload, secret) => jwt.sign(payload, secret);
  token = await setToken({ id: 1 }, SECRET_KEY, { expiresIn: "5m" });
  user.token = token;
});

afterAll(() => {
  user.token = null;
});

jest.mock("../src/helpers/multer", () => {
  return {
    single() {
      return (req, res, next) => {
        req.body = { title: req.query.title };
        req.file = {
          originalname: "fakeAvatar",
          mimetype: "image/jpeg",
          path: "./test/files/fakeForTests.jpg",
        };
        next();
      };
    },
  };
});

describe("set avatar at /avatars", () => {
  test("should return status 200 and body with path to avatar", async () => {
    const res = await request(app)
      .patch("/api/users/avatars")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", "./test/files/fakeForTests.jpg");

    expect(res.body).toBeDefined();
    expect(res.body.status).toEqual("success");
    expect(res.body.code).toEqual(HttpCode.OK);
    expect(res.body).toHaveProperty("avatarUrl");
  });

  test("should return status 403, invalid token", async () => {
    const res = await request(app).patch("/api/users/avatars");

    expect(res.body).toBeDefined();
    expect(res.body.status).toEqual("error");
    expect(res.body.code).toEqual(HttpCode.FORBIDDEN);
    expect(res.body.message).toEqual("Forbidden");
  });
});
