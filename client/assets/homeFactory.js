app.factory('homeFactory', ['$http', '$location', function($http, $location){
  var factory = {};

  factory.register = function(user){
    $http({
      url: '/register',
      method: 'POST',
      data: user
    }).then(function(res){
      $location.url('/');
    }, function(res){
      console.log(res);
    })
  }

  factory.login = function(user, callback){
    $http({
      url:'/login',
      method: 'POST',
      data: user
    }).then(function(res){
      callback();
      $location.url('/');
    }, function(res){
      console.log(res);
    })
  }

  factory.fbLogin = function(user, callback){
      $http({
          url: '/fblogin',
          method: 'POST',
          data: user
      }).then(function(res){
          callback();
          $location.url('/');
      }, function(res){
          console.log(res);
      })
  }

  factory.currentUser = function(callback){
    $http({
      url:'/current',
      method: "GET"
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }

  factory.getGeneralThreads = function(callback){
    $http({
      url: '/threads/' + 'General',
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }

  factory.getMeetupThreads = function(callback){
    $http({
      url: '/threads/' + 'Meetups',
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }

  factory.getJobThreads = function(callback){
    $http({
      url: '/threads/' + 'Jobs',
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }

  return factory;
}])
