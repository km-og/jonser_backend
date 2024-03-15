require("dotenv").config();

const { NODE_ENV, JWT_SECRET, DB_HOST, PORT } = process.env;

const DEV_SECRET =
  "8cd832907d38106e39f4c864d944fe7318812cf5c43cf40fe15a06206e00dcac";
// const DEV_SECRET = "SECRETSECRETSECRET";
const DEV_DB_HOST = "mongodb://127.0.0.1:27017/jonser";
const DEV_PORT = 3001;

const DB = NODE_ENV === "production" && DB_HOST ? DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === "production" && PORT ? PORT : DEV_PORT;

const SECRET_STRING =
  NODE_ENV === "production" && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = { NODE_ENV, DB, SERVER_PORT, SECRET_STRING };
