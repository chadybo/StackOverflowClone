import React from 'react';
import { AskQuestionPage } from './askQuestionPage.js';
import DisplayUserAnswers from './displayUserAnswers.js';
import UserAnswersPage from './userQuestionAnswerPage.js';
import { Header } from './header.js';
import { MainBody } from './mainBody.js';
import { WelcomePage } from './welcomePage.js';
import { WelcomePageHeader } from './welcomePageHeader.js';
import { RegisterPage } from './registerPage.js';
import { LogInPage } from './logInPage.js';
import { Question } from './askQuestionPage.js';
import AnswersPage from './answersPage.js';
import { TagsPage } from './tagsPage.js';
import { SearchResultsPage } from './searchResultPage.js';
import { SearchResultsTags } from './searchResultsTags.js';
import { AnsweringQuestionPage } from './answeringQuestionPage.js';
import { AnsweringQuestionPageNew } from './answeringQuestionPageNew.js';
import { UnansweredPage } from './unansweredPage.js';
import { UserPage } from './userPage.js';
import { QuestionEditPage } from './questionEditPage.js';
import { DisplayUserTags } from './displayUserTags.js';
import { DiplayAdminUserPage } from './userPageAdmin.js';

//const bcrypt = require('bcrypt');
import axios from 'axios';  

// function Tag(name) {
//   this.tid= "";
//   this.name= name;
// };
var sessiontime = null

export class Webpage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        showAskQuestionPage: false,
        showWelcomePage:false,
        showAnsweringPageNew:false,
        showMainPage: false,
        showAnswersPage: false,
        showSearchResults: false,
        showTagsPage: false,
        showUserPage:false,
        showQuestionEditPage:false,
        showDisplayUserTags:false,
        showAdminUserPage:false,
        showUserAnswers:false,
        showUserQuestionAnswersPage:false,
        error:null,
        clickedQuestionRef: null,
        clickedAnswerRef:null,
        clickedUserRef:null,
        searchResultRef: null,
        questionRef:null,
        showSearchTags: false,
        tagsMatchRef: null,
        showAnsweringPage: false,
        mainPageSortedNewest: false,
        questionTitleError: false,
        questionTitleTooLongError: false,
        questionTextError: false,
        questionTagsError: false,
        questionTooManyTagsError: false,
        questionTagTooLongError: false,
        questionUsernameError: false,
        answerUsernameError: false,
        answerTextError: false,
        noSearchResults: false,
        questionHyperlinkFormatError: false,
        answerHyperlinkFormatError: false,
        showUnansweredPage: false,
        showActive: false,
        register:false,
        login:false,
        isGuest:false,
        questions: [],
        answers: [], 
        tags: [],
        userstest: [],
        comments: [],
        registerInvalidEmailError: false,
        registerDuplicateUserError: false,
        registerInvalidPasswordError: false,
        registerEmptyEmail: false,
        registerEmptyUsername: false,
        registerEmptyPassword: false,
        registerEmptyPasswordConfirm: false,
        registerMismatchPassword: false,
        loginIncorrectEmailError: false,
        loginEmptyEmailError:false,
        loginIncorrectPasswordError: false,
        loginEmptyPasswordError:false,
        mainPagePageNumber: 1,
        answersPagePageNumber: 1,
        commentPagePageNumber: 1,
        questionEmptySummaryError:false,
        questionSummaryTooLongError: false,
        commentTooLongError: false,
        commentEmptyError: false,
        answerCommentTooLongError: false,
        answerCommentEmptyError: false,
        repTooLowComment: false,
        repTooLowQuestionUpvote: false,
        repTooLowAnswerUpvote: false,
        repTooLowNewTag: false,
        repTooLowQuestionComment: false,
      };

      this.openTagsPage = this.openTagsPage.bind(this);
      this.openSearchResultsTagsPage = this.openSearchResultsTagsPage.bind(this);
      this.openSearchResultsPage = this.openSearchResultsPage.bind(this);
      this.openAskQuestionPage = this.openAskQuestionPage.bind(this);
      this.openMainPage = this.openMainPage.bind(this);
      this.openAnswersPage = this.openAnswersPage.bind(this);
      this.openAnsweringPage = this.openAnsweringPage.bind(this);
      this.openRegisterPage = this.openRegisterPage.bind(this);
      this.openLoginPage = this.openLoginPage.bind(this);
      this.openQuestionEditPage = this.openQuestionEditPage.bind(this)
      this.addToQuestions = this.addToQuestions.bind(this);
      this.addToUsers = this.addToUsers.bind(this);
      this.logInTest = this.logInTest.bind(this)
      this.newest = this.newest.bind(this);
      this.active = this.active.bind(this);
      this.openUserPage = this.openUserPage.bind(this)
      this.openAdminUserPage = this.openAdminUserPage.bind(this)
      this.removeSession = this.removeSession.bind(this)
      this.unanswered = this.unanswered.bind(this);
      this.guestCall = this.guestCall.bind(this)
      this.commentsCall = this.commentsCall.bind(this)
      this.questionsCall = this.questionsCall.bind(this)
      this.tagsCall = this.tagsCall.bind(this)
      this.createAndAddAnswer = this.createAndAddAnswer.bind(this);
      this.incrementMainPage = this.incrementMainPage.bind(this);
      this.decrementMainPage = this.decrementMainPage.bind(this);
      this.incrementAnswersPage = this.incrementAnswersPage.bind(this);
      this.decrementAnswersPage = this.decrementAnswersPage.bind(this);
      this.upvoteQuestion = this.upvoteQuestion.bind(this);
      this.downvoteQuestion = this.downvoteQuestion.bind(this);
      this.upvoteAnswer = this.upvoteAnswer.bind(this);
      this.downvoteAnswer = this.downvoteAnswer.bind(this);
      this.createAndAddComment = this.createAndAddComment.bind(this);
      this.upvoteComment = this.upvoteComment.bind(this);
      this.incrementCommentsPage = this.incrementCommentsPage.bind(this);
      this.decrementCommentsPage = this.decrementCommentsPage.bind(this);
      this.createAndAddCommentAnswer = this.createAndAddCommentAnswer.bind(this);
      this.opendisplayUserTags = this.opendisplayUserTags.bind(this)
      this.openUserAnswersPage = this.openUserAnswersPage.bind(this)
      this.openUserQuestionAnswerPage = this.openUserQuestionAnswerPage.bind(this)
      this.answersCall = this.answersCall.bind(this)
      this.usersCall = this.usersCall.bind(this)
      this.openAnsweringPageNew = this.openAnsweringPageNew.bind(this)
      this.giveRep = this.giveRep.bind(this)
      this.take5Rep = this.take5Rep.bind(this)
      this.take10Rep = this.take10Rep.bind(this)
      this.openWelcomePage = this.openWelcomePage.bind(this)
      this.getRep = this.getRep.bind(this)
  }

  updateQuestions = (newQuestions) => {
    this.setState({ questions: newQuestions });
  };

  openWelcomePage()
  {
    localStorage.removeItem("sessionID");
    localStorage.removeItem("loggedInUsername");
    localStorage.removeItem("sessiontime")
    localStorage.removeItem("registeredDate")
    localStorage.removeItem("loggedInEmail")
    localStorage.removeItem("isGuest")
    localStorage.removeItem("isAdmin")
    this.setState({questionTitleTooLongError: false});
    this.setState({questionTitleError: false});
    this.setState({questionTextError: false});
    this.setState({questionTagTooLongError: false})
    this.setState({questionTagsError: false});
    this.setState({questionTooManyTagsError: false});
    this.setState({questionUsernameError: false});
    this.setState({questionHyperlinkFormatError: false})
    this.setState({showMainPage: false})
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: false})
    this.setState({showTagsPage: false});
    this.setState({showSearchTags: false});
    this.setState({showAnsweringPage: false});
    this.setState({showUnansweredPage: false});
    this.setState({showUserPage:false})
    this.setState({showActive: false});
    this.setState({register:false})
    this.setState({login:false})
    this.setState({showQuestionEditPage:false})
    this.setState({showDisplayUserTags:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})
    this.setState({showWelcomePage:true});
  }
  openAdminUserPage(updatedRef)
  {
    this.setState({clickedUserRef:updatedRef})
    this.setState({questionTitleTooLongError: false});
    this.setState({questionTitleError: false});
    this.setState({questionTextError: false});
    this.setState({questionTagTooLongError: false})
    this.setState({questionTagsError: false});
    this.setState({questionTooManyTagsError: false});
    this.setState({questionUsernameError: false});
    this.setState({questionHyperlinkFormatError: false})
    this.setState({showMainPage: false})
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: false})
    this.setState({showTagsPage: false});
    this.setState({showSearchTags: false});
    this.setState({showAnsweringPage: false});
    this.setState({showUnansweredPage: false});
    this.setState({showUserPage:false})
    this.setState({showActive: false});
    this.setState({register:false})
    this.setState({login:false})
    this.setState({showQuestionEditPage:false})
    this.setState({showDisplayUserTags:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:true})
  }
  openUserAnswersPage()
  {
    console.log("IM OPENING THE DISPLAY USER ANSWER PAGEEEEEEEEEEEEE")
    this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showUserPage:false})
      this.setState({showActive: false});
      this.setState({register:false})
      this.setState({login:false})
      this.setState({showQuestionEditPage:false})
      this.setState({showDisplayUserTags:false})
      this.setState({showUserAnswers:true})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})
      this.setState({showAdminUserPage:false})
  }

  opendisplayUserTags()
  {
    console.log("IM OPENING THE DISPLAY USER TAGS PAGEEEEEEEEEEEEE")
    this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showUserPage:false})
      this.setState({showActive: false});
      this.setState({register:false})
      this.setState({login:false})
      this.setState({showQuestionEditPage:false})
      this.setState({showDisplayUserTags:true})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})
      this.setState({showAdminUserPage:false})
  }

  openQuestionEditPage(question){
    console.log("IM OPENING THE EDIT PAGEEEEEEEEEEEEE")
    this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showUserPage:false})
      this.setState({showActive: false});
      this.setState({register:false})
      this.setState({login:false})
      this.setState({showQuestionEditPage:true})
      this.setState({questionRef:question})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})
      this.setState({showAdminUserPage:false})
  }
  
  openLoginPage(){
      this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showActive: false});
      this.setState({register:false})
      this.setState({login:true})
      this.setState({showQuestionEditPage:false})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})
      this.setState({showAdminUserPage:false})
  }

  openRegisterPage(){
    this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showActive: false});
      this.setState({register:true})
      this.setState({showQuestionEditPage:false})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})
      this.setState({showAdminUserPage:false})
  }
  openAskQuestionPage() {
      this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      console.log("Switching to Ask Questions Page");
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: true});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showActive: false});
      this.setState({showQuestionEditPage:false})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})

      this.setState({repTooLowNewTag: false})
      this.setState({showAdminUserPage:false})
  }


questionsCall()
{
  // console.log("we called for questions")
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/questions')
        .then(res => {
            this.setState({ questions: res.data }, () => {
             localStorage.removeItem("setError")
            resolve();
            });
        })
              // console.log("WE ARE IN THE DID MOUNT");
              // console.log(this.state.questions);
              // console.log("WE ARE TESTING NOW MF");
              // console.log(this.state.questions[0].title);
         .catch(error => {
            console.error(error);
            this.setState({
              error: "Database Down", 
            });
            reject(error);
            localStorage.setItem("setError",true)
        });
  });
}


answersCall()
{
  // console.log("we called for answers")
  return new Promise((resolve, reject) => {
  axios.get('http://localhost:8000/answers')
      .then(res => {
          this.setState({ answers: res.data }, () => {
            localStorage.removeItem("setError")
          resolve();
          });
      })

            // console.log("WE ARE IN THE DID MOUNT FOR ANSWERS");
            // console.log(this.state.answers);
        .catch(error => {
          this.setState({
            error: "Database Down", 
          });
            console.error(error);
            reject(error);
            localStorage.setItem("setError",true)
        });
      });
}

tagsCall()
{
  return new Promise((resolve, reject) => {
  axios.get('http://localhost:8000/tags')
        .then(res => {
            const tagsFromData = res.data;
            this.setState({tags: tagsFromData}, () => {
              localStorage.removeItem("setError")
              resolve();
        });
            // console.log("WE ARE IN THE DID MOUNT FOR ANSWERS");
            // console.log(this.state.tags2);

        })
        .catch(error => {
          console.error(error);
          this.setState({
            error: "Database Down", 
          });
          reject(error);
          localStorage.setItem("setError",true)
        });
      });
}

usersCall()
{
  // console.log("we called for users")
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/users')
        .then(res => {
            this.setState({ userstest: res.data }, () => {
            localStorage.removeItem("setError")
            resolve();
            });
        })
              // console.log("WE ARE IN THE DID MOUNT");
              // console.log(this.state.questions);
              // console.log("WE ARE TESTING NOW MF");
              // console.log(this.state.questions[0].title);
         .catch(error => {
            console.error(error);
            this.setState({
              error: "Database Down", 
            });
            reject(error);
            localStorage.setItem("setError",true)
        });
  });
}

commentsCall()
{
  // console.log("we called for comments")
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/comments')
        .then(res => {
            this.setState({ comments: res.data }, () => {
            resolve();
            });
        })
         .catch(error => {
            console.error(error);
            reject(error);
        });
  });
}

// guestCall()
// {
//   console.log("IM IN GUEST CALL BABY")
//   const guestlogin = async () => {
//     const loginGuest = {
//       name: "Guest",
//     };
//     try {
//       const response = await axios.post('http://localhost:8000/loginguest', loginGuest);
//       localStorage.setItem('sessionID', response.data.sessionID);
//       console.log("IM INSIDE THE TRY IN GUEST CALL")
//       this.setState({isGuest:true})
//       this.setState({ showMainPage: true });
//       console.log(this.state.showMainPage)
//       this.openMainPage()
//     } catch (error) {
//       console.error('Error logging in: ', error);
//       throw error; 
//     }
//   };

//   guestlogin()
// }
// guestCall()
// {
//   console.log("IM IN GUEST CALL BABY")
//   const guestlogin = async () => {
//     const loginGuest = {
//       name: "Guest",
//     };
//     try {
//       const response = await axios.post('http://localhost:8000/loginguest', loginGuest);
//       localStorage.setItem('sessionID', response.data.sessionID);
//       console.log("IM INSIDE THE TRY IN GUEST CALL")
//       this.setState({isGuest:true})
//       this.setState({ showMainPage: true });
//       console.log(this.state.showMainPage)
//       this.openMainPage()
//     } catch (error) {
//       console.error('Error logging in: ', error);
//       throw error; 
//     }
//   };

//   guestlogin()
// }

guestCall() {
  console.log("IM IN GUEST CALL BABY");

  const guestlogin = async () => {
  try {
    // const response = await axios.post('http://localhost:8000/loginguest', {withCredentials:true});
    const response = await axios.post('http://localhost:8000/loginguest', null, { withCredentials: true });
    localStorage.setItem('sessionID', response.data.sessionID);
    console.log("IM INSIDE THE TRY IN GUEST CALL");
    localStorage.setItem("isGuest",true)
    this.setState({ showMainPage: true });
    console.log(this.state.showMainPage);
    this.openMainPage();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


  guestlogin();
}


componentDidMount() {
    // console.log("HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLO")
    this.answersCall();
    this.questionsCall();
    this.tagsCall();
    this.usersCall();
    this.commentsCall();
}

getRep(){
  this.usersCall()
  console.log(this.state.userstest)
  for(var x = 0; x < this.state.userstest.length; x++)
      {
          if(this.state.userstest[x].email === localStorage.getItem("loggedInEmail"))
          {
              console.log("MY REP: " + this.state.userstest[x].reputation)
              return this.state.userstest[x].reputation
          }
      }
}

async removeSession() {
  
  console.log("IM IN THE REMOVE SESSION FUNCTION")

  const cancelTokenSource = axios.CancelToken.source();

  const logout = async (elem) => {
    const logoutData = {
      sessiondestroy: elem
    };

    try {
      // await axios.post('http://localhost:8000/logout', logoutData, {
      //   // cancelToken: cancelTokenSource.token
      // });
      await axios.post('http://localhost:8000/logout', logoutData, {
        withCredentials: false,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error logging out:', error);
      }
      throw error;
    }
    
  };

  console.log("SESSION TIME HERE");
  console.log(sessiontime);

  // await logout(sessiontime);

  try {
    console.log("SESSION TIME IN TRY BLOCK")
    console.log(localStorage.getItem("sessiontime"))
    await logout(localStorage.getItem("sessiontime"));
    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
    // Handle error, e.g., show an error message to the user
  }

  sessiontime = null;
  localStorage.removeItem("sessionID");
  localStorage.removeItem("loggedInUsername");
  localStorage.removeItem("sessiontime")
  localStorage.removeItem("registeredDate")
  localStorage.removeItem("loggedInEmail")
  localStorage.removeItem("isGuest")
  localStorage.removeItem("isAdmin")
  console.log(localStorage)

  this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showActive: false});
      this.setState({register:false})
      this.setState({login:false})
      this.setState({isGuest:false})
      this.setState({showUserPage:false})
      this.setState({showQuestionEditPage:false})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})
      this.setState({showDisplayUserTags:false})
      this.setState({showAdminUserPage:false})
      cancelTokenSource.cancel('Request canceled due to logout');
}

postPass(elem, pass) {
  const login = async (elem, pass) => {
    const loginData = {
      name: elem,
      password: pass,
    };
    try {
      const response = await axios.post('http://localhost:8000/login', loginData, {withCredentials:true});
      const success = response.data.success;
      console.log('Response:', response.data);
      if(success){
      localStorage.setItem('sessionID', response.data.sessionID);
      }
      // console.log(sessiontime)
      console.log('Success:', success);
      return success;
    } catch (error) {
      console.error('Error logging in: ', error);
      throw error; 
    }
  };

  return login(elem, pass);
}


async logInTest(email, password) {
  this.setState({loginIncorrectEmailError: false});
  this.setState({loginEmptyEmailError: false});
  this.setState({loginIncorrectPasswordError: false});
  this.setState({loginEmptyPasswordError: false});
  this.setState({showUserQuestionAnswersPage:false})
  this.setState({showAnsweringPageNew:false})
  this.setState({showAdminUserPage:false})

  // const noErrorsLogin = {};
  if(this.state.userstest.length === 0){
    if(email == null || email.trim() === ''){
      this.setState({loginEmptyEmailError: true});
      if(password == null || password.trim() === ''){
        this.setState({loginEmptyPasswordError: true});
      }
    }
    else{
    this.setState({loginIncorrectEmailError: true});
    }
  }
  else{
  for (var x = 0; x < this.state.userstest.length; x++) {
    // console.log(this.state.userstest[x].email);
    if (email === this.state.userstest[x].email) {
      this.setState({loginIncorrectEmailError: false});
      if(password == null || password.trim() === ''){
        this.setState({loginEmptyPasswordError: true});
      }
      else{
        try {
          const success = await this.postPass(this.state.userstest[x], password);
          if (success) {
            // console.log("THIS IS THE USERNAME WHEN WE LOG IN " + this.state.userstest[x].username)
            // loggedInUsername = this.state.userstest[x].username
            localStorage.setItem("sessiontime",this.state.userstest[x])
            localStorage.setItem("loggedInUsername", this.state.userstest[x].username)
            localStorage.setItem("registeredDate",this.state.userstest[x].registeredDate)
            localStorage.setItem("loggedInEmail",this.state.userstest[x].email)
            localStorage.setItem("isAdmin",this.state.userstest[x].isAdmin)
            localStorage.setItem("isGuest",false)
            console.log("THIS IS THE IS ADMIN BOOLEAN" + localStorage.getItem("isAdmin"))
            console.log("THIS IS THE USERNAME WHEN WE LOG IN " + localStorage.getItem("loggedInUsername"))
            this.openMainPage();
            break; 
          }
          else{
            this.setState({loginIncorrectPasswordError: true});
          }
        } catch (error) {
          console.error('Error in logInTest:', error);
        }
      }
      break;
    }
    else if(email == null || email.trim() === ''){
      this.setState({loginEmptyEmailError: true});
      if(password == null || password.trim() === ''){
        this.setState({loginEmptyPasswordError: true});
      }
    }
    else{
      // console.log(email + "-------------" + this.state.userstest[x].email)
      this.setState({loginIncorrectEmailError: true});
    }
  }
  }
    // this.setState(noErrorsLogin, () => {
    //   if(this.state.loginIncorrectEmailError === false && this.state.loginIncorrectPasswordError === false){
    //   }
    // });
  }



// async removeGuestSession() {
//   console.log("IM IN THE REMOVE GUEST SESSION FUNCTION");

//   const cancelTokenSource = axios.CancelToken.source();

//   const logoutGuest = async (elem) => {
//     const logoutGuestData = {
//       sessiondestroy: elem
//     };

//     try {
      
//       await axios.post('http://localhost:8000/logoutguest', logoutGuestData, {
//         cancelToken: cancelTokenSource.token
//       });
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log('Request canceled:', error.message);
//       } else {
//         console.error('Error logging out:', error);
//       }
//       throw error; 
//     }
//   };

//   console.log("SESSION TIME HERE");
//   console.log(sessiontime);
  
//   logoutGuest(sessiontime);
  
//   cancelTokenSource.cancel('Request canceled due to logout');

//   sessiontime = null;
//   localStorage.removeItem("sessionID");

//   this.setState({
//     questionTitleTooLongError: false,
//     questionTitleError: false,
//     questionTextError: false,
//     questionTagTooLongError: false,
//     questionTagsError: false,
//     questionTooManyTagsError: false,
//     questionUsernameError: false,
//     questionHyperlinkFormatError: false,
//     showMainPage: false,
//     showAskQuestionPage: false,
//     showAnswersPage: false,
//     showSearchResults: false,
//     showTagsPage: false,
//     showSearchTags: false,
//     showAnsweringPage: false,
//     showUnansweredPage: false,
//     showActive: false,
//     register: false,
//     login: false,
//     isGuest: false
//   });
// }



newest()
  {
    this.state.questions.sort((a,b) => new Date(b.ask_date_time) - new Date(a.ask_date_time));
    this.openMainPage()
    console.log(this.state.questions)
}

unanswered() {
  console.log("Switching to unanswered page");
  this.setState({showUnansweredPage: true});
  this.setState({showMainPage: false})
  this.setState({showActive: false});
  this.setState({mainPagePageNumber: 1})
  console.log(this.state.questions);
}

active() {
  var timearr = []
  var temparr2 = []
  var mergearr = []
  console.log("IN ACTIVE: " + this.state.questions);
  for(var x = 0; x<this.state.questions.length; x++)
  {
      if(this.state.questions[x].answers.length!==0)
      {
      timearr.push(this.findSmallTime(this.state.questions[x]))
      }
      else 
      {
          mergearr.push(this.state.questions[x])
      }
  }
  
  timearr.sort((a,b) => new Date(b) - new Date(a));
  
  var size = timearr.length;
  
  
  console.log(" ")
  console.log("THIS IS timearr")
  console.log(timearr)
  
  var newsize = temparr2.length - size;

  for(var x = 0; x<this.state.questions.length; x++)
  {
    if(this.state.questions[x].answers.length!==0)
    {
      console.log("THIS MEANS IT ENTERS THE FIRST IF STATEMENT")
        for(var y = 0; y<timearr.length; y++)
        {
            for(var z = 0; z<this.state.questions.length; z++)
            {
                for(var w = 0; w<this.state.questions[z].answers.length; w++)
                {
  
                    if(timearr[y] === this.state.questions[z].answers[w].ans_date_time)
                    { 
                              var i = 0
  
                              while (i < newsize)
                              {
                                temparr2.splice(size,1)
                                 i++;
                              }
                        console.log(temparr2)
                        console.log("WE ARE ENTERING THE 2nd IF STATEMENT")
                        temparr2.push(this.state.questions[z]);
                    }
                }
            }
        }
    }
  }
  
  console.log(" ")
  console.log("THIS IS SIZE")
  console.log(size)
  
  console.log(" ")
  
  var i = 0
  
  while (i < newsize)
  {
    temparr2.splice(size,1)
    i++;
  }
  
  for(var x = 0; x<mergearr.length; x++)
  {
    console.log(temparr2[temparr2.length-1]!==mergearr[x])
    if(temparr2[temparr2.length-1] !== mergearr[x])
    {
      temparr2.push(mergearr[x])
    }
  }
  console.log(" ")
  for(var n = 0; n<temparr2.length; n++)
      {
          for(var m = 1; m<temparr2.length; m++)
          {
              
              if(temparr2[n]._id === temparr2[m]._id && n!==m)
              { 
                
                console.log("IM IN HERE MY BROTHER")
                 temparr2.splice(m,1);
              }
          }
      }
  console.log(temparr2)
  this.setState({showActive:true})
  this.setState({showUnansweredPage:false})
  this.updateQuestions(temparr2)
  console.log("THIS IS TEMPARR 2 "+ temparr2);
  
  }

findSmallTime(question)
{
    var temp = question.answers[0].ans_date_time
    for(var y = 0; y<question.answers.length; y++)
    {
        if(temp < new Date(question.answers[y].ans_date_time))
        {
            temp = question.answers[y].ans_date_time
        }
    } 
    return temp;
}

  openMainPage() {
      this.questionsCall()
   
      console.log("Switching to main page");
      this.setState({showMainPage: true})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false})
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showActive: false});
      this.setState({showUserPage:false})
      this.setState({showQuestionEditPage:false})
      this.setState({showDisplayUserTags:false})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})
      this.setState({showAdminUserPage:false})
  }

  openTagsPage(){
    console.log("Switching to Tags Page")
    this.setState({showMainPage: false});
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: false});
    this.setState({showTagsPage: true});
    this.setState({showSearchTags: false});
    this.setState({showAnsweringPage: false});
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showQuestionEditPage:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})
  }

  openUserPage(){
    console.log("Switching to User Page")
    this.setState({showMainPage: false});
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: false});
    this.setState({showTagsPage: false});
    this.setState({showSearchTags: false});
    this.setState({showAnsweringPage: false});
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showUserPage:true});
    this.setState({showQuestionEditPage:false})
    this.setState({showDisplayUserTags:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})
  }


  async openAnswersPage(question) {
    try{
      console.log("Switching to answers page");
      await this.questionsCall();
    }
    catch(error){
      console.log(error);
    }

      var questionUpdated;
      for(var i = 0; i < this.state.questions.length; i++){
        if(question._id === this.state.questions[i]._id){
          questionUpdated = this.state.questions[i];
        }
      }

      // console.log("THE VIEWS OF THE QUESTION AFTER UPDATE AND QUESTION CALL: " + questionUpdated.views);
      this.setState({clickedQuestionRef: questionUpdated});
      this.setState({showMainPage: false});
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: true});
      this.setState({showSearchResults: false});
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showActive: false});
      this.setState({showQuestionEditPage:false});
      this.setState({answersPagePageNumber: 1});
      this.setState({commentPagePageNumber: 1});
      this.setState({commentTooLongError: false});
      this.setState({commentEmptyError: false});
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:false})
      this.setState({showAnsweringPageNew:false})

      this.setState({repTooLowQuestionUpvote:false})
      this.setState({answerCommentTooLongError: false});
      this.setState({answerCommentEmptyError: false});
      this.setState({repTooLowComment: false});
      this.setState({repTooLowAnswerUpvote: false})
      this.setState({repTooLowQuestionComment: false})
      console.log("opening answers page and setting to false")

      this.setState({showAdminUserPage:false})
  }

  async openUserQuestionAnswerPage(question)
  {
    try{
      console.log("Switching to answers page");
      await this.questionsCall();
    }
    catch(error){
      console.log(error);
    }

      var questionUpdated;
      for(var i = 0; i < this.state.questions.length; i++){
        if(question._id === this.state.questions[i]._id){
          questionUpdated = this.state.questions[i];
        }
      }

      // console.log("THE VIEWS OF THE QUESTION AFTER UPDATE AND QUESTION CALL: " + questionUpdated.views);
      this.setState({clickedQuestionRef: questionUpdated});
    console.log("IM OPENING THE DISPLAY USER QUESTION ANSWER PAGEEEEEEEEEEEEE")
    this.setState({questionTitleTooLongError: false});
      this.setState({questionTitleError: false});
      this.setState({questionTextError: false});
      this.setState({questionTagTooLongError: false})
      this.setState({questionTagsError: false});
      this.setState({questionTooManyTagsError: false});
      this.setState({questionUsernameError: false});
      this.setState({questionHyperlinkFormatError: false})
      this.setState({showMainPage: false})
      this.setState({showAskQuestionPage: false});
      this.setState({showAnswersPage: false});
      this.setState({showSearchResults: false})
      this.setState({showTagsPage: false});
      this.setState({showSearchTags: false});
      this.setState({showAnsweringPage: false});
      this.setState({showUnansweredPage: false});
      this.setState({showUserPage:false})
      this.setState({showActive: false});
      this.setState({register:false})
      this.setState({login:false})
      this.setState({showQuestionEditPage:false})
      this.setState({showDisplayUserTags:false})
      this.setState({showUserAnswers:false})
      this.setState({showUserQuestionAnswersPage:true})
      this.setState({showAnsweringPageNew:false})
      this.setState({showAdminUserPage:false})
      
  }
  
  openSearchResultsPage(searchResults){
    this.setState({searchResultRef: searchResults});
    this.setState({noSearchResults: false});
    this.setState({showUserAnswers:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})
    

    console.log(searchResults);

    if(searchResults.length === 0){
      this.setState({noSearchResults: true});
      this.setState({mainPagePageNumber: 1})
      
    }

    this.setState({showMainPage: false});
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: true})
    this.setState({showTagsPage: false});
    this.setState({showSearchTags: false});
    this.setState({showAnsweringPage: false});
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showQuestionEditPage:false})
    this.setState({mainPagePageNumber: 1})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})
  }

  openSearchResultsTagsPage(tagsMatch){
    this.setState({tagsMatchRef: tagsMatch});
    this.setState({showMainPage: false});
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: false})
    this.setState({showTagsPage: false});
    this.setState({showSearchTags:true})
    this.setState({showAnsweringPage: false});
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showQuestionEditPage:false})
    this.setState({mainPagePageNumber: 1})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})
  }

  openAnsweringPage(){
    this.setState({answerUsernameError: false});
    this.setState({answerTextError: false});
    console.log("Switching to Answering Page")
    this.setState({showAnsweringPage: true});
    this.setState({showMainPage: false});
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: false});
    this.setState({showTagsPage: false});
    this.setState({answerHyperlinkFormatError: false});
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showQuestionEditPage:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})
  }

  openAnsweringPageNew(answer){
    this.setState({clickedAnswerRef: answer});
    this.setState({answerUsernameError: false});
    this.setState({answerTextError: false});
    console.log("Switching to Answering Page")
    this.setState({showAnsweringPage: false});
    this.setState({showMainPage: false});
    this.setState({showAskQuestionPage: false});
    this.setState({showAnswersPage: false});
    this.setState({showSearchResults: false});
    this.setState({showTagsPage: false});
    this.setState({answerHyperlinkFormatError: false});
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showQuestionEditPage:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:true})
    this.setState({showAdminUserPage:false})
  }

  addToUsers(email,password,passwordConfirm, username){
    this.setState({registerDuplicateUserError: false});
    this.setState({registerInvalidEmailError: false});
    this.setState({registerInvalidPasswordError: false});
    this.setState({registerEmptyUsername: false});
    this.setState({registerEmptyEmail: false});
    this.setState({registerEmptyPassword: false});
    this.setState({registerEmptyPasswordConfirm: false});
    this.setState({registerMismatchPassword: false});
    this.setState({showQuestionEditPage:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})

    const noErrorsRegister = {};

    if(username == null || username.trim() === ''){
      this.setState({registerEmptyUsername: true});
    }

    const dupeTest = this.state.userstest.some(user => user.email.toLowerCase() === email.toLowerCase());  
    const validUsernamePattern = /^[^\s]+@[^\s]+\.[^\s]+$/;

    if(email == null || email.trim() === ''){
      this.setState({registerEmptyEmail: true});
    }
    else if(validUsernamePattern.test(email) === false){
      this.setState({registerInvalidEmailError: true});
    }
    else if(dupeTest){
      this.setState({registerDuplicateUserError: true});
    }

    const lowercasePassword = password.toLowerCase();
    const lowercaseUsername = username.toLowerCase();
    const lowercaseEmailId = email.split('@')[0].toLowerCase();

    const containsUsername = lowercasePassword.includes(lowercaseUsername);
    const containsEmailId = lowercasePassword.includes(lowercaseEmailId);

    if(password == null || password.trim() === ''){
      this.setState({registerEmptyPassword: true});
    }
    else if(containsUsername === true || containsEmailId === true){
      this.setState({registerInvalidPasswordError: true});
    }

    if(passwordConfirm == null || passwordConfirm.trim() === ''){
      this.setState({registerEmptyPasswordConfirm: true});
    }
    else if(password !== passwordConfirm){
      this.setState({registerMismatchPassword: true});
    }

    // console.log("============")
    // console.log("dupeuser:" + this.state.registerDuplicateUserError)
    // console.log("invalidemail:" + this.state.registerInvalidEmailError)
    // console.log("invalidpass:" + this.state.registerInvalidPasswordError)
    // console.log("emptyusername:" + this.state.registerEmptyUsername)
    // console.log("emptyemail:" + this.state.registerEmptyEmail)
    // console.log("emptypassword:" + this.state.registerEmptyPassword)
    // console.log("emptypassconfirm:" + this.state.registerEmptyPasswordConfirm)
    // console.log("mismatchedpassword:" + this.state.registerMismatchPassword)
    // console.log("============")

    this.setState(noErrorsRegister, () => {
      if(this.state.registerDuplicateUserError === false && this.state.registerInvalidEmailError === false && 
        this.state.registerInvalidPasswordError === false && this.state.registerEmptyUsername === false &&
        this.state.registerEmptyEmail === false && this.state.registerEmptyPassword === false && 
        this.state.registerEmptyPasswordConfirm === false && this.state.registerMismatchPassword === false){
        const postUserToDB = async () => {
          const userData = {
              email:email,
              password:password,
              username:username,
              isAdmin:false
          };
          try {
              await axios.post('http://localhost:8000/postuser', userData);
              await this.usersCall();
              console.log(this.state.users)
              // console.log('Question created:', response.data);
          } catch (error) {
              console.error('Error posting user: ', error);
          }
        };
        postUserToDB();
        this.openLoginPage();
      }
    });
  }

  

  async addToQuestions(txt1,txt2,txt3,txt4){
    this.setState({questionTitleTooLongError: false});
    this.setState({questionTitleError: false});
    this.setState({questionTextError: false});
    this.setState({questionTagTooLongError: false})
    this.setState({questionTagsError: false});
    this.setState({questionTooManyTagsError: false});
    this.setState({questionUsernameError: false});
    this.setState({questionEmptySummaryError: false});
    this.setState({questionSummaryTooLongError: false});
    this.setState({questionHyperlinkFormatError: false})
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showQuestionEditPage:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})

    this.setState({repTooLowNewTag:false})
    this.setState({showAdminUserPage:false})
    
    const noErrorsQuestions = {};
    // console.log("THIS IS TO TEST THE USERNAME WHEN CLICKING POST: " + localStorage.getItem("loggedInUsername"))

    if(txt1 == null || txt1.trim() === ''){
      this.setState({questionTitleError: true});
      this.setState({questionTitleTooLongError: false});
    }
    else if(txt1.length > 50){
      this.setState({questionTitleTooLongError: true});
      this.setState({questionTitleError: false});
    }
    else{
      this.setState({questionTitleError: false});
      this.setState({questionTitleTooLongError: false});
    }

    const containsHyperLink = /\[[^\]]*\]\s*\([^)]*\)/  
    //                        /\[[^\]]+\]\s*\([^)]+\)/;
    const correctHyperLinkFormat = /\[([^[\]]*[a-zA-Z]+[^[\]]*)\]\s*\((https?:\/\/[^\s)]+)\)/g

    //                    /\[([^\[\]]+)\]\s*\((http[s]?:\/\/[^\s)]+)\)/g;
    if(txt2 == null || txt2.trim() === ''){
      this.setState({questionTextError: true});
    }
    else if(containsHyperLink.test(txt2) === true){
      console.log("THIS CONTAINS HYPERLINK")
      if(correctHyperLinkFormat.test(txt2) === false){
        console.log("THIS CONTAINS INCORRECT HYPERLINK")
        this.setState({questionHyperlinkFormatError: true})
      }
      else{
        console.log("THIS CONTAINS CORRECT HYPERLINK")
        this.setState({questionHyperlinkFormatError: false})
      }
    }
    else{
      this.setState({questionHyperlinkFormatError: false})
      this.setState({questionTextError: false});
    }
    
    var tagArrErrorUnfiltered = [];
    var tagArrError = [];
    var tagArrErrorLower = [];

    if(txt3 != null){
      tagArrErrorUnfiltered = txt3.split(" ")
      tagArrError = tagArrErrorUnfiltered.filter(element => /\S/.test(element));
      tagArrErrorLower = Array.from(new Set(tagArrError.map(tag => tag.toLowerCase())));
    }

    var rep = await this.getRep()

    if(txt3 == null || txt3.trim() === ''){
      this.setState({questionTagsError: true});
    }
    else if(tagArrError.length > 5){
      this.setState({questionTooManyTagsError: true});
    }
    else{
      for(var i = 0; i < tagArrError.length; i++){
        if(tagArrError[i].length > 10){
          this.setState({questionTagTooLongError: true})
          break;
        }
      }
      await this.tagsCall();
      console.log(tagArrErrorLower)
      console.log(this.state.tags)
      if(localStorage.getItem("isAdmin") === false){
        if(rep < 50){
          for (var i = 0; i < tagArrErrorLower.length; i++) {
            var tagFound = false;
          
            for (var j = 0; j < this.state.tags.length; j++) {
              if (this.state.tags[j].name === tagArrErrorLower[i]) {
                tagFound = true;
                break;
              }
            }

            if (tagFound === false) {
              this.setState({repTooLowNewTag: true});
              break;
            }
          }
        }
      }
    }
    
    if(txt4 == null || txt4.trim() === ''){
      this.setState({questionEmptySummaryError: true});
    }
    else if(txt4.length > 140){
      this.setState({questionSummaryTooLongError: true})
    }
    else{
      this.setState({questionEmptySummaryError: false});
      this.setState({questionSummaryTooLongError: false})
    }

    this.setState(noErrorsQuestions, () => {
      if(this.state.questionTitleError === false && this.state.questionTextError === false && this.state.questionTitleTooLongError === false
        && this.state.questionTagsError === false && this.state.questionTagTooLongError === false && this.state.questionUsernameError === false
        && this.state.questionTooManyTagsError === false && this.state.questionHyperlinkFormatError === false && this.state.repTooLowNewTag === false){
          
        var question = new Question()
        question.title=txt1
        question.askedBy=txt4
        // question.qid = "q" + (this.state.questions.length + 1)
        
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HYPERLINKSSSS
        
        if(containsHyperLink.test(txt2) === true){
          txt2 = txt2.replace(correctHyperLinkFormat, '<a href="$2" target="_blank">$1</a>');
          //this.setState({questionText: txt2});
        }

        question.text=txt2
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HYPERLINKSSSS
        
        //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&POST TAG TO DB
        const postTagToDB = async (newtag1) => {
          const tagData = {
              name: newtag1,
              email:localStorage.getItem("loggedInEmail")
          };
          try {
              const response = await axios.post('http://localhost:8000/posttag', tagData);
              // console.log('Tag created:', response.data);
          } catch (error) {
              // console.error('Error posting tag: ', error);
          }
        };
        
        const updateTagArr = async () => {
          try{
            var tagarrunfiltered=txt3.split(" ")
            var tagarrnotset = tagarrunfiltered.filter(tag => /\S/.test(tag));
            var tagarr = Array.from(new Set(tagarrnotset.map(tag => tag.toLowerCase())));

            var tagArrForQ = [];

            // console.log("TAGARR IS " + tagarr);
            await this.tagsCall();
            
            for(var i=0; i<tagarr.length;i++)
            {
              // console.log("THE ONE PIECE: " + this.state.tags.length)
                if(this.state.tags.length === 0){
                  await postTagToDB(tagarr[i])
                  await this.tagsCall()
                }
                
                if(this.state.tags.length !== 0){
                for(var x=0; x<this.state.tags.length; x++)
                {
                  // console.log("TAGARR[i] IS " + tagarr[i]);
                  // console.log("statetag[x] IS " + this.state.tags[x].name);
                  if(tagarr[i] === this.state.tags[x].name)
                  {
                    tagArrForQ.push(this.state.tags[x]._id);
                    break;
                  }
                  else if((!(tagarr[i] === this.state.tags[x].name)) && (x === this.state.tags.length-1)){
                    var newtag1 = tagarr[i];
                    await postTagToDB(newtag1);
                    await this.tagsCall();

                    for(var j = 0; j < this.state.tags.length; j++){
                      if(newtag1 === this.state.tags[j].name){
                        // console.log("this is after we push 1 new tag: " + tagarr);
                        // console.log("this is after we push 1 new tag i is: " + j);
                        tagArrForQ.push(this.state.tags[j]._id);
                      }
                    }

                    // await this.tagsCall();
                    // await this.tagsCall();
                    // newtag1.name=tagarr[i];

                    // var newlength = tags.length+1;
                    // newtag1.tid="t"+newlength;
                    // tags.push(newtag1);
                    // tagArrForQ.push(newtag1.tid);

                    break;
                  }
                }
              }
            }
            txt3=tagArrForQ;
            // console.log("THIS IS THE ARRAY TAGARRFORQ");
            // console.log(tagArrForQ);
          }
          catch(error){
            console.log(error);
          }
        }
        //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&POST TAG TO DB

        //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&POST QUESTION TO DB
        // console.log(txt1);
        // console.log(txt2);
        // console.log(txt3);
        // console.log(txt4);
        
        // console.log("THIS IS TO TEST USERNAME WHEN MAKING QUESTION " + localStorage.getItem("loggedInUsername"))

        const postQuestionToDB = async () => {
          // console.log("THIS IS TXT3: " + txt3);
          console.log("THIS IS IN POST QUESTION TO DB")
          // console.log(localStorage.getItem("userEmail"))
          const questionData = {
              title: txt1,
              summary: txt4,
              text: txt2,
              tags: txt3,
              asked_by: localStorage.getItem("loggedInUsername"),
              email: localStorage.getItem("loggedInEmail")
          };

          console.log("in postQuestionToDB");

          // console.log(txt1);
          // console.log(txt2);
          // console.log(txt3);
          // console.log(txt4);
          // console.log(questionData);
          try {
              await axios.post('http://localhost:8000/postquestion', questionData);
              // console.log('Question created:', response.data);
          } catch (error) {
              console.error('Error posting question: ', error);
          }
      };

        const updateTagArrAndPost = async () => {
          try{
            await updateTagArr();
            await postQuestionToDB();
            await this.questionsCall();
            await this.questionsCall();
            this.openMainPage();
          }
          catch(error){
            console.log(error);
          }
        }
        updateTagArrAndPost();
        //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&POST QUESTION TO DB
        ////newModel.data.questions.unshift(question);
      }
    });

  }

  tagUpdater()
  {
    this.tagsCall();
    this.tagsCall();
  }

  questionUpdater()
  {
      this.questionsCall();
      this.questionsCall();
  }

  createAndAddAnswer(ansText, ansBy, question){
    this.setState({answerUsernameError: false});
    this.setState({answerTextError: false});
    this.setState({answerHyperlinkFormatError: false});
    this.setState({showUnansweredPage: false});
    this.setState({showActive: false});
    this.setState({showQuestionEditPage:false})
    this.setState({showUserAnswers:false})
    this.setState({showUserQuestionAnswersPage:false})
    this.setState({showAnsweringPageNew:false})
    this.setState({showAdminUserPage:false})

    const noErrorsAnswer = {};
    const containsHyperLink = /\[[^\]]*\]\s*\([^)]*\)/ 
    const correctHyperLinkFormat = /\[([^[\]]*[a-zA-Z]+[^[\]]*)\]\s*\((https?:\/\/[^\s)]+)\)/g

    if(ansText == null || ansText.trim() === ""){
      this.setState({answerTextError: true});
    }
    else if(containsHyperLink.test(ansText) === true){
      console.log("THIS CONTAINS HYPERLINK")
      if(correctHyperLinkFormat.test(ansText) === false){
        console.log("THIS CONTAINS INCORRECT HYPERLINK")
        this.setState({answerHyperlinkFormatError: true})
      }
      else{
        console.log("THIS CONTAINS CORRECT HYPERLINK")
        this.setState({answerHyperlinkFormatError: false})
      }
    }
    else{
      this.setState({answerTextError: false});
      this.setState({answerHyperlinkFormatError: false})
    }

    // if(ansBy == null || ansBy.trim() === ""){
    //   this.setState({answerUsernameError: true});
    // }
    // else{
    //   this.setState({answerUsernameError: false});
    // }

    this.setState(noErrorsAnswer, () => {
      if(this.state.answerUsernameError === false && this.state.answerTextError === false && this.state.answerHyperlinkFormatError === false){
        // var answer = new Answer();

        if(containsHyperLink.test(ansText) === true){
          ansText = ansText.replace(correctHyperLinkFormat, '<a href="$2" target="_blank">$1</a>');
        }

        // answer.text = ansText;
        // answer.ansBy = ansBy;
        // answer.aid = "a" + (answers.length + 1)
        // answers.push(answer)

        //****************************************************************POSTING ANSWER TO DB */
        const postAnswerToDB = async () => {
          const answerData = {
              text: ansText,
              ans_by: localStorage.getItem("loggedInUsername"),
              questionID: question._id,
              email: localStorage.getItem("loggedInEmail")
          };
          // console.log("in postAnswerToDB");
          // console.log(ansText);
          // console.log(ansBy);
          // console.log(question._id);
          // console.log(answerData);
          try {

              const response = await axios.post('http://localhost:8000/postanswer', answerData);
              console.log('Answer created:', response.data);
              await this.answersCall();
              await this.questionsCall();
              // console.log("after posting answer" + question.answers);
              this.openAnswersPage(question);
              // console.log("after switching to answer page" + question.answers);
          } catch (error) {
              console.error('Error posting answer: ', error);
          }
      };
        postAnswerToDB();
        //****************************************************************POSTING ANSWER TO DB */

        // question.ansIds.push(answer.aid)
        // this.openAnswersPage(question)
      }
    });
  }

  incrementMainPage(arrLength) {
    this.setState(
      (prevState) => ({ mainPagePageNumber: prevState.mainPagePageNumber + 1 }),
      () => {
        var lengthOfQuestions = arrLength;
        const newPageNumber = this.state.mainPagePageNumber;
  
        if ((newPageNumber - 1) * 5 >= lengthOfQuestions) {
          this.setState({ mainPagePageNumber: 1 }, () => {
            console.log("I just incremented and reset to 1");
            console.log("Length of questions: " + lengthOfQuestions);
          });
        } else {
          console.log("I just incremented: " + newPageNumber);
          console.log("Length of questions: " + lengthOfQuestions);
        }
      }
    );
  }
  
  decrementMainPage() {
    this.setState({ mainPagePageNumber: this.state.mainPagePageNumber - 1 });
    console.log("I just decremented" + this.state.mainPagePageNumber)
  }

  incrementAnswersPage(arrLength) {
    this.setState(
      (prevState) => ({ answersPagePageNumber: prevState.answersPagePageNumber + 1 }),
      () => {
        var lengthOfQuestions = arrLength;
        const newPageNumber = this.state.answersPagePageNumber;
  
        if ((newPageNumber - 1) * 5 >= lengthOfQuestions) {
          this.setState({ answersPagePageNumber: 1 }, () => {
            console.log("I just incremented and reset to 1");
            console.log("Length of questions: " + lengthOfQuestions);
          });
        } else {
          console.log("I just incremented: " + newPageNumber);
          console.log("Length of questions: " + lengthOfQuestions);
        }
      }
    );
  }
  
  decrementAnswersPage() {
    this.setState({ answersPagePageNumber: this.state.answersPagePageNumber - 1 });
    console.log("I just decremented" + this.state.answersPagePageNumber)
  }

  incrementCommentsPage(arrLength) {
    this.setState(
      (prevState) => ({ commentPagePageNumber: prevState.commentPagePageNumber + 1 }),
      () => {
        var lengthOfQuestions = arrLength;
        const newPageNumber = this.state.commentPagePageNumber;
  
        if ((newPageNumber - 1) * 3 >= lengthOfQuestions) {
          this.setState({ commentPagePageNumber: 1 }, () => {
            console.log("I just incremented and reset to 1");
            console.log("Length of questions: " + lengthOfQuestions);
          });
        } else {
          console.log("I just incremented: " + newPageNumber);
          console.log("Length of questions: " + lengthOfQuestions);
        }
      }
    );
  }
  
  decrementCommentsPage() {
    this.setState({ commentPagePageNumber: this.state.commentPagePageNumber - 1 });
    console.log("I just decremented" + this.state.commentPagePageNumber)
  }

  //////////////////////////////////////////////////////////////////////////////////////VOTING FOR QUESTIONS////////
  async addUpvoteToQuestion(question) {
    return new Promise(async (resolve, reject) => {
      const questionData = {
        questionID: question._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/postupvote', questionData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error posting upvote: ', error);
        reject(error);
      }
    });
  }
  
  async addDownvoteToQuestion(question) {
    return new Promise(async (resolve, reject) => {
      const questionData = {
        questionID: question._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/postdownvote', questionData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error posting downvote: ', error);
        reject(error);
      }
    });
  }
  
  async removeUpvoteFromQuestion(question) {
    return new Promise(async (resolve, reject) => {
      const questionData = {
        questionID: question._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/removeupvote', questionData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error removing upvote: ', error);
        reject(error);
      }
    });
  }
  
  async removeDownvoteFromQuestion(question) {
    return new Promise(async (resolve, reject) => {
      const questionData = {
        questionID: question._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/removedownvote', questionData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error removing downvote: ', error);
        reject(error);
      }
    });
  }

  async giveRep(userEmail) {
    return new Promise(async (resolve, reject) => {
      const userData = {
        userEmail: userEmail,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/giverep', userData);
        await this.usersCall()
        // await this.commentsCall()
        // await this.answersCall()
        // await this.questionsCall()
        resolve(response);
      } catch (error) {
        console.error('Error giving rep: ', error);
        reject(error);
      }
    });
  }

  async take5Rep(userEmail) {
    return new Promise(async (resolve, reject) => {
      const userData = {
        userEmail: userEmail,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/take5rep', userData);
        await this.usersCall()
        // await this.commentsCall()
        // await this.answersCall()
        // await this.questionsCall()
        resolve(response);
      } catch (error) {
        console.error('Error taking rep: ', error);
        reject(error);
      }
    });
  }

  async take10Rep(userEmail) {
    return new Promise(async (resolve, reject) => {
      const userData = {
        userEmail: userEmail,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/take10rep', userData);
        await this.usersCall()
        // await this.commentsCall()
        // await this.answersCall()
        // await this.questionsCall()
        resolve(response);
      } catch (error) {
        console.error('Error taking rep: ', error);
        reject(error);
      }
    });
  }
  

  async upvoteQuestion(question){
    this.setState({repTooLowQuestionUpvote: false})

    const noErrorsUpvote = {};

    var rep = await this.getRep()

    if(rep < 50 && localStorage.getItem("isAdmin") === false){
      this.setState({repTooLowQuestionUpvote: true})
    }

    console.log("THIS IS THE UPVOTES ARRAY" + question.upvotes)
    console.log("THIS IS THE EMAIL OF THE OWNER OF THE QUESTION: " + question.email)

    const upvoteQuestionAsync = async () => {
      for(var i = 0; i <= question.upvotes.length; i++){
        console.log("UPVOTE EMAIL: "+ question.upvotes[i])
        console.log("LOCAL STORAGE EMAIL: "+ localStorage.getItem("loggedInEmail"))
        console.log("I IS: "+ i)

        if(question.upvotes[i] === localStorage.getItem("loggedInEmail")){
          console.log("WHEN I REMOVE AN UPVOTE THIS IS THE EMAIL: "+ question.upvotes[i])
          await this.removeUpvoteFromQuestion(question)
          await this.take5Rep(question.email)
          await this.usersCall();
          break;
        }
        // console.log("I IS: "+ i)
        if(i === (question.upvotes.length) && question.upvotes[i] != localStorage.getItem("loggedInEmail")){
          console.log("WE COULD NOT FIND EMAIL IN UPVOTES")
          for(var j = 0; j <= question.downvotes.length; j++){
            console.log("J IS: " + j)
            if(question.downvotes[j] === localStorage.getItem("loggedInEmail")){
              await this.removeDownvoteFromQuestion(question)
              await this.giveRep(question.email)
              await this.giveRep(question.email)
              await this.addUpvoteToQuestion(question)
              await this.giveRep(question.email)
              await this.usersCall();
              break;
            }
            if(j === (question.downvotes.length) && question.downvotes[j] != localStorage.getItem("loggedInEmail")){
              console.log("NOT IN EITHER SO WE ADDDDDDDDDDDDD")
              await this.addUpvoteToQuestion(question)
              await this.giveRep(question.email)
              await this.usersCall();
              break;
            }
          }
        }
      }
    }

    this.setState(noErrorsUpvote, () => {
      if(this.state.repTooLowQuestionUpvote === false){
        upvoteQuestionAsync()
      }
    })
    
    console.log("UPVOTING" + question.title)
    console.log("TOTAL UPVOTES IS: " + question.upvotes.length)
    console.log("TOTAL DOWNVOTES IS: " + question.downvotes.length)
    
  }

  async downvoteQuestion(question){
    this.setState({repTooLowQuestionUpvote: false})

    const noErrorsUpvote = {};

    var rep = await this.getRep()

    if(rep < 50 && localStorage.getItem("isAdmin") === false){
      this.setState({repTooLowQuestionUpvote: true})
    }

    console.log("THIS IS THE DOWNVOTE ARRAY" + question.downvotes)

    const downvoteQuestionAsync = async () => {
      for(var i = 0; i <= question.downvotes.length; i++){
        console.log("DOWNVOTE EMAIL: "+ question.upvotes[i])
        console.log("LOCAL STORAGE EMAIL: "+ localStorage.getItem("loggedInEmail"))
        console.log("I IS: "+ i)
        if(question.downvotes[i] === localStorage.getItem("loggedInEmail")){
          console.log("WHEN I REMOVE AN DOWNVOTE THIS IS THE EMAIL: "+ question.upvotes[i])
          await this.removeDownvoteFromQuestion(question)
          await this.giveRep(question.email)
          await this.giveRep(question.email)
          await this.usersCall();
          break;
        }

        if(i === question.downvotes.length && question.downvotes[i] != localStorage.getItem("loggedInEmail")){
          console.log("WE COULD NOT FIND EMAIL IN DOWNVOTES")
          for(var j = 0; j <= question.upvotes.length; j++){
            console.log("J IS: " + j)
            if(question.upvotes[j] === localStorage.getItem("loggedInEmail")){
              await this.removeUpvoteFromQuestion(question)
              await this.take5Rep(question.email)
              await this.addDownvoteToQuestion(question)
              await this.take10Rep(question.email)
              await this.usersCall();
              break;
            } 
            if(j === question.upvotes.length && question.upvotes[j] != localStorage.getItem("loggedInEmail"))
              console.log("NOT IN EITHER SO WE ADDDDDDDDDDDDD")
              await this.addDownvoteToQuestion(question)
              await this.take10Rep(question.email)
              await this.usersCall();
              break;
          }
        }
      }
    }
    
    this.setState(noErrorsUpvote, () => {
      if(this.state.repTooLowQuestionUpvote === false){
        downvoteQuestionAsync()
      }
    })

    console.log("DOWNVOTING" + question.title)
    console.log("TOTAL UPVOTES IS: " + question.upvotes.length)
    console.log("TOTAL DOWNVOTES IS: " + question.downvotes.length)
  }

  //////////////////////////////////////////////////////////////////////////////////////VOTING FOR ANSWERS////////
  async addUpvoteToAnswer(answer, question) {
    return new Promise(async (resolve, reject) => {
      const answerData = {
        answerID: answer._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/postupvoteanswer', answerData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error posting upvote to answer: ', error);
        reject(error);
      }
    });
  }
  
  async addDownvoteToAnswer(answer, question) {
    return new Promise(async (resolve, reject) => {
      const answerData = {
        answerID: answer._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/postdownvoteanswer', answerData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error posting downvote to answer: ', error);
        reject(error);
      }
    });
  }
  
  async removeUpvoteFromAnswer(answer, question) {
    return new Promise(async (resolve, reject) => {
      const answerData = {
        answerID: answer._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/removeupvoteanswer', answerData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error removing upvote from answer: ', error);
        reject(error);
      }
    });
  }
  
  async removeDownvoteFromAnswer(answer, question) {
    return new Promise(async (resolve, reject) => {
      const answerData = {
        answerID: answer._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/removedownvoteanswer', answerData);
        await this.answersCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error removing downvote from answer: ', error);
        reject(error);
      }
    });
  }
  

  async upvoteAnswer(answer, question){
    this.setState({repTooLowAnswerUpvote: false})

    const noErrorsUpvote = {};

    var rep = await this.getRep()

    if(rep < 50 && localStorage.getItem("isAdmin") === false){
      this.setState({repTooLowAnswerUpvote: true})
    }
    // console.log("THIS IS THE UPVOTES ARRAY" + answer.upvotes)

    const upvoteAnswerAsync = async () => {
      for(var i = 0; i <= answer.upvotes.length; i++){
        console.log("UPVOTE EMAIL: "+ answer.upvotes[i])
        console.log("LOCAL STORAGE EMAIL: "+ localStorage.getItem("loggedInEmail"))
        console.log("I IS: "+ i)

        if(answer.upvotes[i] === localStorage.getItem("loggedInEmail")){
          console.log("WHEN I REMOVE AN UPVOTE THIS IS THE EMAIL: "+ answer.upvotes[i])
          await this.removeUpvoteFromAnswer(answer, question)
          await this.take5Rep(answer.email)
          await this.usersCall();
          break;
        }
        // console.log("I IS: "+ i)
        if(i === (answer.upvotes.length) && answer.upvotes[i] != localStorage.getItem("loggedInEmail")){
          console.log("WE COULD NOT FIND EMAIL IN UPVOTES")
          for(var j = 0; j <= answer.downvotes.length; j++){
            console.log("J IS: " + j)
            if(answer.downvotes[j] === localStorage.getItem("loggedInEmail")){
              await this.removeDownvoteFromAnswer(answer,question)
              await this.giveRep(answer.email)
              await this.giveRep(answer.email)
              await this.addUpvoteToAnswer(answer, question)
              await this.giveRep(answer.email)
              await this.usersCall();
              break;
            }
            if(j === (answer.downvotes.length) && answer.downvotes[j] != localStorage.getItem("loggedInEmail")){
              console.log("NOT IN EITHER SO WE ADDDDDDDDDDDDD")
              await this.addUpvoteToAnswer(answer, question)
              await this.giveRep(answer.email)
              await this.usersCall();
              break;
            }
          }
        }
      }
    }
    
    this.setState(noErrorsUpvote, () => {
      if(this.state.repTooLowAnswerUpvote === false){
        upvoteAnswerAsync()
      }
    })
    console.log("UPVOTING" + answer.text)
    console.log("TOTAL UPVOTES IS: " + answer.upvotes.length)
    console.log("TOTAL DOWNVOTES IS: " + answer.downvotes.length)
    
  }

  async downvoteAnswer(answer, question){
    this.setState({repTooLowAnswerUpvote: false})

    const noErrorsUpvote = {};

    var rep = await this.getRep()

    if(rep < 50 && localStorage.getItem("isAdmin") === false){
      this.setState({repTooLowAnswerUpvote: true})
    }

    const downvoteAnswerAsync = async () => {
      console.log("THIS IS THE DOWNVOTE ARRAY" + answer.downvotes)
      for(var i = 0; i <= answer.downvotes.length; i++){
        console.log("DOWNVOTE EMAIL: "+ answer.upvotes[i])
        console.log("LOCAL STORAGE EMAIL: "+ localStorage.getItem("loggedInEmail"))
        console.log("I IS: "+ i)
        if(answer.downvotes[i] === localStorage.getItem("loggedInEmail")){
          console.log("WHEN I REMOVE AN DOWNVOTE THIS IS THE EMAIL: "+ answer.upvotes[i])
          await this.removeDownvoteFromAnswer(answer, question)
          await this.giveRep(answer.email)
          await this.giveRep(answer.email)
          await this.usersCall();
          break;
        }

        if(i === answer.downvotes.length && answer.downvotes[i] != localStorage.getItem("loggedInEmail")){
          console.log("WE COULD NOT FIND EMAIL IN DOWNVOTES")
          for(var j = 0; j <= answer.upvotes.length; j++){
            console.log("J IS: " + j)
            if(answer.upvotes[j] === localStorage.getItem("loggedInEmail")){
              await this.removeUpvoteFromAnswer(answer, question)
              await this.take5Rep(answer.email)
              await this.addDownvoteToAnswer(answer, question)
              await this.take10Rep(answer.email)
              await this.usersCall();
              break;
            } 
            if(j === answer.upvotes.length && answer.upvotes[j] != localStorage.getItem("loggedInEmail"))
              console.log("NOT IN EITHER SO WE ADDDDDDDDDDDDD")
              await this.addDownvoteToAnswer(answer, question)
              await this.take10Rep(answer.email)
              await this.usersCall();
              break;
          }
        }
      }
    }
    
    this.setState(noErrorsUpvote, () => {
      if(this.state.repTooLowAnswerUpvote === false){
        downvoteAnswerAsync()
      }
    })
    console.log("DOWNVOTING" + answer.text)
    console.log("TOTAL UPVOTES IS: " + answer.upvotes.length)
    console.log("TOTAL DOWNVOTES IS: " + answer.downvotes.length)
  }

///////////////////////////////////////////////////////////////////////////////////////////////////

  createAndAddComment(commentText, question){
    this.setState({commentTooLongError: false})
    this.setState({commentEmptyError: false})
    this.setState({repTooLowQuestionComment: false})

    var rep = this.getRep();
    console.log("MY REP HERE: " + rep)
    const noErrorsComment = {};
    
    if(rep < 50 && localStorage.getItem("isAdmin") === false){
      console.log("REP TOO LOW")
      this.setState({repTooLowQuestionComment: true})
      this.setState({commentTooLongError: false})
      this.setState({commentEmptyError: false})
      this.openAnswersPage(question)
    }
    else if(commentText == null || commentText.trim() === ''){
      console.log("TEXT TOO EMPTY")
      this.setState({commentEmptyError: true})
      this.setState({commentTooLongError: false})
      this.setState({repTooLowQuestionComment: false})
      this.openAnswersPage(question)
    }
    else if(commentText.length > 140){
      console.log("TEXT TOO LONG")
      this.setState({commentTooLongError: true})
      this.setState({commentEmptyError: false})
      this.setState({repTooLowQuestionComment: false})
      this.openAnswersPage(question)
    }

    this.setState(noErrorsComment, () => {
      if(this.state.repTooLowQuestionComment === false && this.state.commentTooLongError === false && this.state.commentEmptyError === false){
      
      const postCommentToDB = async () => {
        const commentData = {
            text: commentText,
            ans_by: localStorage.getItem("loggedInUsername"),
            questionID: question._id,
            email: localStorage.getItem("loggedInEmail")
        };
        console.log("in postCommentToDB");
        console.log(commentText);
        // console.log(ansBy);
        console.log(question._id);
        console.log(commentData);
        try {
            const response = await axios.post('http://localhost:8000/postcomment', commentData);
            // console.log('Comment created:', response.data);
            await this.commentsCall();
            await this.answersCall();
            await this.questionsCall();
            // console.log("after posting answer" + question.answers);
            this.openAnswersPage(question);
            // console.log("after switching to answer page" + question.answers);
        } catch (error) {
            console.error('Error posting comment: ', error);
        }
    };
      postCommentToDB();
    }

    })
  }

  async addUpvoteToComment(comment, question) {
    return new Promise(async (resolve, reject) => {
      const commentData = {
        commentID: comment._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/postupvotecomment', commentData);
        await this.answersCall();
        await this.commentsCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error posting upvote to comment: ', error);
        reject(error);
      }
    });
  }

  async removeUpvoteFromComment(comment, question) {
    return new Promise(async (resolve, reject) => {
      const commentData = {
        commentID: comment._id,
        userEmail: localStorage.getItem("loggedInEmail"),
      };
  
      try {
        const response = await axios.post('http://localhost:8000/removeupvotecomment', commentData);
        await this.answersCall();
        await this.commentsCall();
        await this.questionsCall();
        this.openAnswersPage(question);
        resolve(response);
      } catch (error) {
        console.error('Error removing upvote from comment: ', error);
        reject(error);
      }
    });
  }

  async upvoteComment(comment, question){
    // console.log("THIS IS THE UPVOTES ARRAY" + comment.upvotes)
    for(var i = 0; i <= comment.upvotes.length; i++){
      console.log("UPVOTE EMAIL: "+ comment.upvotes[i])
      console.log("LOCAL STORAGE EMAIL: "+ localStorage.getItem("loggedInEmail"))
      console.log("I IS: "+ i)

      if(comment.upvotes[i] === localStorage.getItem("loggedInEmail")){
        console.log("WHEN I REMOVE AN UPVOTE THIS IS THE EMAIL: "+ comment.upvotes[i])
        await this.removeUpvoteFromComment(comment, question)
        break;
      }
      // console.log("I IS: "+ i)
      if(i === (comment.upvotes.length) && comment.upvotes[i] != localStorage.getItem("loggedInEmail")){
        console.log("WE COULD NOT FIND EMAIL IN UPVOTES SO WE ADD")
        await this.addUpvoteToComment(comment, question)
        break;
      }
    }
    
    console.log("UPVOTING" + comment.text)
    console.log("TOTAL UPVOTES IS: " + comment.upvotes.length)
    
  }
  ///////////////////////////////////////////////////////////////////////////////////////////ADDING COMMENTS TO ANSWER
  createAndAddCommentAnswer(commentText, question, answer){
    console.log("MARIO: " + commentText)
    console.log("LUIGI: " + question)
    console.log("PEACH: " + answer)
    this.setState({answerCommentTooLongError: false})
    this.setState({answerCommentEmptyError: false})
    this.setState({repTooLowComment: false})

    const noErrorsComment = {};
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII COMMENT TEXT: " + commentText)

    var rep = this.getRep();
    console.log("MY REP HERE: " + rep)
    
    if(rep < 50 && localStorage.getItem("isAdmin") === false){
      this.setState({repTooLowComment: true})
      this.setState({answerCommentEmptyError: false})
      this.setState({answerCommentTooLongError: false})
      this.openAnswersPage(question);
    }
    else if(commentText == null || commentText.trim() === ''){
      this.setState({answerCommentEmptyError: true})
      this.setState({repTooLowComment: false})
      this.setState({answerCommentTooLongError: false})
      this.openAnswersPage(question);
    }
    else if(commentText.length > 140){
      this.setState({answerCommentTooLongError: true})
      this.setState({repTooLowComment: false})
      this.setState({answerCommentEmptyError: false})
      this.openAnswersPage(question);
    }

    console.log("BOWSER")

    this.setState(noErrorsComment, () => {
      if(this.state.repTooLowComment === false && this.state.answerCommentTooLongError === false && this.state.answerCommentEmptyError === false){
      
      const postCommentToDBAnswer = async () => {
        const commentData = {
            text: commentText,
            ans_by: localStorage.getItem("loggedInUsername"),
            answerID: answer._id,
            email: localStorage.getItem("loggedInEmail")
        };
        console.log("in postCommentToDBAnswer");
        console.log(commentText);
        // console.log(ansBy);
        console.log(answer._id);
        console.log(commentData);
        try {
            const response = await axios.post('http://localhost:8000/postcommentanswer', commentData);
            // console.log('Comment created:', response.data);
            await this.commentsCall();
            await this.answersCall();
            await this.questionsCall();
            // console.log("after posting answer" + question.answers);
            this.openAnswersPage(question);
            // console.log("after switching to answer page" + question.answers);
        } catch (error) {
            console.error('Error posting comment: ', error);
        }
    };
      postCommentToDBAnswer();
    }

    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////HUGE EXPERIMENT
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {

    if( this.state.showAdminUserPage)
    {
      return (
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            openMainPageFunc = {this.openMainPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <DiplayAdminUserPage
          openMainPageFunc = {this.openMainPage}
          openTagsPageFunc = {this.openTagsPage}
          questions={this.state.questions}
          answers ={this.state.answers}
          tags = {this.state.tags}
          comments = {this.state.comments}
          openQuestionEditPageFunc ={this.openQuestionEditPage}
          openUserPageFunc = {this.openUserPage}
          isGuest = {this.state.isGuest}
          tagsCallFunc = {this.tagsCall}
          opendisplayUserTagsFunc = {this.opendisplayUserTags}
          openUserAnswersPageFunc = {this.openUserAnswersPage}
          users = {this.state.userstest}
          userRef = {this.state.clickedUserRef}
          //usersCall()
          />
        </>
      );
      
    }

    if(this.state.showUserQuestionAnswersPage)
    {
      return (
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            openMainPageFunc = {this.openMainPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <UserAnswersPage
            openAskQuestionPageFunc = {this.openAskQuestionPage} 
            openMainPageFunc = {this.openMainPage}
            answers = {this.state.answers}
            tags = {this.state.tags}
            questions = {this.state.questions} 
            comments = {this.state.comments}
            question = {this.state.clickedQuestionRef}
            openAnsweringPageFunc = {this.openAnsweringPage}
            openTagsPageFunc = {this.openTagsPage}
            answerHyperlinkFormatError = {this.state.answerHyperlinkFormatError}
            updateQuestions = {this.updateQuestions} 
            showActive = {this.state.showActive}
            isGuest = {this.state.isGuest}
            openUserPageFunc = {this.openUserPage}
            incrementAnswersPageFunc = {this.incrementAnswersPage}
            decrementAnswersPageFunc = {this.decrementAnswersPage}
            answersPagePageNumber = {this.state.answersPagePageNumber}
            upvoteQuestionFunc = {this.upvoteQuestion}
            downvoteQuestionFunc = {this.downvoteQuestion}
            upvoteAnswerFunc = {this.upvoteAnswer}
            downvoteAnswerFunc = {this.downvoteAnswer}
            createAndAddCommentFunc = {this.createAndAddComment}
            upvoteCommentFunc = {this.upvoteComment}
            commentPagePageNumber = {this.state.commentPagePageNumber}
            incrementCommentsPageFunc = {this.incrementCommentsPage}
            decrementCommentsPageFunc = {this.decrementCommentsPage}
            openAnswersPageFunc = {this.openAnswersPage}
            openUserQuestionAnswerPageFunc = {this.openUserQuestionAnswerPage}
            answersCall = {this.answersCall}
            openAnsweringPageNewFunc = {this.openAnsweringPageNew}
            createAndAddCommentAnswerFunc = {this.createAndAddCommentAnswer}
          />
        </>
      );

    }
    if(this.state.showUserAnswers)
    {
      return (
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            openMainPageFunc = {this.openMainPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <DisplayUserAnswers
            questions ={this.state.questions}
            tags = {this.state.tags}
            answers = {this.state.answers}
            openAskQuestionPageFunc = {this.openAskQuestionPage} 
            openAnswersPageFunc = {this.openAnswersPage}
            openMainPageFunc = {this.openMainPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            incrementMainPageFunc = {this.incrementMainPage}
            decrementMainPageFunc = {this.decrementMainPage}
            mainPagePageNumber = {this.state.mainPagePageNumber}
            isGuest = {this.state.isGuest}
            openUserPageFunc = {this.openUserPage}
            tagsCallFunc = {this.tagsCall}
            opendisplayUserTagsFunc = {this.opendisplayUserTags}
            openUserQuestionAnswerPageFunc = {this.openUserQuestionAnswerPage}
            userRef = {this.state.clickedUserRef}
            
          />
        </>
      );

    }
    if(this.state.showAnsweringPageNew)
    {
      return (
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            openMainPageFunc = {this.openMainPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <AnsweringQuestionPageNew
            question = {this.state.clickedQuestionRef}
            answer = {this.state.clickedAnswerRef}
            createAndAddAnswerFunc = {this.createAndAddAnswer}
            openMainPageFunc = {this.openMainPage}
            openTagsPageFunc = {this.openTagsPage}
            answerUsernameError = {this.state.answerUsernameError}
            answerTextError = {this.state.answerTextError}
            answerHyperlinkFormatError = {this.state.answerHyperlinkFormatError}
            showActive = {this.state.showActive}
            openUserPageFunc = {this.openUserPage}
            isGuest = {this.state.isGuest}
            openUserQuestionAnswerPageFunc = {this.openUserQuestionAnswerPage}
            answersCall = {this.answersCall}
            openUserAnswersPageFunc = {this.openUserAnswersPage}
            openAnsweringPageNewFunc = {this.openAnsweringPageNew}
          />
        </>
      );
    }
    if (this.state.showQuestionEditPage) {
      return (
      <>
        <Header
          questions={this.state.questions}
          tags={this.state.tags}
          content={this.state.content}
          onClick={this.openAskQuestionPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          openTagsPageFunc = {this.openTagsPage}
          openMainPageFunc = {this.openMainPage}
          noSearchResults = {this.state.noSearchResults}
          showActive = {this.state.showActive}
          removeSessionFunc = {this.removeSession}
          isGuest = {this.state.isGuest}
          removeGuestSessionFunc = {this.removeGuestSession}
        />
        <QuestionEditPage
        openMainPageFunc = {this.openMainPage}
        openTagsPageFunc = {this.openTagsPage}
        questions={this.state.questions}
        openQuestionEditPageFunc ={this.openQuestionEditPage}
        openUserPageFunc = {this.openUserPage}
        question ={this.state.questionRef}
        tags = {this.state.tags}
        submitFunc={this.submitDisplayEdit}
        cancelFunc={this.cancelDisplayEdit}
        addToQuestionsFunc={this.addToQuestions}
        questionTitleError = {this.state.questionTitleError}
        questionTextError = {this.state.questionTextError}
        questionTagsError = {this.state.questionTagsError}
        questionUsernameError = {this.state.questionUsernameError}
        questionTitleTooLongError = {this.state.questionTitleTooLongError}
        questionTooManyTagsError = {this.state.questionTooManyTagsError}
        questionTagTooLongError = {this.state.questionTagTooLongError}
        questionHyperlinkFormatError = {this.state.questionHyperlinkFormatError}
        showActive = {this.state.showActive}
        questionEmptySummaryError = {this.state.questionEmptySummaryError}
        questionSummaryTooLongError = {this.state.questionSummaryTooLongError}
        isGuest = {this.state.isGuest}
        questionCallFunc = {this.questionsCall}
        tagsCallFunc = {this.tagsCall}
        />
      </>
    );
    
    }
    if (this.state.showAskQuestionPage) {
      return (
      <>
        <Header
          questions={this.state.questions}
          tags={this.state.tags}
          content={this.state.content}
          onClick={this.openAskQuestionPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          openTagsPageFunc = {this.openTagsPage}
          openMainPageFunc = {this.openMainPage}
          noSearchResults = {this.state.noSearchResults}
          showActive = {this.state.showActive}
          removeSessionFunc = {this.removeSession}
          isGuest = {this.state.isGuest}
        />
          <AskQuestionPage 
          tags = {this.state.tags}
          openMainPageFunc = {this.openMainPage}
          submitFunc={this.submitDisplayEdit}
          cancelFunc={this.cancelDisplayEdit}
          addToQuestionsFunc={this.addToQuestions}
          openTagsPageFunc = {this.openTagsPage}
          questionTitleError = {this.state.questionTitleError}
          questionTextError = {this.state.questionTextError}
          questionTagsError = {this.state.questionTagsError}
          questionUsernameError = {this.state.questionUsernameError}
          questionTitleTooLongError = {this.state.questionTitleTooLongError}
          questionTooManyTagsError = {this.state.questionTooManyTagsError}
          questionTagTooLongError = {this.state.questionTagTooLongError}
          questionHyperlinkFormatError = {this.state.questionHyperlinkFormatError}
          showActive = {this.state.showActive}
          questionEmptySummaryError = {this.state.questionEmptySummaryError}
          questionSummaryTooLongError = {this.state.questionSummaryTooLongError}
          openUserPageFunc = {this.openUserPage}
          isGuest = {this.state.isGuest}
          repTooLowNewTag = {this.state.repTooLowNewTag}
          />
      </>
      );
    }

    if (this.state.showTagsPage) {
      return (
      <>
        <Header
          questions={this.state.questions}
          tags={this.state.tags}
          content={this.state.content}
          onClick={this.openAskQuestionPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          openTagsPageFunc = {this.openTagsPage}
          openMainPageFunc = {this.openMainPage}
          noSearchResults = {this.state.noSearchResults}
          showActive = {this.state.showActive}
          removeSessionFunc = {this.removeSession}
          isGuest = {this.state.isGuest}
          removeGuestSessionFunc = {this.removeGuestSession}
        />
        <TagsPage 
          tags = {this.state.tags}
          questions={this.state.questions}
          openMainPageFunc = {this.openMainPage}
          submitFunc={this.submitDisplayEdit}
          cancelFunc={this.cancelDisplayEdit}
          addToQuestionsFunc={this.addToQuestions}
          openTagsPageFunc = {this.openTagsPage}
          openAskQuestionPageFunc = {this.openAskQuestionPage} 
          openSearchResultsTagsPageFunc={this.openSearchResultsTagsPage}
          showActive = {this.state.showActive}
          isGuest = {this.state.isGuest}
          openUserPageFunc = {this.openUserPage}
          error = {this.state.error}
          openWelcomePageFunc = {this.openWelcomePage}

          />
      </>
    );
  }


    if (this.state.showAnswersPage) {
      return (
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            openMainPageFunc = {this.openMainPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <AnswersPage
            openAskQuestionPageFunc = {this.openAskQuestionPage} 
            openMainPageFunc = {this.openMainPage}
            answers = {this.state.answers}
            tags = {this.state.tags}
            questions = {this.state.questions} 
            comments = {this.state.comments}
            question = {this.state.clickedQuestionRef}
            openAnsweringPageFunc = {this.openAnsweringPage}
            openTagsPageFunc = {this.openTagsPage}
            answerHyperlinkFormatError = {this.state.answerHyperlinkFormatError}
            updateQuestions = {this.updateQuestions} 
            showActive = {this.state.showActive}
            isGuest = {this.state.isGuest}
            openUserPageFunc = {this.openUserPage}
            incrementAnswersPageFunc = {this.incrementAnswersPage}
            decrementAnswersPageFunc = {this.decrementAnswersPage}
            answersPagePageNumber = {this.state.answersPagePageNumber}
            upvoteQuestionFunc = {this.upvoteQuestion}
            downvoteQuestionFunc = {this.downvoteQuestion}
            upvoteAnswerFunc = {this.upvoteAnswer}
            downvoteAnswerFunc = {this.downvoteAnswer}
            openAnswersPageFunc = {this.openAnswersPage}

            createAndAddCommentFunc = {this.createAndAddComment}
            upvoteCommentFunc = {this.upvoteComment}
            commentPagePageNumber = {this.state.commentPagePageNumber}
            incrementCommentsPageFunc = {this.incrementCommentsPage}
            decrementCommentsPageFunc = {this.decrementCommentsPage}
            commentTooLongError = {this.state.commentTooLongError}
            commentEmptyError = {this.state.commentEmptyError}

            createAndAddCommentAnswerFunc = {this.createAndAddCommentAnswer}
            answerCommentTooLongError = {this.state.answerCommentTooLongError}
            answerCommentEmptyError = {this.state.answerCommentEmptyError}
            repTooLowComment = {this.state.repTooLowComment}
            repTooLowQuestionUpvote = {this.state.repTooLowQuestionUpvote}
            repTooLowAnswerUpvote = {this.state.repTooLowAnswerUpvote}
            repTooLowQuestionComment = {this.state.repTooLowQuestionComment}

            error = {this.state.error}
            openWelcomePageFunc = {this.openWelcomePage}

          />
        </>
      );
    }

    if(this.state.showAnsweringPage){
      return(
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            openMainPageFunc = {this.openMainPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <AnsweringQuestionPage
            question = {this.state.clickedQuestionRef}
            createAndAddAnswerFunc = {this.createAndAddAnswer}
            openMainPageFunc = {this.openMainPage}
            openTagsPageFunc = {this.openTagsPage}
            answerUsernameError = {this.state.answerUsernameError}
            answerTextError = {this.state.answerTextError}
            answerHyperlinkFormatError = {this.state.answerHyperlinkFormatError}
            showActive = {this.state.showActive}
            openUserPageFunc = {this.openUserPage}
            isGuest = {this.state.isGuest}
          />
        </>
      );
    }
    
    if (this.state.showDisplayUserTags) {
      return (
      <>
        <Header
          questions={this.state.questions}
          tags={this.state.tags}
          content={this.state.content}
          onClick={this.openAskQuestionPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          openTagsPageFunc = {this.openTagsPage}
          openMainPageFunc = {this.openMainPage}
          noSearchResults = {this.state.noSearchResults}
          showActive = {this.state.showActive}
          removeSessionFunc = {this.removeSession}
          isGuest = {this.state.isGuest}
          removeGuestSessionFunc = {this.removeGuestSession}
        />
        <DisplayUserTags
          questions ={this.state.questions}
          tags = {this.state.tags}
          openAskQuestionPageFunc = {this.openAskQuestionPage} 
          openAnswersPageFunc = {this.openAnswersPage}
          openMainPageFunc = {this.openMainPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          openTagsPageFunc = {this.openTagsPage}
          noSearchResults = {this.state.noSearchResults}
          showActive = {this.state.showActive}
          incrementMainPageFunc = {this.incrementMainPage}
          decrementMainPageFunc = {this.decrementMainPage}
          mainPagePageNumber = {this.state.mainPagePageNumber}
          isGuest = {this.state.isGuest}
          openUserPageFunc = {this.openUserPage}
          tagsCallFunc = {this.tagsCall}
          opendisplayUserTagsFunc = {this.opendisplayUserTags}
          userRef = {this.state.clickedUserRef}
        />
      </>
    );
  }

    if (this.state.showSearchResults) {
        return (
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            openMainPageFunc = {this.openMainPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <SearchResultsPage 
            questions = {this.state.searchResultRef} 
            tags = {this.state.tags}
            question = {this.state.clickedQuestionRef}
            openAskQuestionPageFunc = {this.openAskQuestionPage} 
            openAnswersPageFunc = {this.openAnswersPage}
            openMainPageFunc = {this.openMainPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            openTagsPageFunc = {this.openTagsPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            incrementMainPageFunc = {this.incrementMainPage}
            decrementMainPageFunc = {this.decrementMainPage}
            mainPagePageNumber = {this.state.mainPagePageNumber}
            isGuest = {this.state.isGuest}
            openUserPageFunc = {this.openUserPage}
          />
        </>
      );
    }

    if (this.state.showSearchTags) {
      return (
      <>
        <Header
          questions={this.state.questions}
          tags={this.state.tags}
          content={this.state.content}
          onClick={this.openAskQuestionPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          openTagsPageFunc = {this.openTagsPage}
          openMainPageFunc = {this.openMainPage}
          noSearchResults = {this.state.noSearchResults}
          showActive = {this.state.showActive}
          removeSessionFunc = {this.removeSession}
          isGuest = {this.state.isGuest}
          removeGuestSessionFunc = {this.removeGuestSession}
        />
        <SearchResultsTags
          questions = {this.state.tagsMatchRef} 
          tags = {this.state.tags}
          question = {this.state.clickedQuestionRef}
          openAskQuestionPageFunc = {this.openAskQuestionPage} 
          openAnswersPageFunc = {this.openAnswersPage}
          openMainPageFunc = {this.openMainPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          openSearchResultsTagsPageFunc={this.openSearchResultsTagsPage}
          openTagsPageFunc = {this.openTagsPage}
          showActive = {this.state.showActive}
          incrementMainPageFunc = {this.incrementMainPage}
          decrementMainPageFunc = {this.decrementMainPage}
          mainPagePageNumber = {this.state.mainPagePageNumber}
          isGuest = {this.state.isGuest}
          openUserPageFunc = {this.openUserPage}
        />
      </>
    );
  }
  if (this.state.showUnansweredPage) {
    return (
      <>
        <Header
          questions={this.state.questions}
          tags={this.state.tags}
          content={this.state.content}
          onClick={this.openAskQuestionPage}
          openSearchResultsPageFunc = {this.openSearchResultsPage}
          noSearchResults = {this.state.noSearchResults}
          showActive = {this.state.showActive}
          removeSessionFunc = {this.removeSession}
          isGuest = {this.state.isGuest}
          removeGuestSessionFunc = {this.removeGuestSession}
        />
        <UnansweredPage 
          questions = {this.state.questions} 
          tags = {this.state.tags}
          question = {this.state.clickedQuestionRef}
          openAskQuestionPageFunc = {this.openAskQuestionPage} 
          openAnswersPageFunc = {this.openAnswersPage}
          openMainPageFunc = {this.openMainPage}
          openTagsPageFunc = {this.openTagsPage}
          newestFunc = {this.newest}
          activeFunc = {this.active}
          unansweredFunc = {this.unanswered}
          showActive = {this.state.showActive}
          incrementMainPageFunc = {this.incrementMainPage}
          decrementMainPageFunc = {this.decrementMainPage}
          mainPagePageNumber = {this.state.mainPagePageNumber}
          isGuest = {this.state.isGuest}
          openUserPageFunc = {this.openUserPage}
          tagsCallFunc = {this.tagsCall}
        />
      </>
    );
  }
  if (this.state.showUserPage) {
    return (
    <>
      <Header
        questions={this.state.questions}
        tags={this.state.tags}
        content={this.state.content}
        onClick={this.openAskQuestionPage}
        openSearchResultsPageFunc = {this.openSearchResultsPage}
        openTagsPageFunc = {this.openTagsPage}
        openMainPageFunc = {this.openMainPage}
        noSearchResults = {this.state.noSearchResults}
        showActive = {this.state.showActive}
        removeSessionFunc = {this.removeSession}
        isGuest = {this.state.isGuest}
        removeGuestSessionFunc = {this.removeGuestSession}
      />
      <UserPage
      openMainPageFunc = {this.openMainPage}
      openTagsPageFunc = {this.openTagsPage}
      questions={this.state.questions}
      answers ={this.state.answers}
      tags = {this.state.tags}
      comments = {this.state.comments}
      openQuestionEditPageFunc ={this.openQuestionEditPage}
      openUserPageFunc = {this.openUserPage}
      isGuest = {this.state.isGuest}
      tagsCallFunc = {this.tagsCall}
      opendisplayUserTagsFunc = {this.opendisplayUserTags}
      openUserAnswersPageFunc = {this.openUserAnswersPage}
      users = {this.state.userstest}
      openAdminUserPageFunc = {this.openAdminUserPage}
      usersCall = {this.usersCall}
      error = {this.state.error}
      openWelcomePageFunc = {this.openWelcomePage}
      />
    </>
  );
  
}

  //console.log("THIS IS AT THE END OF THE RENDER NAOSDNAOISNDKANDLA" + this.state.questions);
    if(this.state.showMainPage || (localStorage.getItem('sessionID')!==null && localStorage.getItem('sessionID')!==undefined)){
      // console.log("RANDOMLY TESTING PAGE COUNT: " + this.state.mainPagePageNumber);
      return (
        <>
          <Header
            questions={this.state.questions}
            tags={this.state.tags}
            content={this.state.content}
            onClick={this.openAskQuestionPage}
            openSearchResultsPageFunc = {this.openSearchResultsPage}
            noSearchResults = {this.state.noSearchResults}
            showActive = {this.state.showActive}
            removeSessionFunc = {this.removeSession}
            sessiontime ={sessiontime}
            isGuest = {this.state.isGuest}
            removeGuestSessionFunc = {this.removeGuestSession}
          />
          <MainBody 
            questions = {this.state.questions} 
            tags = {this.state.tags}
            question = {this.state.clickedQuestionRef}
            openAskQuestionPageFunc = {this.openAskQuestionPage} 
            openAnswersPageFunc = {this.openAnswersPage}
            openMainPageFunc = {this.openMainPage}
            openTagsPageFunc = {this.openTagsPage}
            openUserPageFunc = {this.openUserPage}
            newestFunc = {this.newest}
            activeFunc = {this.active}
            unansweredFunc = {this.unanswered} 
            showActive = {this.state.showActive} 
            showActiveFunc = {this.active}
            incrementMainPageFunc = {this.incrementMainPage}
            decrementMainPageFunc = {this.decrementMainPage}
            mainPagePageNumber = {this.state.mainPagePageNumber}
            isGuest = {this.state.isGuest}
            tagsCallFunc = {this.tagsCall}
            error = {this.state.error}
            openWelcomePageFunc = {this.openWelcomePage}
          />
        </>
      );
  }


  if(this.state.register){
    return (
      <>
        <WelcomePageHeader/>
        <RegisterPage 
        loginPageFunc = {this.openLoginPage} 
        addToUsersFunc={this.addToUsers}
        registerDuplicateUserError = {this.state.registerDuplicateUserError}
        registerInvalidEmailError = {this.state.registerInvalidEmailError}
        registerInvalidPasswordError = {this.state.registerInvalidPasswordError}
        registerEmptyEmail = {this.state.registerEmptyEmail}
        registerEmptyUsername = {this.state.registerEmptyUsername}
        registerEmptyPassword = {this.state.registerEmptyPassword}
        registerEmptyPasswordConfirm = {this.state.registerEmptyPasswordConfirm}
        registerMismatchPassword = {this.state.registerMismatchPassword}
        openWelcomePageFunc = {this.openWelcomePage}
        />
      </>
    );
  }

  if(this.state.login){
    return (
      <>
        <WelcomePageHeader/>
        <LogInPage 
        openMainPageFunc = {this.openMainPage}
        testLoginFunc = {this.logInTest}
        loginIncorrectEmailError = {this.state.loginIncorrectEmailError}
        loginIncorrectPasswordError = {this.state.loginIncorrectPasswordError}
        loginEmptyEmailError = {this.state.loginEmptyEmailError}
        loginEmptyPasswordError = {this.state.loginEmptyPasswordError}
        openWelcomePageFunc = {this.openWelcomePage}
        />
      </>
    );
  }

  if(this.state.showWelcomePage){
    return(
      <>
      <WelcomePageHeader/>
      <WelcomePage
      openMainPageFunc = {this.openMainPage}
      registerPageFunc = {this.openRegisterPage}
      loginPageFunc = {this.openLoginPage}
      guestLoginFunc = {this.guestCall}
      />
      
      </>
    );
  }

    return(
      <>
      <WelcomePageHeader/>
      <WelcomePage
      openMainPageFunc = {this.openMainPage}
      registerPageFunc = {this.openRegisterPage}
      loginPageFunc = {this.openLoginPage}
      guestLoginFunc = {this.guestCall}
      />
      
      </>
    );
  }
}

export default function fakeStackOverflow() {
  return (
    <Webpage/>
  );
  }