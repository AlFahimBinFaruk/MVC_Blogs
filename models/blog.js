const { Schema, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    bloggerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const blog = model("Blog", BlogSchema);
module.exports = blog;
