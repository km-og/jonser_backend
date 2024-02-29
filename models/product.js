const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
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
    text: {
      type: String,
      minlength: [2, "Минимальная длина поля 'description' - 2"],
    },
  },
  // collection: {
  //   //вместо _id
  //   type: String,
  //   required: [true, "Поле 'collection' должно быть заполнено"],
  //   minlength: [2, "Минимальная длина поля 'collection' - 2"],
  // },
  subtitle: {
    type: String,
    required: [true, "Поле 'subtitle' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'subtitle' - 2"],
  },
  premium: {
    type: Boolean,
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
      id: String,
    },
  ],
  detailed: {
    images: [
      {
        link: {
          type: String,
          required: [true, "Поле 'img' должно быть заполнено"],
          validate: {
            validator: (v) => validator.isURL(v),
            message: "Некорректный URL",
          },
        },
        id: String,
      },
    ],
    fullNameModel: {
      type: String,
      required: [true, "Поле 'fullNameModel' должно быть заполнено"],
      minlength: [2, "Минимальная длина поля 'fullNameModel' - 2"],
    },
    movieLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректный URL",
      },
    },
    specifications: [
      {
        parameter: String,
        value: String,
        id: String,
      },
    ],
    equipment: [
      {
        parameter: String,
        value: String,
        id: String,
      },
    ],
    advantages: [
      {
        parameter: String,
        id: String,
      },
    ],
    sale: {
      type: String,
      required: [true, "Поле 'sale' должно быть заполнено"],
      minlength: [2, "Минимальная длина поля 'sale' - 2"],
    },
    newPrice: {
      type: String,
      required: [true, "Поле 'newPrice' должно быть заполнено"],
      minlength: [2, "Минимальная длина поля 'newPrice' - 2"],
    },
    oldPrice: {
      type: String,
      required: [true, "Поле 'oldPrice' должно быть заполнено"],
      minlength: [2, "Минимальная длина поля 'oldPrice' - 2"],
    },
  },
});

module.exports = mongoose.model("product", productSchema);
