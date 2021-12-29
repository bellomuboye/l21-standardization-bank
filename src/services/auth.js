const { errorMonitor } = require("stream");
const User = require("../models/user");
const bcrypt = require("bcrypt")

module.exports = class AuthService {
    static async validatePassword(data){
        try {
            const response = await bcrypt.compare(data.password, data.passwordHash)
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }
}