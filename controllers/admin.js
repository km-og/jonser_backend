const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const BadReqErr = require("../errors/BadReqErr");
const ConflictErr = require("../errors/ConflictErr");
const { NODE_ENV, SECRET_STRING } = require("../utils/config");

const createAdmin = (req, res, next) => {
  const { login, password } = req.body;
  if (!login || login !== "admin") {
    return next(new BadReqErr("Переданы некорректные данные пользователя"));
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      Admin.create({
        login,
        password: hash,
      })
        .then(() => {
          res.status(201).send({
            data: login,
          });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            next(new BadReqErr("Переданы некорректные данные пользователя"));
            return;
          } else if (err.code === 11000) {
            next(new ConflictErr("Пользователь с таким login уже существует"));
            return;
          } else {
            next(err);
            console.log(err);
          }
        });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const loginAdmin = (req, res, next) => {
  console.log(req.body);

  const { login, password } = req.body;
  if (!login || login !== "admin") {
    return next(new BadReqErr("Переданы некорректные данные пользователя"));
  }

  Admin.findAdminByCredentials(login, password)
    .then((admin) => {
      const token = jwt.sign(
        { _id: admin._id },
        NODE_ENV === "production" ? SECRET_STRING : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
      // res.cookie("jwt", token, {
      //   httpOnly: true,
      // });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createAdmin,
  loginAdmin,
};
