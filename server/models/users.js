var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {type: String, required:true},
    password: {type:String, required:true},
    username: {type:String, required:true},
    registeredDate: {type: Date, default: Date.now},
    reputation: {type: Number, default: 0},
    isAdmin:{type:Boolean,default:false}
  }
);

UserSchema.virtual('url').get(function () {
  return '/posts/user/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);