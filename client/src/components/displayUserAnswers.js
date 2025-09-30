import React from "react";
import DisplayAnswersnew from "./DisplayAnswersnew";
export default function DisplayUserAnswers(props) {
  

  var answersByUser = []
  if(localStorage.getItem("isAdmin")==="false")
  {
    for(var x = 0; x<props.answers.length; x++)
    {
        if(props.answers[x].email === localStorage.getItem("loggedInEmail"))
        {
           answersByUser.push(props.answers[x]._id)
        }
    }
  }
  else
  {
    for(var x = 0; x<props.answers.length; x++)
    {
        if(props.answers[x].email === props.userRef)
        {
           answersByUser.push(props.answers[x]._id)
        }
    }
  }
  console.log("THESE WERE THE ANSWERS BY THE USER")
  console.log(answersByUser)

  var questionsToDisplay = []
  for(var x = 0; x<answersByUser.length; x++)
  {
  for(var y = 0; y<props.questions.length; y++)
  {
     for(var z = 0; z < props.questions[y].answers.length; z++)
     {
        if(answersByUser[x] === props.questions[y].answers[z]._id)
        {
            console.log("IM IN THE BIG IF STATEMENT")
            for(var w = 0; w<=questionsToDisplay.length; w++)
            {
                if(questionsToDisplay.length===0)
                {
                  console.log("IM IN THE FIRST IF STATEMENT")
                  questionsToDisplay.push(props.questions[y])
                }
                else if((props.questions[y]!==questionsToDisplay[w])&& w === questionsToDisplay.length-1)
                {
                  console.log("IM IN THE SECOND IF STATEMENT")
                  questionsToDisplay.push(props.questions[y])
                }
            }
        }
     }
  }
}
console.log("QUESTIONS TO DISPLAY")
console.log(questionsToDisplay)
  return (
    <>
      <h2>                                                           
              <table id= "mainContent">
                <tr>
                  <td className="leftSideBar">
                  </td>
                  <td rowSpan="2" id="allQuestionsCell" className="questionTitle">
                    All Answered Questions
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
                  <td  id= "numOfQuestionsCellPostQ">
                  </td>
                  <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                  </td>
                </tr>
                <tr>
                  <td id= "tagsCell" className="leftSideBar">
                  <a href="#" id="tagsLink" style={{backgroundColor: "white"}} onClick={props.openTagsPageFunc}>Tags</a>
                  </td>
                  <td className="hideWhenAskingLine">
                  </td>
                  <td className="hideWhenAskingLine">
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
                    <div id="questionTitlesDiv">Question Titles (click to view):</div>
                    <DisplayAnswersnew
                      questions = {questionsToDisplay}
                      openUserQuestionAnswerPageFunc = {props.openUserQuestionAnswerPageFunc}
                      openAnswersPageFunc = {props.openAnswersPageFunc}
                    />
                    {questionsToDisplay.length === 0 && (
                    <div id="noPosts">No Posts Available</div>
                 )}
                  </td>
                </tr>
              </table>
            </h2>
    </>
  );
}