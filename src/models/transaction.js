const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "transfer", "withdraw"],
      lowercase: true,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      validate: [
        {
          validator: function(v) {
            if (this.type === "withdraw" || this.type === "transfer" ) {
              return v
            } else {return true }
          },
          message: "sender_id is required"
        },
        {
          validator: function(v) {
            if (this.type === "transfer") {
              return mongoose.Types.ObjectId.isValid(v)
            } else {return true}
          },
          message: "invalid sender_id"
        }
      ]
    },
    recipient_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      validate: [
        {
          validator: function(v) {
            if (this.type === "deposit" || this.type === "transfer" ) {
              if(!v) return false
            }
          },
          message: "recipient_id is required"
        },
        {
          validator: function(v) {
            if (this.type === "transfer") {
              return mongoose.Types.ObjectId.isValid(v)
            }
          },
          message: "invalid sender_id"
        }
      ]
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("transaction", transactionSchema);
