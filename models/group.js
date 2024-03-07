const mongoose = require("mongoose");
const validator = require("validator");

const groupSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Поле 'title' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'title' - 2"],
  },
  preview: {
    type: String,
    required: [true, "Поле 'preview' должно быть заполнено"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Некорректный URL",
    },
  },
  route: {
    type: String,
    required: [true, "Поле 'route' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'route' - 2"],
  },
  description: {
    type: String,
    minlength: [2, "Минимальная длина поля 'description' - 2"],
  },
  order: {
    type: Number,
    required: [true, "Поле 'order' должно быть заполнено"],
  },
  videoReview: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Некорректный URL",
    },
  },
});

module.exports = mongoose.model("group", groupSchema);
