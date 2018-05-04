const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
  console.log("Connected to new User!");

  socket.on("disconnect",()=>{
    console.log("User Disconnected!!");
  });

  socket.on("createMessage", (message)=>{
    console.log("Create Message:", message);
  });

  socket.emit("newMessage", {
    from:"Hippo",
    text:"yeah! I'm great.",
    createdAt: 12345
  });
});

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
