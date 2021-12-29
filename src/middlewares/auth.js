const jwt = require("jsonwebtoken");
const UserService = require("./../services/user")

const { ValidationError, AuthorizationError } = require("../../customErrors")

module.exports = class AuthMiddleware {
    static async isAuthenticated(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new ValidationError("token is required in authorization header")
            const decodedToken = jwt.decode(token)

            let user
            if (decodedToken.user_id) {
                user = await UserService.getUserbyId(decodedToken.user_id)
            } else if (decodedToken.admin_id) {
                user = await AdminService.getAdminbyId(decodedToken.admin_id)
            } else { throw new AuthorizationError("invalid token") }

            if (!user) throw new AuthorizationError("invalid token")
            req.USER_ID = user._id

            next()
        } catch (error) {
            next(error)
        }
    }

    static async isAdmin(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new ValidationError("token is required in authorization header")
            const decodedToken = jwt.decode(token)

            const admin = await AdminService.getUserbyId(decodedToken.admin_id)
            if (!admin || admin.role !== 'admin') throw new AuthorizationError("invalid token")
            req.USER_ID = admin._id;

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

    static async isAdminOrOwner(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new ValidationError("token is required in authorization header")
            const decodedToken = jwt.decode(token)

            let user
            if (decodedToken.user_id && decodedToken.user_id === req.params.user_id) {
                user = await UserService.getUserbyId(decodedToken.user_id)
            } else if (decodedToken.admin_id) {
                user = await AdminService.getAdminbyId(decodedToken.admin_id)
            } else { throw new AuthorizationError("invalid token") }

            if (!user) throw new AuthorizationError("invalid token")
            req.USER_ID = user._id

            next()
        } catch (error) {
            next(error)
        }
    }
}