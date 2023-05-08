// This file should set up the express server as shown in the lecture code
import express from "express";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/public");

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  next();
};

const app = express();

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main',helpers:{
  ifCond: function(v1, operator, v2) {
    switch (operator) {
      case '==':
        return (v1 == v2)
      case '===':
        return (v1 === v2)
      case '!=':
        return (v1 != v2)
      case '!==':
        return (v1 !== v2)
      case '<':
        return (v1 < v2)
      case '<=':
        return (v1 <= v2)
      case '>':
        return (v1 > v2)
      case '>=':
        return (v1 >= v2)
      case '&&':
        return (v1 && v2)
      case '||':
        return (v1 || v2)
      default:
        return false;
    }}}}))

app.set('view engine', 'handlebars');

import session from 'express-session';
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: false,
  })
);

import {
  logger,
  redirectLogin,
  redirectSignup,
  redirectLogout,
  redirectProfile,
  redirectEditEvent,
  redirectCreateEvent,
  sanitizeUserInput,
} from "./middleware.js";

app.use(logger);
app.use(sanitizeUserInput);
app.get("/login", redirectLogin);
app.get("/signup", redirectSignup);
app.get("/landing", (req, res, next) => {
  if (!req.session) {
    return res.redirect("/login");
  }
  next();
});

app.get("/logout", redirectLogout);
app.get("/profile", redirectProfile);
app.get("/event/edit/:id", redirectEditEvent());
app.get("/event/create", redirectCreateEvent());

configRoutes(app);

const server = app.listen(3000, async () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
  // await dbConnection()
});

server.on("exit", async (stream) => {
  // await closeConnection()
});
