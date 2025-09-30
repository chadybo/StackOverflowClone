import React from "react";
import { QuestionEditPage } from "./questionEditPage";
import axios from "axios";
export default function DisplayUsers(props) {


//   const handleQuestionClick = (question) => {
//     console.log("THIS IS JUST BEFORE IM SENDING HIM TO EDIT")
//     console.log(question)

//     props.openQuestionEditPageFunc(question)
//   };

    async function deleteUser(user, uid, questions, answers, tags, comments)
    {
        const handleDeleteComments= async (commentsId) => {
            try {
      
              await axios.delete(`http://localhost:8000/deletequestioncomments/${commentsId}`);
              console.log('Comments deleted successfully');
            } catch (error) {
              console.error('Error deleting comments:', error);
            }
          };

          const handleDeleteAnswer= async (answerId) => {
            try {
      
              await axios.delete(`http://localhost:8000/deleteanswer/${answerId}`);
              console.log('Answer deleted successfully');
            } catch (error) {
              console.error('Error deleting tag:', error);
            }
          };

          const handleDeleteTag = async (tagId) => {
            try {
      
              await axios.delete(`http://localhost:8000/deletetag/${tagId}`);
              console.log('Tag deleted successfully');
            } catch (error) {
              console.error('Error deleting tag:', error);
            }
          };

          const handleDeleteQuestion = async (questionId) => {
            try {
      
              await axios.delete(`http://localhost:8000/deletequestion/${questionId}`);
              console.log('Question deleted successfully');
            } catch (error) {
              console.error('Error deleting tag:', error);
            }
          };

          const handleDeleteUser = async (userId) => {
            try {
      
              await axios.delete(`http://localhost:8000/deleteuser/${userId}`);
              console.log('Question deleted successfully');
            } catch (error) {
              console.error('Error deleting tag:', error);
            }
          };

          for(var x = 0; x<comments.length; x++)
          {
                console.log("COMMENTS "+comments[x].email)
                console.log("LOGGED IN EMAIL TO COMMENTS "+localStorage.getItem("loggedInEmail"))
                if(comments[x].email===user.email)
                {
                    console.log("IM IN THE COMMENTS IF")
                    await handleDeleteComments(comments[x]._id)
                }
          }

          for(var x = 0; x<answers.length; x++)
          {
                console.log("ANSWERS "+answers[x].email)
                console.log("LOGGED IN EMAIL TO ANSWERS "+localStorage.getItem("loggedInEmail"))
                if(answers[x].email===user.email)
                {
                    console.log("IM IN THE ANSWERS IF")
                    await handleDeleteAnswer(answers[x]._id)
                }
          }

          for(var x = 0; x<tags.length; x++)
          {
                console.log("TAGS "+tags[x].email)
                console.log("LOGGED IN EMAIL TO TAGS "+localStorage.getItem("loggedInEmail"))
                if(tags[x].email===user.email)
                {
                    console.log("IM IN THE TAGS IF")
                    await handleDeleteTag(tags[x]._id)
                }
          }

          for(var x = 0; x<questions.length; x++)
          {
                console.log("QUESTIONS "+questions[x].email)
                console.log("LOGGED IN EMAIL TO QUESTIONS "+localStorage.getItem("loggedInEmail"))
                if(questions[x].email===user.email)
                {
                    console.log("IM IN THE QUESTIONS IF")
                    await handleDeleteQuestion(questions[x]._id)
                }
          }

          await handleDeleteUser(uid)
          props.usersCall()
          // props.usersCall()
          // props.usersCall()
          props.openUserPageFunc()
          
        
    }
    const showDeleteConfirmation = (user) => {
      const confirmDelete = window.confirm(`Are you sure you want to delete ${user.username}? This action is irreversible!`);
    
      if (confirmDelete) {
        deleteUser(user, user._id, props.questions, props.answers, props.tags, props.comments);
      }
    };
   // onClick={() => deleteUser(user, user._id,props.questions,props.answers,props.tags,props.comments)}
  return (
    <>
      {props.users.map((user) => (
        <div key={user._id} id="userDiv">
          <div id="userTitleDiv" onClick={() => props.openAdminUserPageFunc(user.email)}>{user.username}</div>
          <div id="deleteUserButtonDiv"><button id="deleteUser" onClick={() => showDeleteConfirmation(user)}>Delete</button></div>
        </div>
      ))}
    </>
  );
}