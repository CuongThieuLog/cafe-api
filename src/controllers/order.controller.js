const Order = require("../models/order.model");
const Product = require("../models/product.model");

function OrderController() {
  // Tạo đơn hàng
  this.create = async (req, res) => {
    try {
      const { products, shippingAddress } = req.body;
      const userId = req.user._id;

      let total = 0;
      const orderProducts = [];

      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: "Not Found!" });
        }
        total += product.price * item.quantity;
        orderProducts.push({
          product: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      const order = new Order({
        user: userId,
        products: orderProducts,
        total,
        shippingAddress,
        status: "PENDING",
      });

      await order.save();

      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.quantity -= item.quantity;
          await product.save();
        }
      }

      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  };

  // Lấy ra các đơn hàng của user đó (hoặc theo prams gửi lên các status)
  this.getAllOrdersForCurrentUser = async (req, res) => {
    try {
      // const userId = req.user._id;
      const userId = req.params.id;
      let query = { user: userId };
      const status = req.query.status;
      if (
        status &&
        ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"].includes(
          status
        )
      ) {
        query.status = status;
      }
      const orders = await Order.find(query);
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  };

  // Cập nhật trạng thái của đơn hàng
  this.updateOrderStatus = async (req, res) => {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Not Found!" });
      }

      order.status = status;
      await order.save();

      res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  };

  return this;
}

module.exports = new OrderController();
