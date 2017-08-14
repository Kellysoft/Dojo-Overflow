var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: {type:String, required: true},
  last_name: {type:String, required:true},
  alias: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  fb_id: {type:String},
  password: {type:String, required:true},
  // picture:
}, {timestamps:true})

mongoose.model('User', UserSchema);

var ThreadSchema = new Schema({
  title: {type:String, required:true},
  text: {type:String, required:true},
  category: {type:String, required:true},
  sub_category: {type:String},
  _user: {type:Schema.Types.ObjectId, ref:'User'},
  comments: [{type:Schema.Types.ObjectId, ref:'Comment'}],
  upvotes: [{type:Schema.Types.ObjectId, ref:'User'}],
  downvotes: [{type:Schema.Types.ObjectId, ref:'User'}]
}, {timestamps:true})

mongoose.model('Thread', ThreadSchema);

var CommentSchema = new Schema({
  text: {type:String, required:true},
  _user: {type:Schema.Types.ObjectId, ref:'User'},
  _thread: {type:Schema.Types.ObjectId, ref:'Thread'},
  replies: [{type:Schema.Types.ObjectId, ref:'Reply'}],
  upvotes: [{type:Schema.Types.ObjectId, ref:'User'}],
  downvotes: [{type:Schema.Types.ObjectId, ref:'User'}]
}, {timestamps:true})

mongoose.model('Comment', CommentSchema);

var ReplySchema = new Schema({
  text: {type:String, required:true},
  _user: {type:Schema.Types.ObjectId, ref:'User'},
  _comment: {type:Schema.Types.ObjectId, ref:'Comment'},
  upvotes: [{type:Schema.Types.ObjectId, ref:'User'}],
  downvotes: [{type:Schema.Types.ObjectId, ref:'User'}]
}, {timestamps:true})

mongoose.model('Reply', ReplySchema);
