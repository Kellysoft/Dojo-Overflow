app.factory('boardFactory', ['$http', '$location', function($http, $location){
  var factory = {};

  factory.createThread = function(newThread){
    $http({
      url: '/thread/create',
      method: "POST",
      data: newThread
    }).then(function(res){
      $location.url('/');
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.getThreads = function(category, callback){
    $http({
      url: '/threads/all/' + category,
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }

  return factory;
}])
