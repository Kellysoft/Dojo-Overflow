app.factory('chatFactory', ['$http', function ($http) {
  var factory = {};
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

  return factory;
}])
