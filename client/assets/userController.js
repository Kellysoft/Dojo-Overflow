app.controller('userController', ['$scope', '$routeParams', 'userFactory', 'homeFactory', function($scope, $routeParams, userFactory, homeFactory){
    $scope.update = function(updatedUser){
        userFactory.update(updatedUser, $scope.currentUser._id, currentUser)
    }

    function currentUser(){
      homeFactory.currentUser(function(data){
        $scope.currentUser = data;
      })
    }
    currentUser();

  function getUser(id){
    userFactory.getUser(id, function(data){
      $scope.user = data;
      // currentUser();
      if($scope.user._id == $scope.currentUser._id){
          $scope.auth = true;
          $scope.updatedUser = {
              alias : $scope.user.alias,
              first_name : $scope.user.first_name,
              last_name : $scope.user.last_name
          }
      } else {
          $scope.auth = false;
      }
      if($scope.user.fb_id){
          $scope.fb = true;
      } else {
          $scope.fb = false;
      }
    })
  }
  getUser($routeParams.id);

  $scope.getUserThreads = function(){
      userFactory.getUserThreads($routeParams.id, function(data){
          $scope.threads = data;
          $scope.view_threads = true;
          $scope.view_comments = false;
          $scope.view_replies = false;
      })
  }

  $scope.getUserComments = function(){
      userFactory.getUserComments($routeParams.id, function(data){
          $scope.comments = data;
          $scope.view_comments = true;
          $scope.view_threads = false;
          $scope.view_replies = false;
      })
  }

  $scope.getUserReplies = function(){
      userFactory.getUserReplies($routeParams.id, function(data){
          $scope.replies = data;
          $scope.view_replies = true;
          $scope.view_threads = false;
          $scope.view_comments = false;
      })
  }

  $scope.deleteThread = function(id){
    userFactory.deleteUserThread(id, $scope.getUserThreads);
  }

  $scope.deleteComment = function(id, user_id){
    userFactory.deleteUserComment(id, $scope.getUserComments);
  }

  $scope.deleteReply = function(id, user_id){
    userFactory.deleteUserReply(id, $scope.getUserReplies);
  }

  function getKarma(id){
    userFactory.getKarma(id, function(data){
      $scope.karma = data.karma;
    })
  }
  getKarma($routeParams.id);

  $scope.edit = false;
}])
