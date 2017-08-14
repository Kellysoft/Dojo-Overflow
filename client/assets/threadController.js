app.controller('threadController', ['$scope', '$routeParams', 'threadFactory', 'homeFactory', function($scope, $routeParams, threadFactory, homeFactory){
  $scope.comment = false;
  $scope.reply = false;

  function currentUser(){
    homeFactory.currentUser(function(data){
      $scope.currentUser = data;
    })
  }
  currentUser();
  $scope.login = function(user){
    homeFactory.login(user, currentUser);
    $scope.user = {};
  }

  $scope.fbLogin = function(){
      FB.login(function(response) {
          if (response.authResponse) {
           FB.api('/me', function(response) {
             FB.api('/me', 'GET', {fields: 'first_name,last_name,name,email,id,picture.width(400).height(400)'}, function(response) {
                 var user = {};
                 user.first_name = response.first_name;
                 user.last_name  = response.last_name;
                 user.alias      = "";
                 user.email      = response.email;
                 user.password   = "12345678"
                 user.fb_id      = response.id
                 user.fb_token    = FB.getAuthResponse().accessToken;
                 homeFactory.fbLogin(user, currentUser)
             });
           });
          } else {
           console.log('User cancelled login or did not fully authorize.');
          }
      });
  }


  function getThread(id){
    threadFactory.getThread(id, function(data){
      $scope.thread = data;
    })
  }
  getThread($routeParams.id);

  $scope.createComment = function(newComment, id){
    threadFactory.createComment(newComment, id, getThread);
    $scope.newComment = {};
    $scope.comment = false;
  }

  $scope.createReply = function(newReply, id, callbackid){
    threadFactory.createReply(newReply, id, callbackid, getThread);
    $scope.newReply = {};
    $scope.reply = false;
  }

  $scope.upvoteThread = function(id){
    threadFactory.upvoteThread(id, getThread);
  }

  $scope.downvoteThread = function(id){
    threadFactory.downvoteThread(id, getThread);
  }

  $scope.upvoteComment = function(id, callbackid){
    threadFactory.upvoteComment(id, callbackid, getThread);
  }

  $scope.downvoteComment = function(id, callbackid){
    threadFactory.downvoteComment(id, callbackid, getThread);
  }

  $scope.upvoteReply = function(id, callbackid){
    threadFactory.upvoteReply(id, callbackid, getThread);
  }

  $scope.downvoteReply = function(id, callbackid){
    threadFactory.downvoteReply(id, callbackid, getThread);
  }

  $scope.deleteThread = function(id){
    threadFactory.deleteThread(id);
  }

  $scope.deleteComment = function(id, callbackid){
    threadFactory.deleteComment(id, callbackid, getThread);
  }

  $scope.deleteReply = function(id, callbackid){
    threadFactory.deleteReply(id, callbackid, getThread);
  }
}])
