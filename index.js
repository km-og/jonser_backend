const express = require("express");
const mongoose = require("mongoose");

const cors = require("./middlewares/cors");
const { errors } = require("celebrate");
const mailer = require("./nodemailer");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const PORT = 3001;

const app = express();

mongoose.connect("mongodb://localhost:27017/jonser", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// app.get("/", (req, res) => {
//   res.send(`<html><body><p>Сервер работает</p></body></html>`);
// });

app.post("/send-form", (req, res) => {
  const { userName, userTel, category } = req.body;

  if (!userName || !userTel) {
    return res.sendStatus(400).send({ message: "Что-то пошло не так..." });
  }

  const mess = {
    from: "<test_testovich2024@mail.ru>",
    // to: "mikniy@gmail.com",
    to: "agromash.msk@gmail.com",
    subject: "Получена заявка с сайта",
    text: `Получена заявка с сайта https://jonser.ru/
    
    Данные из формы:

    ФИО контактного лица:  ${userName}
    Контактный телефон: ${userTel}
    Выбранная категория: ${category}
    
    `,
  };
  mailer(mess);

  res.send({ message: "Заявка отправлена успешно!" });
});

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
