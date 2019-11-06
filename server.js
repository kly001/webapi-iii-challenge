const express = require('express');
const morgan = require("morgan");
const userRouter = require("./users/userRouter.js")
const server = express();


server.use(express.json());
server.use(logger)
server.use(morgan("dev"));
server.use("/api/users", userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`logger info: METHOD => URL: ${req.method} => ${req.url} [Timestamp: ${new Date().toISOString()}]`)
  next()
}

module.exports = logger

module.exports = server;
