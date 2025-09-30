var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AnswerSchema = new Schema(
  {
    text: {type: String, required: true},
    ans_by: {type: String, default: "Anonymous", required: true},
    ans_date_time: {type: Date, default: Date.now},
    email:{type:String},
    upvotes: {type: [String]},
    downvotes: {type: [String]},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  }
);

AnswerSchema.virtual('url').get(function () {
  return '/posts/answer/' + this._id;
});

//Export model
module.exports = mongoose.model('Answer', AnswerSchema);