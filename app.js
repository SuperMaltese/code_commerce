var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(
  "/",
  express.static(path.join(__dirname, "node_modules/codemirror"))
);

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

app.post('/myaction', function(req, res) {
  res.send('Code: <pre>' + req.body.code + '</pre>.');
});

app.listen(3000, function () {
  console.log('server running on port 3000');
});
