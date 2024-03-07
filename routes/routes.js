const router = require("express").Router();
const { sendForm } = require("../controllers/form");
const NotFoundErr = require("../errors/NotFoundErr");
const { loginAdmin, createAdmin } = require("../controllers/admin");
const productsRouter = require("./products");
const {
  signupValidation,
  signinValidation,
} = require("../middlewares/validation");
const groupsRouter = require("./groups.js");

router.post("/signup", signupValidation, createAdmin);
router.post("/signin", signinValidation, loginAdmin);
router.post("/send-form", sendForm);

// router.use("/products", productsRouter);
router.use("/products", productsRouter);
router.use("/groups", groupsRouter);

router.use("*", (req, res, next) => {
  next(new NotFoundErr("Данная страница не сущесвует"));
});

module.exports = router;
