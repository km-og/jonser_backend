const mongoose = require("mongoose");
const Group = require("../models/group");
const BadReqErr = require("../errors/BadReqErr");
const ForbiddenErr = require("../errors/ForbiddenErr");
const NotFoundErr = require("../errors/NotFoundErr");

const getGroups = (req, res, next) => {
  Group.find({})
    .then((groups) => {
      res.send({ data: groups });
    })
    .catch((err) => {
      next(err);
    });
};

const createGroup = (req, res, next) => {
  const { title, preview, route, description, order, videoReview } = req.body;
  console.log(req.body);
  Group.create({
    creator: req.user._id,
    title: title,
    preview: preview,
    route: route,
    description: description,
    order: order,
    videoReview: videoReview,
  })
    .then((group) => {
      console.log(group);
      res.status(200).send({ data: group });
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

const deleteGroup = (req, res, next) => {
  Group.findById(req.params.groupId)
    .orFail()
    .then((group) => {
      if (req.user._id === group.creator.toString()) {
        group
          .deleteOne()
          .then((delGroup) => {
            res.send({ data: delGroup });
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
        next(new NotFoundErr("Группа с указанным _id не найдена"));
        return;
      } else {
        next(err);
      }
    });
};

module.exports = {
  getGroups,
  createGroup,
  deleteGroup,
};
