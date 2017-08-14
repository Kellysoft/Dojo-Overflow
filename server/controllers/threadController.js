var mongoose = require('mongoose');
var Thread = mongoose.model('Thread');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

module.exports = {
  getThread: function(req, res){
    Thread.findOne({_id:req.params.id}).populate('_user').populate({path:'comments', populate:{path:'_user'}}).populate({path:'comments', populate:{path:'replies', populate:{path:'_user'}}}).exec(function(err, data){
      if(err){
        res.status(400).send(err);
      }
      else{
        res.json(data);
      }
    })
  },

  createComment: function(req, res){
    var comment = new Comment(req.body);
    comment._user = req.session.user._id;
    Thread.findOne({_id:req.params.id}, function(err, thread){
      if(err){
        res.status(400).send(err);
      }
      else{
        comment._thread = thread._id;
        comment.save(function(err, s_comment){
          if(err){
            res.status(400).send(err);
          }
          else{
            thread.comments.push(s_comment);
            thread.save(function(err, s_thread){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        })
      }
    })
  },

  createReply: function(req, res){
    var reply = new Reply(req.body);
    reply._user = req.session.user._id;
    Comment.findOne({_id:req.params.id}, function(err, comment){
      if(err){
        res.status(400).send(err);
      }
      else{
        reply._comment = comment.id;
        reply.save(function(err, s_reply){
          if(err){
            res.status(400).send(err);
          }
          else{
            comment.replies.push(s_reply);
            comment.save(function(err, s_comment){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        })
      }
    })
  },

  upvoteThread: function(req,res){
    Thread.findOne({_id:req.params.id}, function(err, thread){
      if(err){
        res.status(400).send(err);
      }
      else{
        if(thread.upvotes.indexOf(req.session.user._id) === -1){
          if(thread.downvotes.indexOf(req.session.user._id) === -1){
            thread.upvotes.push(req.session.user._id);
            thread.save(function(err, s_thread){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
          else{
            index = thread.downvotes.indexOf(req.session.user._id);
            thread.downvotes.splice(index, 1);
            thread.upvotes.push(req.session.user._id);
            thread.save(function(err, s_thread){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        }
      }
    })
  },

  downvoteThread: function(req,res){
    Thread.findOne({_id:req.params.id}, function(err, thread){
      if(err){
        res.status(400).send(err);
      }
      else{
        if(thread.downvotes.indexOf(req.session.user._id) === -1){
          if(thread.upvotes.indexOf(req.session.user._id) === -1){
            thread.downvotes.push(req.session.user._id);
            thread.save(function(err, s_thread){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
          else{
            index = thread.upvotes.indexOf(req.session.user._id);
            thread.upvotes.splice(index, 1);
            thread.downvotes.push(req.session.user._id);
            thread.save(function(err, s_thread){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        }
      }
    })
  },

  upvoteComment: function(req,res){
    Comment.findOne({_id:req.params.id}, function(err, comment){
      if(err){
        res.status(400).send(err);
      }
      else{
        if(comment.upvotes.indexOf(req.session.user._id) === -1){
          if(comment.downvotes.indexOf(req.session.user._id) === -1){
            comment.upvotes.push(req.session.user._id);
            comment.save(function(err, s_comment){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
          else{
            index = comment.downvotes.indexOf(req.session.user._id);
            comment.downvotes.splice(index, 1);
            comment.upvotes.push(req.session.user._id);
            comment.save(function(err, s_thread){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        }
      }
    })
  },

  downvoteComment: function(req,res){
    Comment.findOne({_id:req.params.id}, function(err, comment){
      if(err){
        res.status(400).send(err);
      }
      else{
        if(comment.downvotes.indexOf(req.session.user._id) === -1){
          if(comment.upvotes.indexOf(req.session.user._id) === -1){
            comment.downvotes.push(req.session.user._id);
            comment.save(function(err, s_thread){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
          else{
            index = comment.upvotes.indexOf(req.session.user._id);
            comment.upvotes.splice(index, 1);
            comment.downvotes.push(req.session.user._id);
            comment.save(function(err, s_comment){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        }
      }
    })
  },

  upvoteReply: function(req,res){
    Reply.findOne({_id:req.params.id}, function(err, reply){
      if(err){
        res.status(400).send(err);
      }
      else{
        if(reply.upvotes.indexOf(req.session.user._id) === -1){
          if(reply.downvotes.indexOf(req.session.user._id) === -1){
            reply.upvotes.push(req.session.user._id);
            reply.save(function(err, s_reply){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
          else{
            index = reply.downvotes.indexOf(req.session.user._id);
            reply.downvotes.splice(index, 1);
            reply.upvotes.push(req.session.user._id);
            reply.save(function(err, s_reply){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        }
      }
    })
  },

  downvoteReply: function(req,res){
    Reply.findOne({_id:req.params.id}, function(err, reply){
      if(err){
        res.status(400).send(err);
      }
      else{
        if(reply.downvotes.indexOf(req.session.user._id) === -1){
          if(reply.upvotes.indexOf(req.session.user._id) === -1){
            reply.downvotes.push(req.session.user._id);
            reply.save(function(err, s_reply){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
          else{
            index = reply.upvotes.indexOf(req.session.user._id);
            reply.upvotes.splice(index, 1);
            reply.downvotes.push(req.session.user._id);
            reply.save(function(err, s_reply){
              if(err){
                res.status(400).send(err);
              }
              else{
                res.sendStatus(200);
              }
            })
          }
        }
      }
    })
  },

  deleteThread: function(req, res){
    Thread.findOne({_id:req.params.id}, function(err, thread){
      if(err){
        res.status(400).send(err);
      }
      else{
        Comment.find({_thread:thread._id}, function(err, comment){
          if(err){
            res.status(400).send(err);
          }
          else{
            for(var i = 0;i < comment.length; i++){
              Reply.remove({_comment:comment[i]._id}).exec();
              console.log('reply removed')
            }
          }
        })
        Comment.remove({_thread:thread._id}).exec();
        thread.remove(function(err){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.sendStatus(200);
          }
        })
      }
    })
  },

  deleteComment: function(req, res){
    Comment.findOne({_id:req.params.id}, function(err, comment){
      if(err){
        res.status(400).send(err);
      }
      else{
        Reply.remove({_comment:comment._id}).exec();
        comment.remove(function(err){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.sendStatus(200);
          }
        })
      }
    })
  },

  deleteReply: function(req, res){
    Reply.findOne({_id:req.params.id}, function(err, reply){
      if(err){
        res.status(400).send(err);
      }
      else{
        reply.remove(function(err){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.sendStatus(200);
          }
        })
      }
    })
  },

}
