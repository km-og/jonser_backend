const mongoose = require("mongoose");
const validator = require("validator");

const modelSchema = new mongoose.Schema({
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
  description: {
    type: String,
  },
  subtitle: {
    type: String,
    required: [true, "Поле 'subtitle' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'subtitle' - 2"],
  },
  premium: {
    type: String,
    required: [true, "Поле 'premium' должно быть заполнено"],
  },
  isHorizontal: {
    type: String,
    required: [true, "Поле 'premium' должно быть заполнено"],
  },
  nameModel: {
    type: String,
    required: [true, "Поле 'nameModel' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'nameModel' - 2"],
  },
  nameProduct: {
    type: String,
    required: [true, "Поле 'nameProduct' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'nameProduct' - 2"],
  },
  preview: {
    type: String,
    required: [true, "Поле 'preview' должно быть заполнено"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Некорректный URL",
    },
  },
  titleParams: [
    {
      param: String,
      value: String,
    },
  ],
  images: [
    {
      link: {
        type: String,
      },
    },
  ],

  movieLink: {
    type: String,
  },
  specifications: [
    {
      parameter: String,
      value: String,
    },
  ],
  equipment: [
    {
      parameter: String,
      value: String,
    },
  ],
  advantages: [
    {
      parameter: String,
    },
  ],

  newPrice: {
    type: Number,
    required: [true, "Поле 'newPrice' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'newPrice' - 2"],
  },
  oldPrice: {
    type: Number,
    required: [true, "Поле 'oldPrice' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'oldPrice' - 2"],
  },
});

module.exports = mongoose.model("model", modelSchema);
