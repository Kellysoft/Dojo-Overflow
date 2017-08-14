var mongoose = require('mongoose');
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');
var bcrypt = require('bcryptjs');

module.exports = {
  register: function(req,res){
    var salt = bcrypt.genSaltSync(10);
    console.log(req.body);
    if(req.body.password === req.body.confirm_password && req.body.email === req.body.confirm_email){
      var hash = bcrypt.hashSync(req.body.password, salt)
      var user = new User({first_name:req.body.first_name, last_name:req.body.last_name, alias:req.body.alias, email:req.body.email, password:hash});
      user.save(function(err, data){
        if(err){
          res.status(400).send(err);
        }
        else{
          req.session.user = data;
          res.sendStatus(200);
        }
      })
    }
    else{
      res.sendStatus(400);
    }
  },

  login: function(req, res){
    User.findOne({email:req.body.email}, function(err, user){
      if(err){
        res.status(400).send(err);
      }
      else if (user.fb_id) {
          res.status(401).send("Login with facebook credentials")
      }
      else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          console.log(user.fb_id);
          req.session.user = user;
          res.sendStatus(200);
        }
      }
    })
  },

  fbLogin: function(req,res){
      var salt = bcrypt.genSaltSync(10);
      User.findOne({email: req.body.email}, function(err, user){
          if(user === null){
              console.log("User not found, registering user");
              console.log(salt, req.body.password);
              var hash = bcrypt.hashSync(req.body.password, salt)
              console.log(hash || "no hash");
              console.log("req.body:", req.body)
              var user = new User({first_name:req.body.first_name, last_name:req.body.last_name, alias:req.body.first_name, email:req.body.email, password:hash, fb_id:req.body.fb_id});
              user.save(function(err, data){
                if(err){
                  console.log(err);
                  res.status(400).send(err);
                }
                else{
                  req.session.user = data;
                  res.sendStatus(200);
                }
              })
          } else {
              req.session.user = user;
              res.sendStatus(200);
          }
      })
  },

  logout: function(req, res){
    req.session.destroy();
    res.redirect('/')
  },

  currentUser:function(req,res){
    res.json(req.session.user);
  },

  getUser: function(req,res){
    User.findOne({_id:req.params.id}, function(err, user){
      if(err){
        res.status(400).send(err);
      }
      else{
        res.json(user);
      }
    })
  },

  update: function(req,res){
      User.update({_id:req.params.id}, req.body, function(err, user){
          if(err){
              console.log(err);
              res.status(400).send("We messed up")
          } else {
              console.log("Updated");
              User.findOne({_id:req.params.id}, function(err,data){
                  if(err){
                      console.log(err);
                      res.sendStatus(400)
                  } else {
                      console.log(data);
                      req.session.user = data;
                      res.sendStatus(200)
                  }
              })
          }
      })
  },
  getUserThreads: function(req,res){
      Thread.find({_user: req.params.id}, function(err,data){
          if (err) {
              console.log(err);
              res.status(400).send("Couldn't find Threads")
          } else {
              console.log(data);
              res.json(data)
          }
      })
  },
  getUserComments: function(req,res){
      Comment.find({_user: req.params.id}).populate('_thread').exec(function(err,data){
          if (err) {
              console.log(err);
              res.status(400).send("Couldn't find Comments")
          } else {
              console.log("comments", data);
              res.json(data)
          }
      })
  },
  getUserReplies: function(req,res){
      Reply.find({_user: req.params.id}).populate({path:'_comment', populate:{path:'_user _thread'}}).exec(function(err,data){
          if (err) {
              console.log(err);
              res.status(400).send("Couldn't find Replies")
          } else {
              console.log("replies", data);
              res.json(data)
          }
      })
  },

  getKarma: function(req, res){
    Thread.find({_user:req.params.id}).count(function(err, count){
      if(err){
        res.status(400).send(err);
      }
      else{
        var threads = count;
        Comment.find({_user:req.params.id}).count(function(err, count){
          if(err){
            res.status(400).send(err);
          }
          else{
            var comments = count;
            Reply.find({_user:req.params.id}).count(function(err, count){
              if(err){
                res.status(400).send(err);
              }
              else{
                var replies = count;
                res.json({karma:Math.ceil(threads * 6.9 + comments * 4.20 + replies * 1.3)});
              }
            })
          }
        })
      }
    })
  },
}
