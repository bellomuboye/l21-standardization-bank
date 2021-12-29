const UserService = require("../services/user");
const AdminService = require("../services/user");
const AuthService = require("../services/auth")
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthorizationError, InternalServerError } = require("../../customErrors");


module.exports = class User{

    static async login(req, res, next){
        const data = req.body;

        try {

            let loggedInUser
            const user = await UserService.getUserbyEmail(data.email)
            if (!user) {
                const admin = await AdminService.getAdminbyEmail(data.email)
                if (!admin) {
                    throw new AuthorizationError("invalid email or password")
                } else {
                    loggedInUser = admin
                }
            } else {
                loggedInUser = user
            }
            
            const validPassword = await AuthService.validatePassword({password: data.password, passwordHash: loggedInUser.password});
            if (!validPassword) throw new AuthorizationError("invalid email or password")

            const token = jwt.sign({ user_id: user._id}, JWT_SECRET_KEY, {expiresIn: 60 * 10 });

            res.status(200).send({
                message: "user logged in",
                data: {
                    token,
                    user_id: loggedInUser._id,
                    email: loggedInUser.email,
                    full_name: loggedInUser.full_name,
                    role:loggedInUser.role
                }
            })
        } catch(error) {
            next(error)
        }
    }
}