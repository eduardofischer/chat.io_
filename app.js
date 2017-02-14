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
  console.log(req.body);
  res.render("chat", {data: req.body});
});

//Socket.IO
io.on("connection", function(socket){
  var clientIp = socket.request.connection.remoteAddress.replace(/^.*:/, '');
  if(clientIp == 1) clientIp = "127.0.0.1";
  // console.log(`New user CONNECTED: ${clientIp}`);

  socket.on("chat message", function(data){
    socket.broadcast.emit("chat message", {msg: data.msg, nick: data.nick, color: data.color});
  });

  socket.on('disconnect', function(){
    // console.log('A user DISCONNECTED');
  });
});

//Server listen
http.listen(3000, function(){
  console.log("Server up and running at port 3000");
});
