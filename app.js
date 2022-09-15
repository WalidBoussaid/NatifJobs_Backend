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
const offerRouter = require("./routes/offer");
const loginRouter = require("./routes/login");
const roleRouter = require("./routes/role");
const registerLoginRouter = require("./routes/registerLogin");
const categoryRouter = require("./routes/cetegory");
const typeOfferRouter = require("./routes/typeOffer");
const cityRoutter = require("./routes/city");
const candidateRouter = require("./routes/candidate");
const employerRouter = require("./routes/employer");
const historyCandidateRouter = require("./routes/historyCandidate");
const notifEmployerRouter = require("./routes/notificationEmployer");
const historyEmployerRouter = require("./routes/historyEmployer");

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
app.use("/registerLogin", registerLoginRouter);
app.use("/category", categoryRouter);
app.use("/typeOffer", typeOfferRouter);
app.use("/city", cityRoutter);
app.use("/candidate", candidateRouter);
app.use("/employer", employerRouter);
app.use("/historyCandidate", historyCandidateRouter);
app.use("/notifEmployer", notifEmployerRouter);
app.use("/historyEmployer", historyEmployerRouter);

module.exports = app;
