const auth = require("../middlewares/auth");
const groupsRouter = require("express").Router();

const {
  getGroups,
  createGroup,
  deleteGroup,
} = require("../controllers/groups");
const {
  createGroupValidation,
  groupValidation,
} = require("../middlewares/validation");

groupsRouter.get("/", getGroups);
groupsRouter.post("/", auth, createGroupValidation, createGroup);
groupsRouter.delete("/:groupId", auth, groupValidation, deleteGroup);

module.exports = groupsRouter;
