//jshint esversion:6
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

// Replace the uri string with your connection string.
mongoose.connect("mongodb://localhost:27017/BlogDB");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = [];

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const messageSchema = new mongoose.Schema({
  title : String,
  text:  String
});

const Message = mongoose.model("Message", messageSchema);


app.get("/", async(res,req)=>{
   const posts  = await Message.find({});
  req.render("home",{Content:homeStartingContent, post:posts});
})

app.get("/about", function(res,req){
  req.render("about",{Content:aboutContent})
})

app.get("/contact", function(res,req){
  req.render("contact",{Content:contactContent})
})

app.get("/compose", function(res,req){
  req.render("compose")

})

app.get("/posts/:postId", async(request,response) => {
   const requestedPostId = request.params.postId;
   const found = await Message.findOne({_id:requestedPostId})
   console.log(found.title);
  
     if(found !== null){
      response.render("post", {
        title: found.title,
        text: found.text
      });
     }
     express.response.redirect("/");
    });
   
  

app.post("/post", function(request,response){
   const textTitle = request.body.input;
   const textContent = request.body.textarea;
 
   //posts.push(result);
   const receivedText = new Message({
    title: textTitle,
    text: textContent
   });
  receivedText.save();
  response.redirect("/")
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
