import React from "react";
import { useState } from "react";

// export function Answer (text, ansBy){
//     this.aid = "";
//     this.text = text;
//     this.ansBy = ansBy;
//     this.ansDate = new Date();
//   };

  export var ansTextVar,ansByVar;

  export function AnsweringQuestionPage(props) {

    const [ansText,setAnsText] = useState(null);
    function getAnsText(val){
        setAnsText(val.target.value)
    }
    ansTextVar = ansText
    
    const [ansBy,setAnsBy] = useState(null);
    function getAnsBy(val){
        setAnsBy(val.target.value)
    }
    ansByVar = ansBy

          return (
            <>
            <h2>                                                           
              <table id= "mainContent">
                <tr>
                  <td className="leftSideBar">
                  </td>
                  <td rowSpan="2" id="allQuestionsCell">
                    {/* <div id="userNameDivAnwser">Username*</div> */}
                  </td>
                  <td rowSpan="2" id="askQuestionButtonCell" className="hideWhenAskingButtons">
                  </td>
                </tr>
                <tr>
                  <td id= "questionsLinkCell" className="leftSideBar">
                    <a href="#" id="questionsLink" onClick={props.openMainPageFunc}>Questions</a>
                  </td>
                </tr>
                <tr>
                  <td className="leftSideBar">
                  </td>
                  <td  id= "numOfQuestionsCellAnswerPage">
                    <div id="answerTextDivAnswer">Answer Text*</div>
                    {/* <div><input type ="text" placeholder="Enter username here . . ." id="userNameBarAnswer" onChange={getAnsBy}></input></div>
                    {props.answerUsernameError && (
                    <div id="answerUsernameErrorBox">Error: Username cannot be empty</div>
                    )} */}
                  </td>
                  <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                  </td>
                </tr>
                <tr>
                  <td id= "tagsCell" className="leftSideBar">
                    <a href="#" id="tagsLink" onClick={props.openTagsPageFunc}>Tags</a>
                  </td>
                  <td className="hideWhenAskingLine" id="addAnswerDetail">
                    <i>Add answer details here</i>
                  </td>
                  <td className="hideWhenAskingLine">
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
                    {/* <div id="answerTextDivAnswer">Answer Text*</div> */}
                    <textarea name="message" rows="10" cols="49" id="answerBarDivAnswer" placeholder="Enter text here . . ." onChange={getAnsText}></textarea>
                    {props.answerTextError && (
                    <div id="answerTextErrorBox">Error: Answer text cannot be empty</div>
                    )}
                    {props.answerHyperlinkFormatError && (
                    <div id="answerHyperlinkFormatErrorBox">Error: Hyperlink formatting error. Please enter [text](link)</div>
                    )}
                    <div id="postAnswerButtonDiv">
                    {localStorage.getItem("isGuest") == "false" && (<button id="postAnswerButton" onClick={() => props.createAndAddAnswerFunc(ansText, ansBy, props.question)}>
                        Post Answer
                        </button>)}
                    </div>
                    <div id="starWarningAnswer">*indicates mandatory fields</div>
                  </td>
                </tr>
              </table>
            </h2>
            </>
          );
  }