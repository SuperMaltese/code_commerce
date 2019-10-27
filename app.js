const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

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
app.get("/tasks", (request, result) => {
  result.sendFile(path.join(__dirname + "/task_selector.html"));
});

app.listen(port, () => {
  console.log(`Server running! Listening on port ${port}.`);
});