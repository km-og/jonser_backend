const auth = require("../middlewares/auth");
const groupsRouter = require("express").Router();

const {
  getGroups,
  createGroup,
  deleteGroups,
  // updateGroupsPrice,
} = require("../controllers/groups");
const {
  createGroupValidation,
  groupValidation,
  // updateGroupsValidation,
} = require("../middlewares/validation");

groupsRouter.get("/", getGroups);
groupsRouter.post("/", auth, createGroupValidation, createGroup);
// groupsRouter.patch("/:groupId", updateGroupsValidation, updateGroupsPrice);
groupsRouter.delete("/:groupId", auth, groupValidation, deleteGroups);

module.exports = groupsRouter;
