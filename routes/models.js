const auth = require("../middlewares/auth");
const modelsRouter = require("express").Router();
const {
  getModels,
  createModel,
  deleteModel,
  updateModelPrice,
} = require("../controllers/models");
const {
  createModelValidation,
  updateModelValidation,
  modelValidation,
} = require("../middlewares/validation");

modelsRouter.get("/", getModels);
modelsRouter.post("/", auth, createModelValidation, createModel);
modelsRouter.delete("/:modelId", auth, modelValidation, deleteModel);
modelsRouter.patch("/:modelId", updateModelValidation, updateModelPrice);

module.exports = modelsRouter;
