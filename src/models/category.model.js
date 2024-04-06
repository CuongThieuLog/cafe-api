const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
    },
    description: String,
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
