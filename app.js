require("dotenv").config();
const express = require("express");

// mongo db session configure
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
// flash msg configure
const flash = require("connect-flash");
// bind  User With Req
const bindUserWithReq = require("./middlewares/bindUserWithReq");
bindUserWithReq;
// set local is used to access the value we store in res.locals to access in template engine
const setLocals = require("./middlewares/setLocals");

// configure app
const app = express();

// configure view engine
app.set("view engine", "ejs");
app.set("views", "views");

// mongo db store
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "mySessions",
  expires: 1000 * 60 * 60 * 2,
});

//middlewares
const middlewares = [
  express.static("public"),
  express.urlencoded({
    extended: true,
  }),
  express.json(),
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithReq(),
  setLocals(),
  flash(),
];
// initialize middlewares
app.use(middlewares);

// use routes
app.use("/user", require("./routes/user"));
app.use("/blog", require("./routes/blog"));

// always redirect to /blog if the user hit /
app.get("/", (req, res) => {
  res.redirect("/blog");
});

//handle error route
app.use((req, res, next) => {
  let error = new Error("404 page not found");
  error.status = 404;
  next(error);
});

// handle error pages
app.use((error, req, res, next) => {
  if (error.status == 404) {
    res.send("<h6>404 page not found!!</h6>");
  } else {
    res.send("<h6>500 server error!!</h6>");
  }
});

// define port number
const PORT = process.env.PORT || 8000;

// connect mongodb and start app
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
