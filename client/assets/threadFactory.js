app.factory('threadFactory', ['$http', '$location', function($http, $location){
  var factory = {};

  factory.getThread = function(id, callback){
    $http({
      url: '/thread/' + id,
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }

  factory.createComment = function(comment, id, callback){
    $http({
      url: '/comment/create/' + id,
      method: 'POST',
      data: comment
    }).then(function(res){
      callback(id);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.createReply = function(reply, id, callbackid, callback){
    $http({
      url: '/reply/create/' + id,
      method: 'POST',
      data: reply
    }).then(function(res){
      callback(callbackid);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.upvoteThread = function(id, callback){
    $http({
      url: '/upvote/thread/' + id,
      method: 'GET'
    }).then(function(res){
      callback(id);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.downvoteThread = function(id, callback){
    $http({
      url: '/downvote/thread/' + id,
      method: 'GET'
    }).then(function(res){
      callback(id);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.upvoteComment = function(id, callbackid, callback){
    $http({
      url: '/upvote/comment/' + id,
      method: 'GET'
    }).then(function(res){
      callback(callbackid);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.downvoteComment = function(id, callbackid, callback){
    $http({
      url: '/downvote/comment/' + id,
      method: 'GET'
    }).then(function(res){
      callback(callbackid);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.upvoteReply = function(id, callbackid, callback){
    $http({
      url: '/upvote/reply/' + id,
      method: 'GET'
    }).then(function(res){
      callback(callbackid);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.downvoteReply = function(id, callbackid, callback){
    $http({
      url: '/downvote/reply/' + id,
      method: 'GET'
    }).then(function(res){
      callback(callbackid);
    }, function(res){
      if(res.status === 401){
        alert("PLEASE LOG IN!");
      }
      console.log(res);
    })
  }

  factory.deleteThread = function(id){
    $http({
      url: '/thread/' + id,
      method: 'DELETE'
    }).then(function(res){
      $location.url('/');
    }, function(res){
      console.log(res);
    })
  }

  factory.deleteComment = function(id, callbackid, callback){
    $http({
      url: '/comment/' + id,
      method: 'DELETE'
    }).then(function(res){
      callback(callbackid);
    }, function(res){
      console.log(res);
    })
  }

  factory.deleteReply = function(id, callbackid, callback){
    $http({
      url: '/reply/' + id,
      method: 'DELETE'
    }).then(function(res){
      callback(callbackid);
    },function(res){
      console.log(res);
    })
  }

  return factory;
}])
