const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const pg = require("pg");
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

var local_config = {
  user: 'root',
  host: 'localhost',
  database: 'ccomm',
  port: 26257
};
/*
var config = {
  user: 'smaltese',
  password: 'password',
  host: 'aws-us-west-2.db-gao-tsay-2.crdb.io',
  database: 'defaultdb',
  port: 26257,
  ssl: {
       ca: fs.readFileSync('certs/ca.crt').toString()
       }
};
*/


var pool = new pg.Pool(local_config);

app.use(
  "/assets",
  express.static(path.join(__dirname, "/assets"))
);
app.get("/", (request, result) => {
  result.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/editor", (request, result) => {
  result.sendFile(path.join(__dirname + "/code_editor.html"));
});
app.get("/signup", (request, result) => {
  result.sendFile(path.join(__dirname + "/signin.html"));
});

app.post("/newuser", (request, result) => {
  result.send("Signed up!");
  pool.connect(function (err, client, done) {
    var test = 1;
    console.log(request.body.username)
    var qry = "INSERT INTO ccomm.users (username, karma, answers, questions, id) VALUES ('" + request.body.username + "', 0, 0, 0, default)";
    console.log(qry);
    client.query(qry, done);
  }); 
});

app.get("/tasks", (request, result) => {
  result.sendFile(path.join(__dirname + "/task_selector.html"));
});

app.listen(port, () => {
  console.log(`Server running! Listening on port ${port}.`);
});
