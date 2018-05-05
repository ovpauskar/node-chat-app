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

    socket.broadcast.emit("newMessage",{
      name: message.name,
      address: message.address
    })
  });

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit("newMessage",{
    from: "Admin",
    text: "New User joined",
    createdAt:new Date().getTime()
    });
});

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
