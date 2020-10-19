const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const username = "dbAdmin";
const password = "Abc123456";
const dbname = "SE-Database";

// Import Routes
const usersRoute = require("./server_files/server_routes/users");
const articlesRoute = require("./server_files/server_routes/articles");
const methodologiesRoute = require("./server_files/server_routes/methodologies");
const methodsRoute = require("./server_files/server_routes/methods");
const researchMethodsRoute = require("./server_files/server_routes/research_methods");
const researchParticipantsRoute = require("./server_files/server_routes/research_participants");
const searchRoute = require("./server_files/server_routes/search");

// Middleware
app.use(cors());
/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));
/* parse application/json */
app.use(bodyParser.json());

// Setup the Routes
app.use("/users", usersRoute);
app.use("/articles", articlesRoute);
app.use("/methodologies", methodologiesRoute);
app.use("/methods", methodsRoute);
app.use("/research_methods", researchMethodsRoute);
app.use("/research_participants", researchParticipantsRoute);
app.use("/search_article", searchRoute);

// Setting up Files with the Build
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.get("/static/js/:file", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/static/js/" + req.params.file));
});

app.get("/static/css/:file", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/static/css/" + req.params.file));
});

app.get("/static/media/:file", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/static/media/" + req.params.file));
});

app.get("/:file", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/" + req.params.file));
});

// Connect to DB
// mongoose.connect(
//   `mongodb+srv://${username}:${password}@se-cluster.e94oc.mongodb.net/${dbname}?retryWrites=true&w=majorityCopy`,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to DB!");
//   }
// );

console.log(PORT);
app.listen(PORT);
