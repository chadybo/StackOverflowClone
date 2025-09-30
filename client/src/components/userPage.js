import React from "react";
import { getUserDateFormat } from "./userdateFormatting";
import DisplayUserQuestions from "./displayUserQuestions";
import DisplayUserAnswers from "./displayUserAnswers";
import DisplayUserTags from "./displayUserTags";
import DisplayUsers from "./DisplayUsers";

export function UserPage(props){
    console.log(props.questions)
    console.log(localStorage.getItem("loggedInUsername"))
    var questionstoDisplay = [];
    var answerstoDisplay = []
    var tagstoDisplay = [];
    var rep;

    for(var x=0; x<props.questions.length; x++)
    {
        if(props.questions[x].email === localStorage.getItem("loggedInEmail"))
        {
            questionstoDisplay.push(props.questions[x])
        }
    }

    for(var x = 0; x<props.answers.length; x++)
    {
        if(props.answers[x].email === localStorage.getItem("loggedInEmail"))
        {
            answerstoDisplay.push(props.answers[x])
        }
    }

    for(var x = 0; x<props.tags.length; x++)
    {
        if(props.tags[x].email === localStorage.getItem("loggedInEmail"))
        {
            tagstoDisplay.push(props.tags[x])
        }
    }  
    
    for(var x = 0; x<props.users.length; x++)
    {
        if(props.users[x].email === localStorage.getItem("loggedInEmail"))
        {
            rep = props.users[x].reputation
        }
    }


    console.log(answerstoDisplay)
    return(
        <h2>                                                           
        <table id= "mainContent">
          <tr>
            <td className="leftSideBar">
            </td>
            <td rowSpan="2" id="allQuestionsCell">
                {localStorage.getItem("isAdmin") === "false" && (
                  <>User Profile</>
                )}
                {localStorage.getItem("isAdmin") === "true" && (
                  <>Admin Profile</>
                )}
            </td>   
            <td rowSpan="2" id="askQuestionButtonCell" className="hideWhenAskingButtons">
            </td>
          </tr>
          <tr>
            <td id= "questionsLinkCell" className="leftSideBar">
              <a href="#" id="questionsLink" style={{backgroundColor: "white"}} onClick={props.openMainPageFunc}>Questions</a>
            </td>
          </tr>
          <tr>
            <td className="leftSideBar">
            </td>
            <td id="sortingButtonsCell" className="hideWhenAskingButtons">
              {localStorage.getItem("setError") === null && (
                  <>
                    <div id="userPageHeader">
                      <div id="userPagePic">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                          width="10%"
                          height="10%"
                          id="imgAdjust"
                          alt="Profile Picture"
                        />
                      </div>
                      <div id="usernameDivUserPage">
                        {localStorage.getItem("loggedInUsername")}
                      </div>
                      <div id ="repAndDateDiv">
                        {"Reputation: "}{rep}
                        <br></br>
                        {"Member "+getUserDateFormat(new Date(localStorage.getItem("registeredDate")))}
                      </div>
                    </div>
                  </>
                )}
            </td>
          </tr>
          <tr>
            <td id= "tagsCell" className="leftSideBar">
              <a href="#" id="tagsLink" style={{backgroundColor: "white"}} onClick={props.openTagsPageFunc}>Tags</a>
            </td>
          </tr>
          <tr>
          <td className= "leftSideBarLastCell">
                <div id="userProfileLinkDiv">
                  {localStorage.getItem("isGuest") === "false" && (
                  <a href="#" id="userProfileLink" style={{backgroundColor: "lightgray"}}  onClick={props.openUserPageFunc} >User</a>
                  )}
                </div>
              </td>
            <td id="mainBody" colSpan="2">

            {localStorage.getItem("isAdmin") == "false" && (
              <> 
                {localStorage.getItem("setError") === null && (
                <div id="postsTitleDiv">Posts</div>
                )}
    
                {localStorage.getItem("setError") === null && (
                <DisplayUserQuestions
                  openQuestionEditPageFunc ={props.openQuestionEditPageFunc}
                  questionstoDisplay = {questionstoDisplay}
                 />
                 )}
                 {localStorage.getItem("setError") === "true" && (
                      <>
                      <div id="dbDown">{props.error}. Please restart.</div>
                      <div><button class="backButton" onClick={() => { 
                      props.openWelcomePageFunc()
                      }}>Restart</button></div>
                    </>
                    )}
               
                </>
                )}
                {localStorage.getItem("isAdmin") == "true" && (
                  <>
                  <div id="usersLinkAdmin">Users (click to visit profile):</div>
                  
                  {localStorage.getItem("setError") === null && (
                  <DisplayUsers
                  openQuestionEditPageFunc ={props.openQuestionEditPageFunc}
                  questionstoDisplay = {questionstoDisplay}
                  users = {props.users}
                  questions = {props.questions}
                  answers = {props.answers}
                  tags = {props.tags}
                  comments = {props.comments}
                  openUserPageFunc = {props.openUserPageFunc}
                  openAdminUserPageFunc = {props.openAdminUserPageFunc}
                  usersCall = {props.usersCall}

                 />
                 )}
                 {localStorage.getItem("setError") === "true" && (
                      <>
                      <div id="dbDown">{props.error}. Please restart.</div>
                      <div><button class="backButton" onClick={() => { 
                      props.openWelcomePageFunc()
                      }}>Restart</button></div>
                    </>
                    )}
              
                  </>
                )}
                
                {localStorage.getItem("isAdmin") == "false" && (
                  <>
                  {localStorage.getItem("setError") === null && (
                 <div id="answersTitleDiv"><button id="allAnswersButton" onClick={props.openUserAnswersPageFunc}>All Questions Answered</button></div>
                 )}
                 </>
                 )}
                
                {localStorage.getItem("isAdmin") == "false" && (
                   <>
                   {localStorage.getItem("setError") === null && (
                 <div id="tagsTitleDiv"><button id="allTagsButton" onClick={props.opendisplayUserTagsFunc}>All Tags</button></div>
                 )}
                 </>
                 )}
                 
            </td>
          </tr>
        </table>
      </h2>
      );
}