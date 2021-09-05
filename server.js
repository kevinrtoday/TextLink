const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wastebin", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  const code = `Welcome to TextLink!

Share your messages around the world.

Type what you want me to see, click "Save", and then copy the URL.
Send that URL to someone and they'll see what you see!


To start, click "New" at the top`;

  res.render("code-display", { code, language: "plaintext" });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (e) {
    res.render("new", { value });
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("new", { value: document.value });
  } catch (e) {
    res.redirect(`/${id}`);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);

    res.render("code-display", { code: document.value, id });
  } catch (e) {
    res.redirect("/");
  }
});

app.listen(3000);
