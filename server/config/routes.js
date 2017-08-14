var userController = require('../controllers/userController.js');
var boardController = require('../controllers/boardController.js');
var threadController = require('../controllers/threadController.js');

module.exports = function(app){
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.get('/current', userController.currentUser);
  app.post('/fblogin', userController.fbLogin)
  app.get('/threads/:category', boardController.getThreads);
  app.get('/thread/:id', threadController.getThread);
  app.get('/threads/all/:category', boardController.getAllThreads);
  app.get('/user/:id', userController.getUser);
  app.get('/user_threads/:id', userController.getUserThreads);
  app.get('/user_comments/:id', userController.getUserComments);
  app.get('/user_replies/:id', userController.getUserReplies);
  app.get('/karma/:id', userController.getKarma);
  app.use(authenticateUser);
  app.get('/logout', userController.logout);
  app.post('/thread/create', boardController.createThread);
  app.post('/user/:id', userController.update);
  app.post('/comment/create/:id', threadController.createComment);
  app.post('/reply/create/:id', threadController.createReply);
  app.get('/upvote/thread/:id', threadController.upvoteThread);
  app.get('/downvote/thread/:id', threadController.downvoteThread);
  app.get('/upvote/comment/:id', threadController.upvoteComment);
  app.get('/downvote/comment/:id', threadController.downvoteComment);
  app.get('/upvote/reply/:id', threadController.upvoteReply);
  app.get('/downvote/reply/:id', threadController.downvoteReply);
  app.delete('/thread/:id', threadController.deleteThread);
  app.delete('/comment/:id', threadController.deleteComment);
  app.delete('/reply/:id', threadController.deleteReply);
}
function authenticateUser(req, res, next){
  if(req.session.user){
    next();
  }
  else{
    res.sendStatus(401);
  }
}
