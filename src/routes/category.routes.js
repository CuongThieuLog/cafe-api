let router = require("express").Router();
const CategoryController = require("../controllers/category.controller");
const auth = require("../middleware/auth.middleware");
const roleAdmin = require("../middleware/admin.middleware");

//private
router.get("/", auth, CategoryController.getAll);
router.post("/", auth, roleAdmin, CategoryController.create);
router.get("/:id", auth, CategoryController.getById);
router.put("/:id", auth, roleAdmin, CategoryController.update);
router.delete("/:id", auth, roleAdmin, CategoryController.getById);

module.exports = router;
