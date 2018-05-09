var socket= io();

socket.on("connect", function() {
var params = jQuery.deparam(window.location.search);

socket.emit("join", params, function(err) {
  if(err){
    alert(err);
    window.location.href = "/";
  }else{
    console.log("No Error");
  }
});
});

socket.on("disconnect", function() {
  console.log("Disconnected from the Server!!");

});

socket.on("updateUserList", function(users){
var ol = jQuery("<ol></ol>");

users.forEach(function(user){
ol.append(jQuery("<li></li>").text(user));
});

jQuery("#users").html(ol);
});

socket.on("newMessage", function(message) {
  console.log("New Message:", message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
     text: message.text,
     from: message.from,
     createdAt: formattedTime
   });
 jQuery("#messages").append(html);
});

  socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});


jQuery("#message-form").on("submit", function(e){
  e.preventDefault();

  var messageTextbox= jQuery("[name=message]");
  socket.emit("createMessage",{
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val("");
  });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function(){
  if(!navigator.geolocation){
    alert("Your browser does ot support geolocation!");
  }
  locationButton.attr("disabled", "disabled").text("Sending location...");
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr("disabled").text("Send location");
      socket.emit("createLocation",{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function(){
  locationButton.removeAttr("disabled").text("Send location");
  alert("Unable to fetch the location");
});
});
