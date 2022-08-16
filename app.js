require("dotenv").config();
const express = require("express");

// configure app
const app = express();

// configure view engine
app.set("view engine", "ejs");
app.set("views", "views");

//middlewares
const middlewares = [
  express.static("public"),
  express.urlencoded({
    extended: true,
  }),
  express.json(),
];
// initialize middlewares
app.use(middlewares);

// use routes
app.use("/auth", require("./routes/auth"));
app.use("/blog", require("./routes/blog"));

const PORT = 7000;

app.listen(PORT, () => {
  console.log("App is running on port =>", PORT);
});
