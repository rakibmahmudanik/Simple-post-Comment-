const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let newPost = {
    id: uuidv4(),
    username: username,
    content: content,
  };
  posts.push(newPost);
  res.redirect("http://localhost:8080/posts");
});

app.get("/posts/details/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  res.render("details.ejs", { post });
});

app.patch("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("http://localhost:8080/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id != p.id);
  res.redirect("http://localhost:8080/posts");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/posts`);
});
