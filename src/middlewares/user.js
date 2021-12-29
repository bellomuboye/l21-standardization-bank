const jwt = require("jsonwebtoken");
const UserService = require("./../services/user")

module.exports = class AuthMiddleware {
    static async isEnabled(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Invalid or no token")
            const decodedToken = jwt.decode(token)

            const user = await UserService.getUserbyId(decodedToken.user_id)
            if (!user) throw new Error("Unauthorized")
            req.USER_ID = user._id;

            next()
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "invalid request",
                data: error.toString()
            })
            next(error)
        }
    }

    static async isAdmin(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Invalid or no token")
            const decodedToken = jwt.decode(token)

            const user = await UserService.getUserbyId(decodedToken.user_id)
            if (!user || user.role !== 'admin') throw new Error("Unauthorized")
            req.USER_ID = user._id;

            next()
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "invalid request",
                data: error.toString()
            })
            next(error)
        }
    }
}