const mongoose = require("mongoose");
const Product = require("../models/product");

const getProducts = (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.send({ data: products });
    })
    .catch((err) => {
      next(err);
    });
};

const createProducts = (req, res, next) => {
  const {
    creator,
    // creatorId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    // trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  Product.create({
    creator: req.user._id,
    // creator: creatorId,
  }).then((product) => {
    res
      .status(200)
      .send({ data: product })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadReqErr("Переданы некорректные данные карточки"));
          return;
        } else {
          next(err);
        }
      });
  });
};

const deleteProducts = (req, res, next) => {
  Product.findById(req.params.productId)
    .orFail()
    .then((product) => {
      if (req.user._id === product.owner.toString()) {
        product
          .deleteOne()
          .then((delProduct) => {
            res.send({ data: delProduct });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenErr("Доступ к запрошенному ресурсу запрещен");
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundErr("Карточка с указанным _id не найдена"));
        return;
      } else {
        next(err);
      }
    });
};

const updateProductsPrice = (req, res, next) => {
  const { name, price } = req.body;
  Product.findByIdAndUpdate(
    req.params.productId,
    { name, price },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((product) => {
      res.send({ data: product });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadReqErr("Переданы некорректные данные"));
        return;
      } else {
        next(err);
      }
    });
};

module.exports = {
  getProducts,
  createProducts,
  deleteProducts,
  updateProductsPrice,
};
