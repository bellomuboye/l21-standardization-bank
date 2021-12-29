const { errorMonitor } = require("stream");
const User = require("../models/user");
const Admin = require("../models/admin");

const { ValidationError, AuthorizationError, ServiceError } = require("../../customErrors");


module.exports = class UserService {
    static async getAllUsers(){
        try {
            const allUsers = await User.find().select("-password");
            return allUsers;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getAdminbyId(adminId){
        try {
            const response = await Admin.findById({_id: adminId});
            return response
        } catch (error) {
            throw new ServiceError(error)
        }
    }

    static async getAdminbyEmail(email){
        try {
            const response = await Admin.findOne({ email: email });
            return response
        } catch (error) {
            throw new ServiceError(error)
        }
    }

    static async createAdmin(data){
        try {
            const newAdmin = {
                email: data.email,
                password: data.passwordHash,
                full_name: data.full_name
            }

           const response = await new Admin(newAdmin).save();
           return response;
        } catch (error) {
            throw new ServiceError(error)
        } 

    }

    static async updateUserbyId(data){
        try {
            const updatedUser = await User.findByIdAndUpdate(
                data.user_id,
                { $set: {...data.changes} },
                { new: true }
            )
            return updatedUser
        } catch (error) {
            throw new Error(error)
        }
    }

    static async updateUserBalance(data) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                data.user_id,
                { $inc: {balance: data.amount} },
                { new: true }
            )

            return updatedUser
        } catch (error) {
            throw new Error(error)
        }
    }

    static async isBalanceSufficient(data) {
        try {
            const userBalance = await User.findById({_id: data.user_id}).select('balance');
            const transactionAmount = Math.abs(data.amount)

            if (userBalance.balance > transactionAmount) {
                return true
            } else {return false}
        } catch (error) {
            throw new Error(error)
        }
    }

    static async isUserEnabled(userId) {
        try {
            const userStatus = await User.findById({_id: data.user_id})
            if (userStatus === "enabled") {
                return true
            } else {return false }
        } catch(error) {
            throw new Error(error)
        }
    }

    static async addUserTransactionbyId(data){
        try {
            const user = await User.findById({_id: data.user_id});
            user.transactions.push(data.transaction_id)
            const response = await user.save();
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteUserTransaction(data){
        try {
            const user = await User.findById({_id: data.user_id});
            let index = user.transactions.indexOf(data.transaction_id)
            if (index !== -1) {
                user.transactions.splice(index, 1)
            }
            const response = await user.save();
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteUserbyId(userId){
        try {
            const response = await User.findByIdAndDelete(userId);
            return response;
        } catch (error) {
            throw new Error(error)
        }

    }

    static async getUserTransactions(userId){
        try {
            const user = await User
                .findById({_id: userId})
                .populate('transactions')
                .select('-password')
            return user
        } catch(error) {
            throw new Error(error)
        }
    }
}