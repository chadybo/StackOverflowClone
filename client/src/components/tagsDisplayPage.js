import DisplayTags from "./DisplayTags";
export function TagsDisplayPage(props) {
    var numOfQuestions = props.questions.length;
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
                <button id="askQuestionsButton" onClick={props.openAskQuestionPageFunc}>
                  Ask Question
                </button>
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
                <DisplayTags
                    openSearchResultsPageFunc={props.openSearchResultsPageFunc}
                    openSearchResultsTagsPage={props.openSearchResultsTagsPage}
                    openAnswersPageFunc = {props.openAnswersPageFunc} 
                    questions = {props.questions} 
                    tags = {props.tags}
                    question = {props.question}
                    />
              </td>
            </tr>
          </table>
        </h2>
        );
}