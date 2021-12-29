require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/user");

module.exports = class User{
    static async createUser(req, res, next){
        const data = req.body;

        try {
            const passwordHash = await bcrypt.hash(data.password, 10)
            const userData = {
                email: data.email,
                passwordHash,
                full_name: data.full_name,
                role: "user"
            }

            const user = await UserService.createUser(userData);
            const token = jwt.sign({ user_id: user._id}, JWT_SECRET_KEY, {expiresIn: 60 * 10 });

            res.status(201).send({
                message: "user created",
                data: {
                    token,
                    user_id: user._id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req, res, next){
        try {
            const users = await UserService.getAllUsers();
            if(!users) res.status(404).send({error: true, message: "no users"})
            res.send({message: "all users gotten", data: users});
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "unable to get users",
                data: error.toString()
            })
        }
    }

    static async getUserbyId(req, res, next) {
        const user_id = req.params.user_id || req.body.user_id;

        try {
            const user = await UserService.getUserbyId(user_id)
            if (!user) return res.status(404).send({error: true, message: "invalid user id"})
            res.send({
                message: "user gotten",
                data: {
                    user_id: user._id,
                    email: user.email,
                    full_name: user.full_name,
                    status: user.status,
                    role: user.role
                }
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "unable to get user",
                data: error.toString()
            })
        }
    }

    static async disableUser(req, res, next){
        const user_id = req.params.user_id;

        try {
            const user = await UserService.getUserbyId(user_id)
            if (!user) return res.status(404).send({error: true, message: "invalid user id"})

            const updatedUser = await UserService.updateUserbyId({
                user_id,
                changes: {
                    status: 'disabled'
                }
            })

            res.send({
                message: "user disabled",
                data: {
                    email: updatedUser.email
                }
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "unable to disable user",
                data: error.toString()
            })
        }
    }

    static async enableUser(req, res, next){
        const user_id = req.params.user_id;

        try {
            const user = await UserService.getUserbyId(user_id)
            if (!user) return res.status(404).send({error: true, message: "invalid user id"})

            const updatedUser = await UserService.updateUserbyId({
                user_id,
                changes: {
                    status: 'enabled'
                }
            })

            res.send({
                message: "user enabled",
                data: {
                    email: updatedUser.email
                }
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "unable to enable user",
                data: error.toString()
            })
        }
    }

    static async deleteUserbyId(req, res, next){
        const user_id = req.params.user_id;

        try {
            const user = await UserService.getUserbyId(user_id)
            if (!user) return res.status(404).send({error: true, message: "invalid user id"})

            const deletedUser = await UserService.deleteUserbyId(user_id)

            res.send({
                message: "user deleted",
                data: {
                    email: deletedUser.email
                }
            })

        } catch (error){
            res.status(400).send({
                error: true,
                message: "unable to delete user",
                data: error.toString()
            })
        }
    }
}