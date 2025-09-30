var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 50},
    summary: {type: String, required: true, maxLength: 140},
    text: {type: String, required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag', required: true}],
  //   tags: [{
  //     tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
  //     name: { type: String, required: true }
  // }],
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    asked_by: {type: String, default: "Anonymous"},
    ask_date_time: {type: Date, default: Date.now},
    views: {type: Number, default: 0},
    email:{type:String},
    upvotes: {type: [String]},
    downvotes: {type: [String]},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  }
);

QuestionSchema.virtual('url').get(function () {
    return '/posts/question/' + this._id;
  });
  
  //Export model
  module.exports = mongoose.model('Question', QuestionSchema);