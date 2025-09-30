
import DisplayQuestions from "./displayQuestions";
export function MainBody(props){
    console.log("THIS IS THE CURRENT PAGE NUMBER IN MAINBODY: " + props.mainPagePageNumber)
    var numOfQuestions = props.questions.length
    console.log("This is is guest:" + localStorage.getItem("isGuest"))
    
    //console.log("THIS IS ERROR"+props.error)
    console.log("THIS IS ERROR TEST"+localStorage.getItem("setError"))
    if(!props.showActive)
    {
      props.questions.sort((a,b) => new Date(b.ask_date_time) - new Date(a.ask_date_time))
    }
      
    // console.log(props.showActive)
    
        return(
          <h2>                                                           
          <table id= "mainContent">
            <tr>
              <td className="leftSideBar">
              </td>
              <td rowSpan="2" id="allQuestionsCell">
                All Questions
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
              <a href="#" id="questionsLink" style={{backgroundColor: "lightgrey"}} onClick={props.openMainPageFunc}>Questions</a>
              </td>
            </tr>
            <tr>
              <td className="leftSideBar">
              </td>
              <td  id= "numOfQuestionsCell">
               {numOfQuestions} Questions
              </td>
              <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                <button id="newestButton" className="sortingButtons" onClick={props.newestFunc}>
                  Newest
                </button>
                <button id="activeButton" className="sortingButtons" onClick={props.activeFunc}>
                  Active
                </button>
                <button id="unansweredButton" className="sortingButtons" onClick={props.unansweredFunc}>
                  Unanswered
                </button>
              </td>
            </tr>
            <tr>
              <td id= "tagsCell" className="leftSideBar">
                <a href="#" id="tagsLink" style={{backgroundColor: "white"}}  onClick={props.openTagsPageFunc} >Tags</a>
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
              {localStorage.getItem("setError") === null && (
                <>
                <DisplayQuestions 
                newestFunc = {props.newestFunc} 
                openAnswersPageFunc = {props.openAnswersPageFunc} 
                questions = {props.questions} 
                tags = {props.tags} 
                question = {props.question} 
                mainPagePageNumber = {props.mainPagePageNumber} 
                tagsCallFunc = {props.tagsCall}
                />
                <div id="pageButtonsMain">
                {props.mainPagePageNumber != 1 && (
                <button id="prevPageButton" onClick={props.decrementMainPageFunc}>Prev</button>
                )}
                {props.mainPagePageNumber}
                {props.questions.length > 5 && (
                <button id="nextPageButton" onClick={() => props.incrementMainPageFunc(numOfQuestions)}>Next</button>
                )}
                </div>
                </>
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
        );
}