const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const sanitizer = require('express-sanitizer')
router.use(sanitizer())
mongoose.connect('mongodb+srv://isha_121:1234@cluster0.k5vlr5f.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology:true})
.then(() => console.log("Connect to DB"))
.catch((error) => console.log(error));


const blogSchema = new mongoose.Schema({
  name: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now()}
})

let Blog = mongoose.model('Blog',blogSchema)


module.exports = router;
