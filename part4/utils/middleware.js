const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "Unkown EndPoint" });
};

const errorHandler = (req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
    return next();
  }
  req.token = null;
  return next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    req.user = null;
  } else {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      req.user = user;
    } else {
      req.user = await User.findById(decodedToken.id);
    }
  }
  next();
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
