const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    accountConfirmed:{type:Boolean, default:false},
    userName: String,
    userEmail: String,
    passwordHash: String,
    credits: { type: Number, default: 1000 },

    accountCreation: Date,
    accountLastConnection: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
