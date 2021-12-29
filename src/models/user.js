const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
      required: true
    },
    balance: {
      type: Number,
      required: true,
      default: 0
    },
    transactions: [{
      type: Schema.Types.ObjectId,
      ref: 'transaction'
    }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("user", userSchema);