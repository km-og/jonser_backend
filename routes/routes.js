const router = require("express").Router();
const { sendForm } = require("../controllers/form");
const NotFoundErr = require("../errors/NotFoundErr");
const { loginAdmin, createAdmin } = require("../controllers/admin");
const modelsRouter = require("./models.js");
const {
  signupValidation,
  signinValidation,
} = require("../middlewares/validation");
const groupsRouter = require("./groups.js");

router.post("/signup", signupValidation, createAdmin);
router.post("/signin", signinValidation, loginAdmin);
router.post("/send-form", sendForm);

router.use("/models", modelsRouter);
router.use("/groups", groupsRouter);

router.use("*", (req, res, next) => {
  next(new NotFoundErr("Данная страница не сущесвует"));
});

module.exports = router;
