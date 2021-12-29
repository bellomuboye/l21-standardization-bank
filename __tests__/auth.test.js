require("dotenv").config();
const app = require("./../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const { setupDB } = require("../test-setup");

const UserService = require("../src/services/user");

setupDB("test1-l21-standardization");

it("Gets the ping endpoint", async (done) => {
  const res = await request.get("/ping");
  expect(res.status).toBe(200);
  done();
});

it("Registers the user", async (done) => {
  const data = {
    full_name: "Bell Omuboye",
    email: "bellomuboye@gmail.com",
    password: "DancingInTheMoon",
  };
  const res = await request.post("/api/auth/register").send({
      full_name: data.full_name,
      email: data.email,
      password: data.password
  });
  expect(res.body.message).toBe("User created");

  const user = await UserService.getUserbyEmail(data.email);
  expect(user.full_name).toBeTruthy();
  expect(user.email).toBeTruthy();

  expect(res.body.data.full_name).toBe(data.full_name);
  expect(res.body.data.email).toBe(data.email);

  done();
});

it("Logs in the user", async (done) => {
  const data = {
    email: "bellomuboye@gmail.com",
    password: "DancingInTheMoon",
  };

  const res = await request.post("/api/auth/login").send({
      email: data.email,
      password: data.password
  });
  expect(res.body.message).toBe("User signed in");
  expect(res.body.data.token).toBeTruthy();
  expect(res.body.data.email).toBe(data.email);

  done();
});

it("should return an error of invalid email or password when logging", async (done) => {
  const data = {
    email: "belomuboye@gmail.com",
    password: "DancingInTheMoon",
  };
  const res = await request.post("/api/auth/login").send({
      email: data.email,
      password: data.password
  });
  expect(res.status).toBe(400)
  expect(res.body.message).toBe("Invalid email or password");
  expect(res.body.data).toBeUndefined()

  done();
});