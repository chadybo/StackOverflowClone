const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session')
const MongoStore = require('connect-mongo');


let Question = require('./models/questions');
let Answer = require('./models/answers');
let Tag = require('./models/tags');
let User = require('./models/users');
let Comment = require('./models/comments');
// let Answer = require('../models/answers')
// let Tag = require('../models/tags')
const saltRounds = 10;

const port = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req,res,next) => {
//   console.log(MongoStore)
//   next();
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
  console.log('Connected to database');
});


// app.use(session({
//   secret: 'some super secret password',
//   cookie: {maxAge:30000},
//   saveUninitialized: false,
//   store
// }));

// app.post('/login', async (req, res) => {
//   try {
//     const verdict = await bcrypt.compare(req.body.password, req.body.name.password);
//     console.log(req.body.password);
//     console.log(req.body.name.password);
//     console.log("VERDICT:", verdict);

//     // Send JSON response based on the verdict
//     if (verdict) {
//       var email = req.body.name.email
//       var password = req.body.name.password
//       res.json({ success: true });
//       req.session.authenticated = true;
//       req.session.user ={
//           email,
//           password
//       };
//       res.json(req.session)
//     } else {
//       res.json({ success: false });
//     }
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// app.use(session({
//   secret: 'some super secret password',
//   cookie: { maxAge: 30000 },
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/fake_so'})
// }));



// app.use(session({
//   secret: 'some super secret password',
//   cookie: {maxAge: 1, secure:false},
//   resave: false, 
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/sessions'}),
// }));

app.use(session({
  secret: 'some super secret password',
  cookie: {maxAge:86400,domain:'localhost',httpOnly:true},
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/fake_so'}),
}));

app.post('/loginguest', (req, res) => {

  req.session.guest = true; 
  req.session.authenticated = true;
  req.session.user = {
    name:"Guest"
  };
  res.json({session: req.session });
});

app.post('/login', async (req, res) => {
  try {
    const verdict = await bcrypt.compare(req.body.password, req.body.name.password);

    const responseObj = {};

    if (verdict) {
      var email = req.body.name.email;
      var password = req.body.name.password;
      responseObj.success = true;
      req.session.authenticated = true;
      req.session.user = {
        email,
        password,
      };
      responseObj.sessionID = req.sessionID; 
    } else {
      responseObj.success = false;
    }

    res.json(responseObj);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// app.post('/login', async (req, res) => {
//   try {
//     const verdict = await bcrypt.compare(req.body.password, req.body.name.password);
//     console.log(req.body.password);
//     console.log(req.body.name.password);
//     console.log("VERDICT:", verdict);

//     const responseObj = {};

//    if (verdict) {
//       var email = req.body.name.email;
//       var password = req.body.name.password;
//       responseObj.success = true;
//       req.session.authenticated = true;
//       req.session.user = {
//         email,
//         password,
//       };
//       console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOK HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
//       responseObj.sessionID = req.sessionID; // Include sessionID in the response
//       console.log('Session ID:', req.sessionID);
//     } else {
//       responseObj.success = false;
//     }

//     res.json(responseObj);
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });


app.post('/logout', async (req, res) => {
  try {
    console.log("THIS IS THE sessionStore" + req);

    const timeoutMs = 0; 
    await Promise.race([
      new Promise((resolve, reject) => {
        req.sessionStore.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err);
            reject(err);
          } else {
            console.log("Session destroyed successfully");
            resolve();
          }
        });
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
      })
    ]);

    res.status(200).send('Logout successful');
  } catch (error) {
    console.error('Error destroying session:', error);
    res.status(500).send('Internal Server Error');
  }
});




// app.post('/logout', async (req, res) => {
  
//   req.sessionStore.destroy(err => {
//     console.log("I DESTROYED IT")
//   });
//   // console.log(req.session)
//   // console.log(session.Store)
// });


// app.post('/logoutguest', async (req, res) => {
//   console.log("IM INSIDE THE LOGOUT GUEST BOI")
//   req.sessionStore.destroy((err)=>{
//     console.log("I DESTROYED IT")
//   })
// });



// app.post('/login', async (req, res) => {
//   try {
//     const verdict = await bcrypt.compare(req.body.password, req.body.name.password);
//     console.log(req.body.password);
//     console.log(req.body.name.password);
//     console.log("VERDICT:", verdict);

    
//     const responseObj = {};

    
//     if (req.session.authenticated) {
//       res.json(responseObj);
//     }
//     else if (verdict) {
//       var email = req.body.name.email;
//       var password = req.body.name.password;

//       responseObj.success = true;
//       req.session.authenticated = true;
//       req.session.user = {
//         email,
//         password,
//       };
//       responseObj.session = req.session;
//       console.log('Session ID:', req.sessionID);
//     } else {
//       responseObj.success = false;
//     }

    
//     res.json(responseObj);
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });


app.get('/questions', async (req, res) => {
  try {
    // console.log("MOM WE MADE IT INTO SERVER TO GET QUESTIONS");
    const questions = await Question.find({});
    await Question.populate(questions, { path: 'tags' });
    // await Question.populate(questions, { path: 'tags.name' });
    await Question.populate(questions, { path: 'answers' });
    // await Question.populate(questions, { path: 'upvotes' });
    // await Question.populate(questions, { path: 'downvotes' });
    await Question.populate(questions, { path: 'comments' });
    //console.log(questions)
    res.send(questions);
  } catch (error) {
    console.error("Error getting questions: ", error);
    res.send("Database Down");
  }
});

app.get('/answers', async (req, res) => {
  try {
    // console.log("MOM WE MADE IT INTO SERVER TO GET ANSWERS");
    const answers = await Answer.find({});
    await Answer.populate(answers, { path: 'comments' });
    // console.log(answers)
    res.send(answers);
  } catch (error) {
    console.error("Error getting answers: ", error);
    res.send("Error getting answers");
  }
});

app.get('/tags', async (req, res) => {
  try {
    // console.log("MOM WE MADE IT INTO SERVER TO GET TAGS");
    const tags = await Tag.find({});
    res.send(tags);
  } catch (error) {
    console.error("Error getting tags: ", error);
    res.send("Error getting tags");
  }
});

app.get('/users', async (req, res) => {
  try {
    // console.log("MOM WE MADE IT INTO SERVER TO GET USERS");
    const users = await User.find({});
    // console.log(answers)
    res.send(users);
  } catch (error) {
    console.error("Error getting users: ", error);
    res.send("Error getting users");
  }
});

app.get('/comments', async (req, res) => {
  try {
    // console.log("MOM WE MADE IT INTO SERVER TO GET COMMENTS");
    const comments = await Comment.find({});
    // console.log(comments)
    res.send(comments);
  } catch (error) {
    console.error("Error getting comments: ", error);
    res.send("Error getting comments");
  }
});

app.post('/postuser', async (req, res) => {
  try {
      // console.log(req.body);
      //const { email, password } = req.body;
      // console.log(newemail)
      // console.log(newpassword)
      const salt = await bcrypt.genSalt(saltRounds);
      const pwHash = await bcrypt.hash(req.body.password, salt);
      console.log(pwHash)
      const newUser = new User({
          email:req.body.email,
          password:pwHash,
          username:req.body.username,
          isAdmin: req.body.isAdmin
      });

      const savedUser = await newUser.save();

      // console.log("I JUST UNSHIFTED")
      // console.log(searchQuestion.answers)
      res.send(savedUser);
  } catch (error) {
      console.error('Error posting user: ', error);
      res.send('Error posting user');
  }


});

app.post('/postquestion', async (req, res) => {
  try {
      // console.log(req.body);
      const { title, summary, text, tags, asked_by,email } = req.body;

      const newQuestion = new Question({
          title,
          summary,
          text,
          tags,
          asked_by,
          email
      });

      const savedQuestion = await newQuestion.save();
      console.log("making question with" + savedQuestion.tags);
      res.send(savedQuestion);
  } catch (error) {
      console.error('Error posting question: ', error);
      res.send('Error posting question');
  }
});

app.post('/posttag', async (req, res) => {
  try {
      console.log(req.body);
      const { name, email } = req.body;

      const newTag = new Tag({
          name,
          email
      });

      const savedTag = await newTag.save();
      console.log("saved a new tag " + savedTag);
      res.send(savedTag);
  } catch (error) {
      console.error('Error posting tag ', error);
      res.send('Error posting tag');
  }
});

app.post('/postanswer', async (req, res) => {
  try {
      // console.log(req.body);
      const { text, ans_by, questionID,email } = req.body;

      const newAnswer = new Answer({
          text,
          ans_by,
          email
      });

      const savedAnswer = await newAnswer.save();
      const searchQuestion = await Question.findById(questionID);

      searchQuestion.answers.unshift(savedAnswer._id);
      await searchQuestion.save();

      // console.log("I JUST UNSHIFTED")
      // console.log(searchQuestion.answers)
      res.send(savedAnswer);
  } catch (error) {
      console.error('Error posting answer: ', error);
      res.send('Error posting answer');
  }
});

app.post('/postcomment', async (req, res) => {
  try {
      // console.log(req.body);
      const { text, ans_by, questionID, email } = req.body;

      const newComment = new Comment({
          text,
          ans_by,
          email
      });

      const savedComment = await newComment.save();
      const searchQuestion = await Question.findById(questionID);

      searchQuestion.comments.unshift(savedComment._id);
      await searchQuestion.save();

      // console.log("I JUST UNSHIFTED")
      // console.log(searchQuestion.answers)
      res.send(savedComment);
  } catch (error) {
      console.error('Error posting comment: ', error);
      res.send('Error posting comment');
  }

});

app.post('/postcommentanswer', async (req, res) => {
  try {
      // console.log(req.body);
      const { text, ans_by, answerID, email } = req.body;

      const newComment = new Comment({
          text,
          ans_by,
          email
      });

      const savedComment = await newComment.save();
      const searchAnswer = await Answer.findById(answerID);

      searchAnswer.comments.unshift(savedComment._id);
      await searchAnswer.save();

      // console.log("I JUST UNSHIFTED")
      // console.log(searchAnswer.comments)
      res.send(savedComment);
  } catch (error) {
      console.error('Error posting comment: ', error);
      res.send('Error posting comment');
  }

});

// app.post('/postquestionedit', async (req, res) => {
//   try {


//       const searchQuestion = await Question.findById(req.body.questionID);

//       searchQuestion.title = req.body.title;
//       searchQuestion.text = req.body.text;
//       searchQuestion.summary = req.body.summary;
//       var tagsArr = [];
//       tagsArr = req.body.tags.split(",")
//       console.log(tagsArr)

//       await searchQuestion.save();

//       res.send(searchQuestion);
//   } catch (error) {
//       console.error('Error posting upvote: ', error);
//       res.send('Error posting upvote');
//   }
// });

app.post('/postquestionedit', async (req, res) => {
  try {
    const searchQuestion = await Question.findById(req.body.questionID);

    searchQuestion.title = req.body.title;
    searchQuestion.text = req.body.text;
    searchQuestion.summary = req.body.summary;
    searchQuestion.tags = req.body.tags;

    console.log(req.body.tags)

    // console.log(tagsArr);

    

    await searchQuestion.save();

    res.send(searchQuestion);
  } catch (error) {
    console.error('Error posting upvote: ', error);
    res.send('Error posting upvote');
  }
});

app.post('/postansweredit', async (req, res) => {
  try {
    const searchAnswer = await Answer.findById(req.body.aid);

    searchAnswer.text = req.body.text;


    // console.log(tagsArr);

    

    await searchAnswer.save();

    res.send(searchAnswer);
  } catch (error) {
    console.error('Error posting upvote: ', error);
    res.send('Error posting upvote');
  }
});

app.post('/posttagedit', async (req, res) => {
  try {
    const searchTag = await Tag.findById(req.body.id);

    searchTag.name = req.body.name;
   

    console.log(req.body.tags)

    // console.log(tagsArr);

    await searchTag.save();

    res.send(searchTag);
  } catch (error) {
    console.error('Error posting upvote: ', error);
    res.send('Error posting upvote');
  }
});

app.delete('/deletetag/:tagId', async (req, res) => {
  const tagId =req.params.tagId
  try {
    const deletedTag = await Tag.findOneAndDelete({ _id: tagId});
    if (!deletedTag) {
      return res.status(404).send('Tag not found');
    }

    res.send('Tag deleted successfully');
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deleteuser/:userId', async (req, res) => {
  const userId =req.params.userId
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId});
    if (!deletedUser) {
      return res.status(404).send('Tag not found');
    }

    res.send('Tag deleted successfully');
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deletequestion/:questionId', async (req, res) => {
  const questionId =req.params.questionId
  console.log(questionId)
  try {
    const deletedQuestion = await Question.findOneAndDelete({ _id: questionId});
    if (!deletedQuestion) {
      return res.status(404).send('Tag not found');
    }

    res.send('Tag deleted successfully');
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deleteanswer/:answerId', async (req, res) => {
  const answerId =req.params.answerId
  try {
    const deletedAnswer = await Answer.findOneAndDelete({ _id: answerId});
    if (!deletedAnswer) {
      return res.status(404).send('Answer not found');
    }

    res.send('Answer deleted successfully');
  } catch (error) {
    console.error('Error deleting Answer:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deletequestioncomments/:commentsId', async (req, res) => {
  const commentsId =req.params.commentsId
  console.log(commentsId)
  try {
    const deletedComments = await Comment.findOneAndDelete({ _id: commentsId});
    if (!deletedComments) {
      return res.status(404).send('Comment not found');
    }

    res.send('Comment deleted successfully');
  } catch (error) {
    console.error('Error deleting Comment:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/posttag', async (req, res) => {
  try {
      console.log(req.body);
      const { name } = req.body;

      const newTag = new Tag({
          name,
      });

      const savedTag = await newTag.save();
      console.log("saved a new tag " + savedTag);
      res.send(savedTag);
  } catch (error) {
      console.error('Error posting tag ', error);
      res.send('Error posting tag');
  }
});

// app.post('/login', async (req, res) => {
//   const verdict = await bcrypt.compare(req.body.password, req.body.name.password);
//   console.log(req.body.password)
//   console.log(req.body.name.password)
//   console.log("VERDICT:", verdict);
//   if (verdict) {
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// } catch (error) {
//   console.error('Error comparing passwords:', error);
//   res.status(500).json({ success: false, error: 'Internal Server Error' });
// }
// });

// app.post('/login', async (req, res) => {
//   try {
//     const verdict = await bcrypt.compare(req.body.password, req.body.name.password);
//     console.log(req.body.password);
//     console.log(req.body.name.password);
//     console.log("VERDICT:", verdict);

//     // Send JSON response based on the verdict
//     if (verdict) {
//       res.json({ success: true });
//     } else {
//       res.json({ success: false });
//     }
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });


app.post('/updateview', async (req, res) => {
  console.log("We adding views bb");
  try {
      const { questionID } = req.body;
      console.log("THE ID OF THE QUESTION IN SERVER IS " + questionID);
      const searchQuestion = await Question.findById(questionID);

      console.log("VIEWS BEFORE UPDATE " + searchQuestion.views);
      searchQuestion.views = searchQuestion.views + 1;
      console.log("VIEWS AFTER UPDATE " + searchQuestion.views);
      await searchQuestion.save();

      res.send('View count updated');
  } catch (error) {
      console.error('Error updating view count: ', error);
      res.send('Error updating view count');
  }
});

////////////////////////////////////////////////////////////////////THIS IS FOR QUESTION VOTING
app.post('/postupvote', async (req, res) => {
  try {

      const { questionID, userEmail } = req.body;

      const searchQuestion = await Question.findById(questionID);

      searchQuestion.upvotes.unshift(userEmail);
      await searchQuestion.save();

      res.send(searchQuestion);
  } catch (error) {
      console.error('Error posting upvote: ', error);
      res.send('Error posting upvote');
  }
});

// app.post('/editquestion', async (req, res) => {
//   try {

//       const { questionID, edittedTitle, edittedText } = req.body;

//       const searchQuestion = await Question.findById(questionID);

//       searchQuestion.title = edittedTitle;
//       searchQuestion.text = edittedText;

//       await searchQuestion.save();

//       res.send(searchQuestion);
//   } catch (error) {
//       console.error('Error posting upvote: ', error);
//       res.send('Error posting upvote');
//   }
// });

app.post('/postdownvote', async (req, res) => {
  try {

      const { questionID, userEmail } = req.body;

      const searchQuestion = await Question.findById(questionID);

      searchQuestion.downvotes.unshift(userEmail);
      await searchQuestion.save();

      res.send(searchQuestion);
  } catch (error) {
      console.error('Error posting upvote: ', error);
      res.send('Error posting upvote');
  }
});

app.post('/removeupvote', async (req, res) => {
  try {
    const { questionID, userEmail } = req.body;

    const searchQuestion = await Question.findById(questionID);

    const indexToRemove = searchQuestion.upvotes.indexOf(userEmail);

    if (indexToRemove !== -1) {
      searchQuestion.upvotes.splice(indexToRemove, 1);
    }

    await searchQuestion.save();

    res.send(searchQuestion);
  } catch (error) {
    console.error('Error removing upvote: ', error);
    res.send('Error removing upvote');
  }
});

app.post('/removedownvote', async (req, res) => {
  try {
    const { questionID, userEmail } = req.body;

    const searchQuestion = await Question.findById(questionID);

    const indexToRemove = searchQuestion.downvotes.indexOf(userEmail);

    if (indexToRemove !== -1) {
      searchQuestion.downvotes.splice(indexToRemove, 1);
    }

    await searchQuestion.save();

    res.send(searchQuestion);
  } catch (error) {
    console.error('Error removing downvote: ', error);
    res.send('Error removing downvote');
  }
});

////////////////////////////////////////////////////////////////////THIS IS FOR ANSWER VOTING
app.post('/postupvoteanswer', async (req, res) => {
  try {

      const { answerID, userEmail } = req.body;

      const searchAnswer = await Answer.findById(answerID);

      searchAnswer.upvotes.unshift(userEmail);
      await searchAnswer.save();

      res.send(searchAnswer);
  } catch (error) {
      console.error('Error posting upvote answer: ', error);
      res.send('Error posting upvote answer');
  }
});

app.post('/postdownvoteanswer', async (req, res) => {
  try {

      const { answerID, userEmail } = req.body;

      const searchAnswer = await Answer.findById(answerID);

      searchAnswer.downvotes.unshift(userEmail);
      await searchAnswer.save();

      res.send(searchAnswer);
  } catch (error) {
      console.error('Error posting upvote answer: ', error);
      res.send('Error posting upvote answer');
  }
});

app.post('/removeupvoteanswer', async (req, res) => {
  try {
    const { answerID, userEmail } = req.body;

    const searchAnswer = await Answer.findById(answerID);

    const indexToRemove = searchAnswer.upvotes.indexOf(userEmail);

    if (indexToRemove !== -1) {
      searchAnswer.upvotes.splice(indexToRemove, 1);
    }

    await searchAnswer.save();

    res.send(searchAnswer);
  } catch (error) {
    console.error('Error removing upvote answer: ', error);
    res.send('Error removing upvote answer');
  }
});

app.post('/removedownvoteanswer', async (req, res) => {
  try {
    const { answerID, userEmail } = req.body;

    const searchAnswer = await Answer.findById(answerID);

    const indexToRemove = searchAnswer.downvotes.indexOf(userEmail);

    if (indexToRemove !== -1) {
      searchAnswer.downvotes.splice(indexToRemove, 1);
    }

    await searchAnswer.save();

    res.send(searchAnswer);
  } catch (error) {
    console.error('Error removing downvote answer: ', error);
    res.send('Error removing downvote answer');
  }
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////VOTING FOR COMMENTS
app.post('/postupvotecomment', async (req, res) => {
  try {

      const { commentID, userEmail } = req.body;

      const searchComment = await Comment.findById(commentID);

      searchComment.upvotes.unshift(userEmail);
      await searchComment.save();

      res.send(searchComment);
  } catch (error) {
      console.error('Error posting upvote comment: ', error);
      res.send('Error posting upvote comment');
  }
});

app.post('/removeupvotecomment', async (req, res) => {
  try {
    const { commentID, userEmail } = req.body;

    const searchComment = await Comment.findById(commentID);

    const indexToRemove = searchComment.upvotes.indexOf(userEmail);

    if (indexToRemove !== -1) {
      searchComment.upvotes.splice(indexToRemove, 1);
    }

    await searchComment.save();

    res.send(searchComment);
  } catch (error) {
    console.error('Error removing upvote comment: ', error);
    res.send('Error removing upvote comment');
  }
});
////////////////////////////////////////////////////////////////////// REPPPPPPPPPPPPPPPP
app.post('/giverep', async (req, res) => {
  try {

      const { userEmail } = req.body;

      const searchUser = await User.findOne({ email: userEmail });

      searchUser.reputation += 5;
      await searchUser.save();

      res.send(searchUser);
  } catch (error) {
      console.error('Error giving rep: ', error);
      res.send('Error giving rep');
  }
});

app.post('/take5rep', async (req, res) => {
  try {

      const { userEmail } = req.body;

      const searchUser = await User.findOne({ email: userEmail });

      searchUser.reputation -= 5;
      await searchUser.save();

      res.send(searchUser);
  } catch (error) {
      console.error('Error giving rep: ', error);
      res.send('Error giving rep');
  }
});

app.post('/take10rep', async (req, res) => {
  try {

      const { userEmail } = req.body;

      const searchUser = await User.findOne({ email: userEmail });

      searchUser.reputation -= 10;
      await searchUser.save();

      res.send(searchUser);
  } catch (error) {
      console.error('Error giving rep: ', error);
      res.send('Error giving rep');
  }
});


process.on('SIGINT', () => {
  if(db) {
      db.close()
        .then((result) => console.log('Server closed. Database instance disconnected'))
        .catch((err) => console.log(err));
  }
}); 