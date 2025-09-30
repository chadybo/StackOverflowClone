import React from "react";
import DisplayQuestions from "./displayQuestions";

export function SearchResultsPage(props) {
    var numOfQuestions = props.questions.length;
    // console.log("HELOOOOOOOOOO  " + numOfQuestions);
    console.log(props.noSearchResults)
        return(
          <h2>                                                           
          <table id= "mainContent">
            <tr>
              <td className="leftSideBar">
              </td>
              <td rowSpan="2" id="allQuestionsCell">
                Search Results
              </td>
              <td rowSpan="2" id="askQuestionButtonCell" className="hideWhenAskingButtons">
                  {localStorage.getItem("isGuest") === "false" && (
                  <button id="askQuestionsButton" onClick={props.openAskQuestionPageFunc}>
                  Ask Question
                  </button>
                  )}
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
              <td  id= "numOfQuestionsCell">
               {numOfQuestions} Questions
              </td>
              <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                <button id="newestButton" className="sortingButtons">
                  Newest
                </button>
                <button id="activeButton" className="sortingButtons">
                  Active
                </button>
                <button id="unansweredButton" className="sortingButtons">
                  Unanswered
                </button>
              </td>
            </tr>
            <tr>
              <td id= "tagsCell" className="leftSideBar">
                <a href="#" id="tagsLink" onClick={props.openTagsPageFunc}>Tags</a>
              </td>
              <td id="horLineHeaderPart1" className="hideWhenAskingLine">
              </td>
              <td id="horLineHeaderPart2" className="hideWhenAskingLine">
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
                <DisplayQuestions 
                    openAnswersPageFunc = {props.openAnswersPageFunc} 
                    questions = {props.questions} 
                    tags = {props.tags}
                    question = {props.question}
                    mainPagePageNumber = {props.mainPagePageNumber}
                    />
                
                <div id="pageButtonsMain">
                {props.noSearchResults && (
                    <div id="noSearchResultsBox">No search results</div>
                )}
                {props.mainPagePageNumber != 1 && (
                <button id="prevPageButton" onClick={props.decrementMainPageFunc}>Prev</button>
                )}
                {props.mainPagePageNumber}
                {props.questions.length > 5 && (
                <button id="nextPageButton" onClick={() => props.incrementMainPageFunc(numOfQuestions)}>Next</button>
                )}
                </div>

              </td>
            </tr>
          </table>
        </h2>
        );
}