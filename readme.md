Бэкенд сайта https://jonser.ru/

Здесь происходит обработка формы обратной связи, отправка полученных данных на почту компании, и отображение сообщения пользователю о статусе отправки.
Функционал реализован с помощь модуля Node.js - nodemailer.

Настроила роуты в отдельном файле routes.js. Защитила роуты добавления товаров авторизацией, доступ открывается только администратору сайта.
Подключила базу данных MongoDB и использовала библиотеку Mongoose для работы с данными в БД как с JS-объектами.
Создала схему для моделей, групп товаров и админа, добавила валидацию схем. Настроила связи, чтобы доступ к редактированию карточек был только у админа.

Подключен модуль логирования - winston - и модуль-обертка express-winston.

Ссылка на сайт:
https://jonser.ru/

Репозиторий фронтенда:
https://github.com/km-og/jonser
