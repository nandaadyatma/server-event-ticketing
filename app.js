const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// router
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");
const organizerRouter = require("./app/api/v1/organizers/router");
const authRouter = require("./app/api/v1/auth/router");

const v1 = "/api/v1/cms";

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

// setup timestampt on morgan logger
function formatWithIntl(isoString) {
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-GB", options)
    .format(date)
    .replace(",", "");
}

logger.token("timestamp", () => {
  const date = new Date().toISOString();
  return formatWithIntl(date);
});

// app.use(logger('dev'));
app.use(logger(":timestamp :method :url :status :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use(v1, categoriesRouter); //use(path, middlewareFunction)
app.use(v1, imagesRouter); //use(path, middlewareFunction)
app.use(v1, talentsRouter); //use(path, middlewareFunction)
app.use(v1, eventsRouter); //use(path, middlewareFunction)
app.use(v1, organizerRouter); //use(path, middlewareFunction)
app.use(v1, authRouter); //use(path, middlewareFunction)

// user error middleware
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
