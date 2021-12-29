require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminService = require("../services/admin");

module.exports = class User{
    static async createAdmin(req, res, next){
        const data = req.body;

        try {
            const passwordHash = await bcrypt.hash(data.password, 10)
            const adminData = {
                email: data.email,
                passwordHash,
                full_name: data.full_name,
            }

            const admin = await AdminService.createAdmin(adminData);
            const token = jwt.sign({ admin_id: admin._id}, JWT_SECRET_KEY, {expiresIn: 60 * 10 });

            res.status(201).send({
                message: "admin created",
                data: {
                    token,
                    admin_id: admin._id,
                    email: admin.email,
                    full_name: admin.full_name,
                    role: admin.role
                }
            })
        } catch (error) {
            next(error)
        }
    }
}