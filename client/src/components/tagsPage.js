import React from 'react';
import DisplayTags from "./DisplayTags";
export function TagsPage(props)
{
    var numberOfTags = props.tags.length
    console.log(numberOfTags)
    console.log(props.tags)
    console.log(props.questions)
    return(
            <>
            <h2>                                                           
              <table id= "mainContent">
                <tr>
                  <td className="leftSideBar">
                  </td>
                  <td rowSpan="2" id="allQuestionsCell" className="questionTitle">
                    <div id="tagNumber"> {numberOfTags} Tags</div>
                    <div id="tagTitle">All Tags</div>
                  </td>
                  <td rowSpan="2" id="askQuestionButtonCell" className="hideWhenAskingButtons">
                  {localStorage.getItem("isGuest") == "false" && (
                  <button id="askQuestionsButton" onClick={props.openAskQuestionPageFunc}>
                  Ask Question
                  </button>
                  )}
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
                  <a href="#" id="tagsLink" style={{backgroundColor: "lightgrey"}} onClick={props.openTagsPageFunc}>Tags</a>
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
                  <a href="#" id="userProfileLink" style={{backgroundColor: "white"}}  onClick={props.openUserPageFunc} >User</a>
                  )}
                </div>
              </td>
                  <td id="mainBody" colSpan="2">
                  {localStorage.getItem("setError") === null && (
                    <DisplayTags
                    openSearchResultsTagsPageFunc ={props.openSearchResultsTagsPageFunc}
                    tags={props.tags}
                    questions={props.questions}/>
                    )}
                    {localStorage.getItem("setError") === "true" && (
                      <>
                      <div id="dbDown">{props.error}. Please restart.</div>
                      <div><button class="backButton" onClick={() => { 
                      props.openWelcomePageFunc()
                      }}>Restart</button></div>
                    </>
                    )}
                  </td>
                </tr>
              </table>
            </h2>
            </> 
    );
}