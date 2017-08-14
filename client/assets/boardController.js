app.controller('boardController', ['$scope', '$routeParams', 'boardFactory', 'homeFactory', function($scope, $routeParams, boardFactory, homeFactory){
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

  $scope.category = $routeParams.category;

  $scope.createThread = function(newThread, category){
    newThread.category = category;
    boardFactory.createThread(newThread);
  }

  function getThreads(category){
    boardFactory.getThreads(category, function(data){
      $scope.threads = data;
      for(var i = 0; i < $scope.threads.length; i++){
        $scope.threads[i].score = $scope.threads[i].upvotes.length - $scope.threads[i].downvotes.length;
      }
    })
  }
getThreads($routeParams.category);

$scope.orderParam = '-score';
}])
