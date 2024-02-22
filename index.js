const express = require("express");
// const mongoose = require("mongoose");

const cors = require("./middlewares/cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes/routes");

const PORT = 3001;

const app = express();

// mongoose.connect("mongodb://localhost:27017/jonser", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
