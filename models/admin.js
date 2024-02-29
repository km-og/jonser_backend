const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UnauthErr = require("../errors/UnauthErr");

const adminSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "Поле 'login' должно быть заполнено"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Поле 'password' должно быть заполнено"],
      select: false,
    },
  },
  { versionKey: false }
);

adminSchema.statics.findAdminByCredentials = function (login, password) {
  return this.findOne({ login })
    .select("+password")
    .then((admin) => {
      if (!admin) {
        return Promise.reject(new UnauthErr("Неправильные логин или пароль"));
      } else {
        return bcrypt.compare(password, admin.password).then((matched) => {
          if (!matched) {
            return Promise.reject(
              new UnauthErr("Неправильные логин или пароль")
            );
          } else {
            return admin;
          }
        });
      }
    });
};

module.exports = mongoose.model("admin", adminSchema);
