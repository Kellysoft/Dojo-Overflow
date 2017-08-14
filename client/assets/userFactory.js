app.factory('userFactory', ['$http', '$location', function($http, $location){
  var factory = {};

  factory.getUser = function(id, callback){
    $http({
      url: '/user/' + id,
      method: "GET"
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }

  factory.update = function(updatedUser, id, callback){
      $http({
          url:'/user/' + id,
          method: 'POST',
          data: updatedUser
      }).then(function(res){
          callback()
          $location.url('/')
      })
  }

  factory.getUserThreads = function(id, callback){
      $http({
          url: '/user_threads/' + id,
          method: 'GET'
      }).then(function(res){
          callback(res.data);
      })
  }

  factory.getUserComments = function(id, callback){
      $http({
          url: '/user_comments/' + id,
          method: 'GET'
      }).then(function(res){
          callback(res.data);
      })
  }

  factory.getUserReplies = function(id, callback){
      $http({
          url: '/user_replies/' + id,
          method: 'GET'
      }).then(function(res){
          callback(res.data);
      })
  }

  factory.deleteUserThread = function(id, callback){
    $http({
      url: '/thread/' + id,
      method: 'DELETE'
    }).then(function(res){
      callback()
    }, function(res){
      console.log(res);
    })
  }

  factory.deleteUserComment = function(id, callback){
    $http({
      url: '/comment/' + id,
      method: 'DELETE'
    }).then(function(res){
      callback();
    }, function(res){
      console.log(res);
    })
  }

  factory.deleteUserReply = function(id, callback){
    $http({
      url: '/reply/' + id,
      method: 'DELETE'
    }).then(function(res){
      callback();
    },function(res){
      console.log(res);
    })
  }

  factory.getKarma = function(id, callback){
    $http({
      url: '/karma/' + id,
      method: "GET"
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }
  return factory;
}])
