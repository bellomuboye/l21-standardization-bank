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


it("Deposits #100", async (done) => {
    const recipient = await UserService.getUserbyEmail(users[1].email)

    const res = await request.post("/api/transactions/deposit").send({
        amount: 100,
        recipient_id:recipient._id,
        type: "deposit"
    })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe("deposit created")
    done();
})

it("Withdraws #40", async (done) => {
    const loginRecipient = await request.post("/api/auth/login").send({
        email: users[1].email,
        password: users[1].plainPassword
    })
    expect(loginRecipient.body.message).toBe("User signed in")

    const res = await request
        .post("/api/transactions/withdraw")
        .set('Authorization', loginRecipient.body.data.token)
        .send({
            amount: 40,
            type: "withdraw",
        })
    
    const sender = await UserService.getUserbyEmail(users[1].email)
    expect(res.status).toBe(201)
    expect(res.body.message).toBe("withdraw created")
    expect(sender.balance).toBe(60)
    done();
})

it("Returns error of insufficient balance when withdrawing #100", async (done) => {
    const loginRecipient = await request.post("/api/auth/login").send({
        email: users[1].email,
        password: users[1].plainPassword
    })
    expect(loginRecipient.body.message).toBe("User signed in")

    const res = await request
        .post("/api/transactions/withdraw")
        .set('Authorization', loginRecipient.body.data.token)
        .send({
            amount: 100,
            type: "withdraw",
        })
    
    const sender = await UserService.getUserbyEmail(users[1].email)

    expect(res.status).toBe(400)
    expect(sender.balance).toBe(60)
    expect(res.body.message).toBe("insufficient balance")
    done();
})

it("Transfers #20", async (done) => {
    const loginSender = await request.post("/api/auth/login").send({
        email: users[1].email,
        password: users[1].plainPassword
    })
    expect(loginSender.body.message).toBe("User signed in")
    let recipient = await UserService.getUserbyEmail(users[2].email)
    const res = await request
        .post("/api/transactions/transfer")
        .set('Authorization', loginSender.body.data.token)
        .send({
            amount: 20,
            recipient_id: recipient._id,
            type: "transfer",
        });
    
    const sender = await UserService.getUserbyEmail(users[1].email)
    recipient = await UserService.getUserbyEmail(users[2].email)

    expect(res.status).toBe(201)
    expect(sender.balance).toBe(40)
    expect(recipient.balance).toBe(20)
    expect(res.body.message).toBe("transfer created")
    done();
})

it("Reverses a transfer", async (done) => {
    const loginAdmin = await request.post("/api/auth/login").send({
        email: users[0].email,
        password: users[1].plainPassword
    })
    
    let sender = await UserService.getUserbyEmail(users[1].email)
    const senderTransactions =  (await request
        .get(`/api/transactions/${sender._id}`)
        .set('Authorization', loginAdmin.body.data.token)
        .send()
    ).body.data.transactions

    transaction = senderTransactions.filter(tx => tx.type === "transfer")[0]
    
    const res = await request
        .delete(`/api/transactions/${transaction._id}/reverse`)
        .set('Authorization', loginAdmin.body.data.token)
        .send();
    
    sender = await UserService.getUserbyId(transaction.sender_id)
    let recipient = await UserService.getUserbyId(transaction.recipient_id)

    expect(res.status).toBe(200)
    expect(sender.balance).toBe(60)
    expect(recipient.balance).toBe(0)
    expect(res.body.message).toBe("transaction reversed")
    
    done();
})