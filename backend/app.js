const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//ajouter apres
const createError = require("http-errors");

//routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const offerRouter = require("./routes/offre");
const loginRouter = require("./routes/login");
const roleRouter = require("./routes/role");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/offer", offerRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);

module.exports = app;
