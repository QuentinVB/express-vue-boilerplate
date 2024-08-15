const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    message: {
      type: String,
      default:""
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
