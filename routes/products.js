const auth = require("../middlewares/auth");
const productsRouter = require("express").Router();
const {
  // getProducts,
  createProducts,
  // deleteProducts,
  // updateProductsPrice,
} = require("../controllers/products");
const {
  createProductValidation,
  // updateProductValidation,
  // productValidation,
} = require("../middlewares/validation");

// productsRouter.get("/", getProducts);
productsRouter.post("/", auth, createProductValidation, createProducts);
// productsRouter.patch(
//   "/:productId",
//   updateProductValidation,
//   updateProductsPrice
// );
// productsRouter.delete("/:productId", productValidation, deleteProducts);

module.exports = productsRouter;
