var mongoose = require('mongoose');
var Thread = mongoose.model('Thread');

module.exports = {
  createThread: function(req, res){
    var thread = new Thread(req.body);
    thread._user = req.session.user._id;
    thread.save(function(err, data){
      if(err){
        res.status(400).send(err);
      }
      else{
        res.sendStatus(200);
      }
    })
  },

  getThreads: function(req, res){
    Thread.find({category: req.params.category}).sort("-updatedAt").limit(5).exec(function(err, data){
      if(err){
        res.status(400).send(err);
      }
      else{
        res.json(data);
      }
    })
  },

  getAllThreads: function(req, res){
    Thread.find({category: req.params.category}).populate('_user').sort('-updatedAt').exec(function(err, data){
      if(err){
        res.status(400).send(err);
      }
      else{
        res.json(data);
      }
    })
  },

}
