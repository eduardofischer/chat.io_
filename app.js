//Requirements
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");

//Configs
app.set("view engine", "ejs");
app.use(express.static("public"));

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.get("/", function(req, res){
  res.render("index");
});

app.post("/entrar", function(req, res){
  res.render("chat", {data: req.body});
});

//Socket.IO
io.on("connection", function(socket){
  socket.on("chat message", function(data){
    io.emit("chat message", {msg: data.msg, nick: data.nick, color: data.color});
  });
});

//Server listen
const port = 3000;
app.listen(port, function(){
  console.log(`Server up and running at http://localhost:${port}`);
});
