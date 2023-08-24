const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  message: String,

  userId:{type: Schema.Types.ObjectId, ref: 'User'},

  accountCreation: Date,
  accountLastConnection: Date,
},{
  timestamps: true
});

PostSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;