const Order = require("../models/order.model");
const Product = require("../models/product.model");

function ProductController() {
  // Admin
  this.create = async (req, res) => {
    try {
      const { name, description, price, quantity, cost, categoryId, image } =
        req.body;
      const product = new Product({
        name,
        description,
        price,
        cost,
        quantity,
        categoryId,
        image,
      });
      await product.save();
      res.status(201).json({ message: "Created successfully", data: product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin/User
  this.getAll = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ data: products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin/User
  this.getById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Not Found!" });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin
  this.update = async (req, res) => {
    try {
      const { name, description, price, quantity, cost, categoryId, image } =
        req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, quantity, cost, categoryId, image },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Not Found!" });
      }
      res.status(200).json({
        message: "Updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin
  this.delete = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Not Found!" });
      }
      res.status(200).json({
        message: "Deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin/User
  this.getRemainingQuantity = async (req, res) => {
    try {
      const productId = req.params.id;

      const orders = await Order.find({ product: productId });
      const totalOrderedQuantity = orders.reduce(
        (total, order) => total + order.quantity,
        0
      );

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Not Found!" });
      }

      const remainingQuantity = product.quantity - totalOrderedQuantity;

      res.status(200).json({ remainingQuantity });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Tất cả sản phẩm tồn kho
  this.getInventoryProducts = async (req, res) => {
    try {
      const allProducts = await Product.find();
      const inventoryProducts = allProducts.filter(
        (product) => product.quantity > 0
      );
      res.status(200).json({ data: inventoryProducts });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  return this;
}

module.exports = new ProductController();
