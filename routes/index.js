const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sanitizer = require("express-sanitizer");
const {v4: uuidv4} = require("uuid")
const path = require("path")
const fs = require("fs")
const cloudinary = require("cloudinary").v2;
router.use(sanitizer());
mongoose
  .connect(
    "mongodb+srv://isha_121:1234@cluster0.k5vlr5f.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connect to DB"))
  .catch((error) => console.log(error));

const blogSchema = new mongoose.Schema({
  name: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now() },
});

let Blog = mongoose.model("Blog", blogSchema);
router.get('/', (req, res) => {
  res.render('index', {foo: 'FOO', delimiter: '?'});
});

//Images are posted onto cloudinary and image URL's are stored into the database
//Created the post request for creating the blog
router.post("/addBlog", async (req, res) => {
  try {
    const rc_img = Buffer.from(req.body.image, "base64");
    let url = await new Promise(async (resolve, reject) => {
      await cloudinary.uploader
        .upload_stream({ format: "jpg" }, (err, res) => {
          if (err) {
            return res.status(500).send(
              "RC image upload error"
            );
          } else {
            resolve(res.url);
            // filteredBody.photo = result.url;
          }
        })
        .end(rc_img);
    });
    req.body.image = url;
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      "RC image upload error"
    );
  }
  const blog = new Blog({
    name: req.body.name,
    image: req.body.image,
    body: req.body.body,
  });

  try {
    const data = await blog.save();
    res.json(data);
  } catch (err) {
    res.send("Error " + err);
  }
});

module.exports = router;
