const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const router = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { DB, SERVER_PORT } = require("./utils/config");
const cors = require("./middlewares/cors");

const app = express();

mongoose.connect(DB);
console.log(DB);
app.use(cors);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
