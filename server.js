const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const code = `Welcome to InstaLink! 
Create a file and instatley share your link 
with anyone around the world!`;
  res.render("code-display", { code: "This is the code" });
});

app.listen(3000);
