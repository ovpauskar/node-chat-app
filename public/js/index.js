var socket= io();

socket.on("connect", function() {
  console.log("Connected to Server!");

});

socket.on("disconnect", function() {
  console.log("Disconnected from the Server!!");
});

socket.on("newMessage", function(message) {
  console.log("New Message:", message);
});
