const mailer = require("../utils/nodemailer");

const sendForm = (req, res) => {
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
};

module.exports = {
  sendForm,
};
