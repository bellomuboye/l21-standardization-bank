const { errorMonitor } = require("stream");
const Transaction = require("../models/transaction");
const bcrypt = require("bcrypt")

module.exports = class AuthService {
    static async createTransaction(data){
        try {
            const newTransaction = {
                type: data.type,
                amount: data.amount,
                sender_id: data.sender_id,
                recipient_id: data.recipient_id,
            }

            if (data.description) newTransaction.description = data.description

            const response = await new Transaction(newTransaction).save();
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }
    static async getAllTransactions(){
        try {
            const allTransactions = await Transaction.find();
            return allTransactions;
        } catch (error) {
            throw new Error(error)
        }
    }
    static async getTransactionById(transaction_id){
        try {
            const response = await Transaction.findById({_id: transaction_id});
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
    static async deleteTransactionById(transaction_id) {
        try {
            const response = await Transaction.findByIdAndDelete(transaction_id);
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }
}