import React from "react";
import { getUserDateFormat } from "./userdateFormatting";
import DisplayUserQuestions from "./displayUserQuestions";
import DisplayUserAnswers from "./displayUserAnswers";
import DisplayUserTags from "./displayUserTags";
import DisplayUsers from "./DisplayUsers";

export function DiplayAdminUserPage(props){
    console.log(props.questions)
    console.log(localStorage.getItem("loggedInUsername"))
    var questionstoDisplay = [];
    var answerstoDisplay = []
    var tagstoDisplay = [];
    var rep,name,date;

    for(var x=0; x<props.questions.length; x++)
    {
        if(props.questions[x].email === props.userRef)
        {
            questionstoDisplay.push(props.questions[x])
        }
    }

    for(var x = 0; x<props.answers.length; x++)
    {
        if(props.answers[x].email === props.userRef)
        {
            answerstoDisplay.push(props.answers[x])
        }
    }

    for(var x = 0; x<props.tags.length; x++)
    {
        if(props.tags[x].email === props.userRef)
        {
            tagstoDisplay.push(props.tags[x])
        }
    }  
    
    for(var x = 0; x<props.users.length; x++)
    {
        if(props.users[x].email === props.userRef)
        {
            rep = props.users[x].reputation
            name = props.users[x].username
            date = props.users[x].registeredDate
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
              User Profile
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
                        {name}
                      </div>
                      <div id ="repAndDateDiv">
                        {"Reputation: "}{rep}
                        <br></br>
                        {"Member "+getUserDateFormat(new Date(date))}
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
                  <a href="#" id="userProfileLink" style={{backgroundColor: "white"}}  onClick={props.openUserPageFunc} >User</a>
                  )}
                </div>
            </td>
            <td id="mainBody" colSpan="2">

                <div id="postsTitleDiv">
                  Posts (click to edit or delete):
                </div>

                <DisplayUserQuestions
                  openQuestionEditPageFunc ={props.openQuestionEditPageFunc}
                  questionstoDisplay = {questionstoDisplay}
                 />
                 {questionstoDisplay.length === 0 && (
                    <div id="noPosts">No Posts Available</div>
                 )}
             
                <div id="answersTitleDiv">
                  <button id="allAnswersButton" onClick={props.openUserAnswersPageFunc}>
                      All Questions Answered
                  </button>
                </div>
        
                <div id="tagsTitleDiv">
                  <button id="allTagsButton" onClick={props.opendisplayUserTagsFunc}>
                    All Tags
                  </button>
                </div>

            </td>
          </tr>
        </table>
      </h2>
      );
}