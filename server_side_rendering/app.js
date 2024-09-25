const userModel = require('./models/user');
const path = require('path');
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
  res.render("index");
})


app.get('/read',async (req, res) => {
  users = await userModel.find();
  res.render("read", {users});
})

app.post('/update/:userId',async (req, res) => {
  let {username, email, imageUrl} = req.body;
  await userModel.findOneAndUpdate({_id: req.params.userId}, {username, email,imageUrl});
  res.redirect("/read");
})

app.get('/delete/:userId',async (req, res) => {
  let user = await userModel.findOneAndDelete({_id: req.params.userId});
  res.redirect("/read");
})

app.get('/edit/:userId',async (req, res) => {
  let user = await userModel.findOne({_id: req.params.userId});
  res.render("edit", {user});
})

app.post('/create',async (req, res) => {
  let {username, email, imageUrl} = req.body;
  let createdUser = await userModel.create({
    username,
    email,
    imageUrl
  });

  res.redirect("/read");
})

app.listen(4000);