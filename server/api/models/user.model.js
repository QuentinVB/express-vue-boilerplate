const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  email:String,
  passwordHash: String,
  credits:Number,

  accountCreation: Date,
  accountLastConnection: Date,
},{
  timestamps: true
});

UserSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;