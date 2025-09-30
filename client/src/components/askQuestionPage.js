import React, {useState} from 'react'

export function Question(title,text,tagIds,askedBy){
    this.title = title;
    this.text = text;
    this.tagIds = tagIds;
    this.asked_by = askedBy;
    this.askDate = new Date();
    this.answers = [];
    this.views = 0;
  };

export var txt1,txt2,txt3,txt4;
export var propstore

export function AskQuestionPage(props) {
  const [questionTitle,setQuestionTitle] = useState(null);
    
    function getQuestionTitle(val){
      setQuestionTitle(val.target.value)
    }
    txt1 = questionTitle
  
    const [questionText,setQuestionText] = useState(null);
  
    function getQuestionText(val){
      setQuestionText(val.target.value)
    }
    txt2 = questionText
  
    const [tags,setTags] = useState(null);
  
    function getTags(val){
      setTags(val.target.value)
    }
    txt3 = tags
  
    // const [username,setUsername] = useState(null);
  
    // function getUsername(val){
    //   setUsername(val.target.value)
    // }
    // txt4 = username

    const [questionSummary,setQuestionSummary] = useState(null);
  
    function getQuestionSummary(val){
      setQuestionSummary(val.target.value)
    }
    txt4 = questionSummary
    
  /*console.log(newModel.questions[0])*/

        return (
          <>
          <h2>                                                           
            <table id= "mainContent">
              <tr>
                <td className="leftSideBar">
                </td>
                <td rowSpan="2" id="allQuestionsCell" className="questionTitle">
                  Question Title*
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
                <td  id= "numOfQuestionsCellPostQ">
                  <i id="questionTitleSub">Limit title to 50 characters or less</i>
                </td>
                <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                </td>
              </tr>
              <tr>
                <td id= "tagsCell" className="leftSideBar">
                  <a href="#" id="tagsLink" onClick={props.openTagsPageFunc}>Tags</a>
                </td>
                <td className="hideWhenAskingLine">
                <input type ="text" placeholder="Enter title here . . ." id="titleBar" onChange={getQuestionTitle}></input>
                {props.questionTitleError && (
                  <div id="questionTitleErrorBox">Error: Question title cannot be empty</div>
                )}
                {props.questionTitleTooLongError && (
                  <div id="questionTitleTooLongErrorBox">Error: Question title cannot be over 50 characters</div>
                )}
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

                  <div id="questionSummary">Question Summary*</div> 
                  <i id="questionSummarySubText">Limited to 140 characters or less</i>
                  <input type ="text" placeholder="Enter question summary here . . ." id="questionSummaryBar" onChange={getQuestionSummary}></input> 
                  {props.questionEmptySummaryError && (
                  <div id="questionEmptySummaryErrorBox">Error: Question summary cannot be empty</div>
                  )}
                  {props.questionSummaryTooLongError && (
                  <div id="questionSummaryTooLongErrorBox">Error: Question summary cannot be over 140 characters</div>
                  )}
                  
                  <div id="questionTextNew">Question Text*</div>
                  <i id="addDetailsNew">Add Details</i>
                  <textarea name="message" rows="10" cols="49" id="questionTextBar" placeholder="Enter text here . . ." onChange={getQuestionText}></textarea>
                  {props.questionTextError && (
                  <div id="questionTextErrorBox">Error: Question text cannot be empty</div>
                  )}
                  {props.questionHyperlinkFormatError && (
                  <div id="questionHyperlinkFormatErrorBox">Error: Hyperlink formatting error. Please enter [text](link)</div>
                  )}
                  <div id="tagsText">Tags*</div>
                  <i id="tagsItalics">Add keywords separated by whitespace</i>
                  <input type ="text" placeholder="Enter tags here . . ." id="tagBar" onChange={getTags}></input>
                  {props.questionTagsError && (
                  <div id="questionTagsErrorBox">Error: Question tags cannot be empty</div>
                  )}
                  {props.questionTooManyTagsError && (
                  <div id="questionTooManyTagsErrorBox">Error: Question tags cannot exceed 5 tags</div>
                  )}
                  {props.questionTagTooLongError && (
                  <div id="questionTagTooLongErrorBox">Error: Question tag length cannot exceed 10 characters</div>
                  )}
                  {props.repTooLowNewTag && (
                  <div id="repTooLowNewTagErrorBox">Error: You need at least 50 reputation to create a new tag</div>
                  )}
                  {/* <div id="username">Username*</div> */}
                  {/* <input type ="text" placeholder="Enter username here . . ." id="userNameBar" onChange={getUsername}></input> */}
                  {/* {props.questionUsernameError && (
                  <div id="questionUsernameErrorBox">Error: Username cannot be empty</div>
                  )} */}
                  <div id="postQuestionButtonDiv">
                    <button id="postQuestionButton" onClick={() => props.addToQuestionsFunc(txt1,txt2,txt3,txt4)}>
                      Post Question
                    </button>
                  </div>
                  <div id="starWarning">*indicates mandatory fields</div>
                </td>
              </tr>
            </table>
          </h2>
          </>
        );
}