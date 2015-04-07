// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: {},

  init: function(){
    $('#send').on('submit', function(ev){
      ev.preventDefault();
      app.handleSubmit();
    });
    $('#main').on('click', '.username', function(ev){
      app.addFriend(ev);
    });
    app.fetch();
    setInterval(function(){
      app.fetch();
    }, 10000);
  },

  deinit: function(){
    $('#send').off();
    $('#main').off();
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
        app.boldFriends();
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

  addFriend: function(friend){
    var username = $(friend.target).data('username');
    app.friends[username] = username;
    app.boldFriends();
  },

  boldFriends: function(){
    $('#chats').children().each(function(i, msg){
      var username = $(msg).find('.username').data('username');
      if(username in app.friends){
        $(msg).addClass('friend');
      }
    });
  },

  handleSubmit: function(){
    var submittedMsg = {
      username: window.location.search.split('username=')[1],
      text: $('#message').val(),
      room: ''
    };
    $('#message').val('');
    app.send(submittedMsg);
  }
};
