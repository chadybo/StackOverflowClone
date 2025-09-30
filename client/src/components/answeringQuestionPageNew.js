import React from "react";
import { useState } from "react";
import axios from "axios";

// export function Answer (text, ansBy){
//     this.aid = "";
//     this.text = text;
//     this.ansBy = ansBy;
//     this.ansDate = new Date();
//   };

  export var ansTextVar,ansByVar;
  localStorage.setItem("textError",false)
  localStorage.setItem("textError2",false)
  export async function AnswerPostDB(txt2,answerid,answer,props) {

  if(txt2 === '')
  {
    localStorage.setItem("textError2",false)
    localStorage.setItem("textError",true)
    props.openAnsweringPageNewFunc(answer)
  }  
  if(txt2 !=='')
  {
    localStorage.setItem("textError2",false)
     localStorage.setItem("textError",false)
     props.openAnsweringPageNewFunc(answer)
  }

  const containsHyperLink = /\[[^\]]*\]\s*\([^)]*\)/  
  //                        /\[[^\]]+\]\s*\([^)]+\)/;
  const correctHyperLinkFormat = /\[([^[\]]*[a-zA-Z]+[^[\]]*)\]\s*\((https?:\/\/[^\s)]+)\)/g

  if(containsHyperLink.test(txt2) === true)
  {
    if(correctHyperLinkFormat.test(txt2) === false)
    {

      localStorage.setItem("textError",false);
      localStorage.setItem("textError2",true)
      props.openAnsweringPageNewFunc(answer)
    }
    else
    {

      localStorage.setItem("textError",false);
      localStorage.setItem("textError2",false)
      props.openAnsweringPageNewFunc(answer)
      txt2 = txt2.replace(correctHyperLinkFormat, '<a href="$2" target="_blank">$1</a>');
    }
  }

  if(txt2!=='')
  {
    localStorage.setItem("textError",false);
    props.openAnsweringPageNewFunc(answer)
  }

  if(localStorage.getItem("textError")==="false"&&localStorage.getItem("textError2")==="false")
  {
  const postAnswerToDB = async () => {
    const answerData = {
      text:txt2,
      aid:answerid
    };

    try {
      await axios.post('http://localhost:8000/postansweredit', answerData);
      console.log('Question edited successfully');
    } catch (error) {
      console.error('Error editing question: ', error);
    }
  };
  await postAnswerToDB()
  await props.answersCall()
  await props.answersCall()
  await props.answersCall()
  props.openUserQuestionAnswerPageFunc(props.question)
}
  // //  props.openUserAnswersPageFunc()
}

  export function AnsweringQuestionPageNew(props) {

    console.log("LOGGING PROPS ANSWER HERE")
    console.log(props.answer.text)
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
                    <div id="answerTextDivAnswer">Answer Text Edit*</div>
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
                    <i>Add answer text edit here</i>
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
                    <textarea name="message" rows="10" cols="49" id="answerBarDivAnswer" placeholder="Enter text here . . ." onChange={getAnsText} defaultValue={props.answer.text}></textarea>
                    {localStorage.getItem("textError") === "true" && (
                    <div id="answerTextErrorBox">Error: Answer text cannot be empty</div>
                    )}
                    {localStorage.getItem("textError2") === "true" && (
                    <div id="answerHyperlinkFormatErrorBox">Error: Hyperlink formatting error. Please enter [text](link)</div>
                    )}

                    <div id="postAnswerButtonDiv">
                    {(localStorage.getItem("isAdmin") === "true" || (localStorage.getItem("loggedInEmail") === props.answer.email)) && 

                    (<button id="postAnswerButton" onClick={() => AnswerPostDB(ansTextVar,props.answer._id,props.answer,props)}>
                        Edit
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