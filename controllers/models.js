const mongoose = require("mongoose");
const Model = require("../models/model");
const BadReqErr = require("../errors/BadReqErr");
const ForbiddenErr = require("../errors/ForbiddenErr");
const NotFoundErr = require("../errors/NotFoundErr");

const getModels = (req, res, next) => {
  Model.find({})
    .then((models) => {
      res.send({ data: models });
    })
    .catch((err) => {
      next(err);
    });
};

const createModel = (req, res, next) => {
  const {
    title,
    description,
    subtitle,
    premium,
    isHorizontal,
    nameModel,
    nameProduct,
    preview,
    titleParams,
    images,
    movieLink,
    specifications,
    equipment,
    advantages,
    newPrice,
    oldPrice,
  } = req.body;

  Model.create({
    creator: req.user._id,
    title: title,
    description: description,
    subtitle: subtitle,
    premium: premium,
    isHorizontal: isHorizontal,
    nameModel: nameModel,
    nameProduct: nameProduct,
    preview: preview,
    titleParams: titleParams,
    images: images,
    movieLink: movieLink,
    specifications: specifications,
    equipment: equipment,
    advantages: advantages,
    newPrice: newPrice,
    oldPrice: oldPrice,
  })
    .then((model) => {
      res.status(200).send({ data: model });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadReqErr("Переданы некорректные данные карточки"));
        return;
      } else {
        next(err);
      }
    });
};

const deleteModel = (req, res, next) => {
  Model.findById(req.params.modelId)
    .orFail()
    .then((model) => {
      if (req.user._id === model.creator.toString()) {
        model
          .deleteOne()
          .then((delModel) => {
            res.send({ data: delModel });
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

const updateModelPrice = (req, res, next) => {
  const { newPrice, oldPrice } = req.body;
  console.log(newPrice);
  console.log(oldPrice);
  Model.findByIdAndUpdate(
    req.params.modelId,
    { newPrice, oldPrice },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((model) => {
      res.send({ data: model });
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
  getModels,
  createModel,
  deleteModel,
  updateModelPrice,
};
