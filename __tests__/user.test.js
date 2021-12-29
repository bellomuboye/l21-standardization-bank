require("dotenv").config();
const bcrypt = require('bcrypt')
const app = require("./../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const { setupDB } = require("../test-setup");

const AuthService = require("../src/services/auth");
const UserService = require("../src/services/user");
const User = require("../src/models/user");

setupDB("test1-l21-standardization");
let users = require("../src/seeds/user.seed")
// beforeEach
beforeAll(async() => {

    for (u of users) {
        u.password = await bcrypt.hash(u.plainPassword, 10)
    }

    await User.insertMany(users)
})
users = require("../src/seeds/user.seed")


it("Testing Jest", () => {
    expect(1).toBe(1);
});

it("Gets all users", async (done) => {
    const loginAdmin = await request.post("/api/auth/login").send({
        email: users[0].email,
        password: users[0].plainPassword,
    })

    expect(loginAdmin.body.message).toBe("User signed in")
    const res = await request
        .get("/api/users/")
        .set('Authorization', loginAdmin.body.data.token) 
        .send();
    expect(res.body.message).toBe("all users gotten")
    done();
})

it("Disables user", async(done) => {
    const loginAdmin = await request.post("/api/auth/login").send({
        email: users[0].email,
        password: users[0].plainPassword,
    })

    expect(loginAdmin.body.message).toBe("User signed in")

    const user = await UserService.getUserbyEmail(users[1].email)

    const res = await request
        .put(`/api/users/${user._id}/disable`)
        .set('Authorization', loginAdmin.body.data.token)
        .send()

    expect(res.body.message).toBe("user disabled")

    done()

})


it("Deletes user", async(done) => {
    const loginAdmin = await request.post("/api/auth/login").send({
        email: users[0].email,
        password: users[0].plainPassword,
    })

    expect(loginAdmin.body.message).toBe("User signed in")

    const user = await UserService.getUserbyEmail(users[2].email)

    const res = await request
        .delete(`/api/users/${user._id}`)
        .set('Authorization', loginAdmin.body.data.token)
        .send()

    expect(res.body.message).toBe("user deleted")

    done()

})