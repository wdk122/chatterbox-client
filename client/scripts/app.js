// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    $('#send').on('submit', function(ev){
      ev.preventDefault();
      app.handleSubmit();
    });
    $('#main').on('click', '.username', app.addFriend);
    app.fetch();
    setInterval(function(){
      app.fetch();
    }, 10000);
  },

  deinit: function(){
    $('#send').off();
  },

  send: function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      success: function(data){
        app.fetch();
      }
    });
  },

  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      data: {order: '-createdAt'},
      type: 'GET',
      success: function(data){
        app.clearMessages();
        var messages = data.results;
        messages.forEach(function(msg){
          app.addMessage(msg);
        });
      }
    });
  },

  clearMessages: function(){
    $('#chats').html('');
  },

  addMessage: function(message){
    var messageNode = $('<div>').attr('class', 'message');
    var username = '<span class="username" data-username="' + message.username + 
      '">' + message.username + ': </span>';
    var text = '<span class="text">' + _.escape(message.text) + '</span>';
    messageNode.html(username + text);
    $('#chats').append(messageNode);
  },

  addRoom: function(roomName){
    $('#roomSelect').append('<div>' + roomName + '</div>');
  },

  addFriend: function(){

  },

  handleSubmit: function(){
    debugger;
    var submittedMsg = {
      username: window.location.search.split('username=')[1],
      text: $('#message').val(),
      room: ''
    };
    console.log('test');
    app.send(submittedMsg);
  }
};
