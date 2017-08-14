var app = angular.module('app', ['ngRoute', 'ngMessages']);

window.fbAsyncInit = function() {
  FB.init({
    appId      : '315197785530461',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'homeController'
  })
  .when('/registration', {
    templateUrl: 'partials/registration.html',
    controller: 'homeController'
  })
  .when('/chat', {
    templateUrl: 'partials/chat.html',
    controller: 'chatController'
  })
  .when('/board/:category', {
    templateUrl: 'partials/board.html',
    controller: 'boardController'
  })
  .when('/new_thread/:category', {
    templateUrl: 'partials/new_thread.html',
    controller: 'boardController'
  })
  .when('/thread/:id', {
    templateUrl: 'partials/thread.html',
    controller: 'threadController'
  })
  .when('/user/:id', {
    templateUrl: 'partials/user_detail.html',
    controller: 'userController'
  })
  .otherwise({
    redirectTo: '/'
  })
})
