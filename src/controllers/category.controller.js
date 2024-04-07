const Category = require("../models/category.model");

function CategoryController() {
  // Admin
  this.create = async (req, res) => {
    try {
      const { name, description } = req.body;
      const category = new Category({ name, description });
      await category.save();
      res.status(201).json({ message: "Created successfully", data: category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin
  this.getAll = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin
  this.getById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin
  this.update = async (req, res) => {
    try {
      const { name, description } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found!" });
      }
      res
        .status(200)
        .json({ message: "Updated successfully", data: updatedCategory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin
  this.delete = async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found!" });
      }
      res
        .status(200)
        .json({ message: "Deleted successfully", data: deletedCategory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  return this;
}

module.exports = CategoryController();
