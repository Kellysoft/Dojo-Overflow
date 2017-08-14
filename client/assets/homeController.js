app.controller('homeController', ['$scope', 'homeFactory', function($scope, homeFactory){
  
  function currentUser(){
    homeFactory.currentUser(function(data){
      $scope.currentUser = data;
    })
  }
  currentUser();

  function getGeneralThreads(){
    homeFactory.getGeneralThreads(function(data){
      $scope.GeneralThreads = data;
    })
  }
  getGeneralThreads();

  function getMeetupThreads(){
    homeFactory.getMeetupThreads(function(data){
      $scope.MeetupThreads = data;
    })
  }
  getMeetupThreads();

  function getJobThreads(){
    homeFactory.getJobThreads(function(data){
      $scope.JobThreads = data;
    })
  }
  getJobThreads();

  $scope.register = function(user){
    homeFactory.register(user);
    $scope.user = {};
  }

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
}])
