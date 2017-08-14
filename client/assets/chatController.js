app.controller('chatController', ['$scope', 'chatFactory', function($scope, chatFactory){
  var socket = io.connect();
  function currentUser(){
    chatFactory.currentUser(function(data){
      $scope.currentUser = data;
      if($scope.currentUser == ""){
          $scope.currentUser = {}
          $scope.currentUser.alias = prompt("Enter an alias")
          console.log($scope.currentUser.alias);
      }
      socket.emit('new_user', {name: $scope.currentUser.alias})
    })
  }
  console.log($scope.test);
  currentUser();
  $scope.logOut = function(){
      socket.emit('user_clicked_home')
  }
  $('form').submit(function(e){
      e.preventDefault();
      socket.emit('send_message', {name:$scope.currentUser.alias, message: $('#message').val()})
      $('#message').val('');
  });
  socket.on('load_messages', function(data){
      for(var i = 0; i < data.messages.length; i++){
          $('#display').append("<p>" + data.messages[i] + "</p>")
      }
  });
  socket.on('user_added', function(data){
      console.log(data);
      $('#display').append("<p class='green'>" + data.name + " just joined the chat</p>")
  });
  socket.on('new_message', function(data){
      $('#display').append("<p>" + data.name + ": " + data.message + "</p>")
  })

  socket.on('user_names',function(data){
     console.log("all users", data)
     var htmlstr = ''
     for(var i = 0; i < data.name.length; i++){
          htmlstr += ('<p class="all_user" >' + data.name[i].name +'</p><br>')
     }
     $('#user_list').html(htmlstr);
})

  socket.on('user_disconnected',function(data){
      $('#display').append('<p class="red">' + data.name + 'has left the chat</p>')
  })
  $scope.$on("$locationChangeStart", function(){
      socket.disconnect();
  });
}])
