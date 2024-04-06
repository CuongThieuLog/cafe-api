let router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");
const roleAdmin = require("../middleware/admin.middleware");

//private
router.post("/", auth, OrderController.create);
router.get("/user/:id", auth, OrderController.getAllOrdersForCurrentUser);
router.put(
  "/update-status/:id",
  auth,
  roleAdmin,
  OrderController.updateOrderStatus
);

module.exports = router;
