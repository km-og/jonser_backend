const mongoose = require("mongoose");
const Group = require("../models/group");
const BadReqErr = require("../errors/BadReqErr");

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

const deleteGroups = (req, res, next) => {
  Group.findById(req.params.groupId)
    .orFail()
    .then((group) => {
      if (req.user._id === group.creator.toString()) {
        group
          .deleteOne()
          .then((delgroup) => {
            res.send({ data: delgroup });
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

// const updateGroupsPrice = (req, res, next) => {
//   const { name, price } = req.body;
//   Group.findByIdAndUpdate(
//     req.params.groupId,
//     { name, price },
//     {
//       new: true,
//       runValidators: true,
//     }
//   )
//     .orFail()
//     .then((group) => {
//       res.send({ data: group });
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.ValidationError) {
//         next(new BadReqErr("Переданы некорректные данные"));
//         return;
//       } else {
//         next(err);
//       }
//     });
// };

module.exports = {
  getGroups,
  createGroup,
  deleteGroups,
  // updateGroupsPrice,
};
