import React, { useState, useEffect } from 'react';
import axios from 'axios';
export var txt1,txt2,txt3,txt4;
export var propstore

var bool = false;

function displayTags(question, tags){
    var result = [];
    for(var i = 0; i < question.tags.length; i++){
       for(var j = 0; j < tags.length; j++){
        var tid = tags[j]._id;
        if (question.tags[i]._id === tid){
          result.push(tags[j].name);
        }
       }
    }
    return result.join(' ');
}

// function questionPostDB(txt1,txt2,txt3,txt4,qID,props)
// {
//     const postQuestionToDB = async () => {
//         // console.log("THIS IS TXT3: " + txt3);
//         const questionData = {
//             title: txt1,
//             summary: txt4,
//             text: txt2,
//             tags: txt3,
//             questionID: qID
//         };

//         try {
//             await axios.post('http://localhost:8000/postquestionedit', questionData);
//             // console.log('Question created:', response.data);
//         } catch (error) {
//             console.error('Error posting question: ', error);
//         }
//     };

//     postQuestionToDB()
//     props.openUserPageFunc()

// }

var tagString;
console.log(tagString)

localStorage.setItem("titleError",false)
localStorage.setItem("titleError2",false)

localStorage.setItem("sumError",false)
localStorage.setItem("sumError2",false)

localStorage.setItem("textError",false)
localStorage.setItem("textError2",false)

localStorage.setItem("tagsError",false)
localStorage.setItem("tagsError2",false)
localStorage.setItem("tagsError3",false)

export async function QuestionPostDB(txt1, txt2, txt3, txt4, qID, props,store,result,question) {

  console.log("IM LOGGIN THE TAGS ARRAY INSIDE THE QUESTIONPOST DB FUNCTION")
  console.log(store)
  console.log("IM SHOWING YOU WHAT TAG ARR IS BOI")
  console.log(result.tagarr)
  console.log("IM SHOWING YOU WHAT TAG IDS BE LIKE")
  console.log(result.tagid)

  const containsHyperLink = /\[[^\]]*\]\s*\([^)]*\)/  
  //                        /\[[^\]]+\]\s*\([^)]+\)/;
  const correctHyperLinkFormat = /\[([^[\]]*[a-zA-Z]+[^[\]]*)\]\s*\((https?:\/\/[^\s)]+)\)/g
  console.log(txt3)
  var testtxt3 = []
  if(txt3!==question.tags && txt3!=='' && txt3!==null)
  {
    console.log("IM GOIN IN WHERE I SHOULDNT BE")
   testtxt3 = txt3.split(" ")
  var count = 0;
  for(var x = 0; x<testtxt3.length; x++)
  {
      if(testtxt3[x].length>10)
      {
         count++;
      }
  }
}

  var tagIds = []
  console.log("IM LOGGING TEXT4 HERE")
  console.log(txt4)
  console.log("IM LOGGING QUESTION TITLE HERE")
  console.log(question.title)

  if((txt1 === ''))
  {
    console.log("IM INSIDE THE TITLE ERROR IF")
    localStorage.setItem("titleError",true);
    props.openQuestionEditPageFunc(question)
  }
  else if(txt1!==null && txt1.length>50)
  {
    console.log("HELLO IM IN THE SECOND txt1 statement")
      localStorage.setItem("titleError",false)
      localStorage.setItem("titleError2",true);
      props.openQuestionEditPageFunc(question)
  }
  if(txt1!== '')
  {
    localStorage.setItem("titleError",false);
    props.openQuestionEditPageFunc(question)
  }
  if(txt1!==null && txt1.length<50)
  {
    localStorage.setItem("titleError2",false);
    props.openQuestionEditPageFunc(question)
  }

  if((txt4 === ''))
  {
    console.log("IM INSIDE THE TITLE ERROR IF")
    localStorage.setItem("sumError",true);
    props.openQuestionEditPageFunc(question)
  }
  else if(txt4!==null && txt4.length>140)
  {

      localStorage.setItem("sumError",false);
      localStorage.setItem("sumError2",true);
      props.openQuestionEditPageFunc(question)
  }

  if(txt4!=='')
  {
    localStorage.setItem("sumError",false);
    props.openQuestionEditPageFunc(question)
  }
  if(txt4!==null && txt4.length<140)
  {
    localStorage.setItem("sumError2",false);
    props.openQuestionEditPageFunc(question)
  }

  if(txt2 === '')
  {
      localStorage.setItem("textError2",false)
      localStorage.setItem("textError",true);
      props.openQuestionEditPageFunc(question)
  }
  else if(containsHyperLink.test(txt2) === true)
  {
    if(correctHyperLinkFormat.test(txt2) === false)
    {

      localStorage.setItem("textError",false);
      localStorage.setItem("textError2",true)
      props.openQuestionEditPageFunc(question)
    }
    else
    {

      localStorage.setItem("textError",false);
      localStorage.setItem("textError2",false)
      props.openQuestionEditPageFunc(question)
      txt2 = txt2.replace(correctHyperLinkFormat, '<a href="$2" target="_blank">$1</a>');
    }
  }

  if(txt2!=='')
  {
    localStorage.setItem("textError",false);
    props.openQuestionEditPageFunc(question)
  }

 if(txt3 === '')
  {

    localStorage.setItem("tagsError",true)
    localStorage.setItem("tagsError2",false)
    localStorage.setItem("tagsError3",false)
    props.openQuestionEditPageFunc(question)
  }
  else if(testtxt3!==null && testtxt3.length > 5)
  {

    localStorage.setItem("tagsError",false)
    localStorage.setItem("tagsError2",true)
    props.openQuestionEditPageFunc(question)
  }
  else if(count > 0)
  {

    localStorage.setItem("tagsError",false)
    localStorage.setItem("tagsError2",false)
    localStorage.setItem("tagsError3",true)
    props.openQuestionEditPageFunc(question)
  }

  if(txt3!=='')
  {
    localStorage.setItem("tagsError",false)
    props.openQuestionEditPageFunc(question)
  }
  if(testtxt3!==null&&testtxt3.length<5)
  {
    localStorage.setItem("tagsError2",false)
    props.openQuestionEditPageFunc(question)
  }
  if(count===0)
  {
    localStorage.setItem("tagsError3",false)
    props.openQuestionEditPageFunc(question)
  }
  if(localStorage.getItem("titleError")==="false"&&localStorage.getItem("titleError2")==="false"&&
  localStorage.getItem("sumError")==="false"&&localStorage.getItem("sumError2")==="false"&&
  localStorage.getItem("textError")==="false"&&localStorage.getItem("textError2")==="false"&&
  localStorage.getItem("tagsError")==="false"&&localStorage.getItem("tagsError2")==="false"&&
  localStorage.getItem("tagsError3")==="false")
  {
  localStorage.setItem("titleError",false)
  localStorage.setItem("titleError2",false);
  localStorage.setItem("sumError",false);
  localStorage.setItem("sumError2",false);
  localStorage.setItem("textError",false);
  localStorage.setItem("textError2",false)
  localStorage.setItem("tagsError",false)
  localStorage.setItem("tagsError2",false)
  localStorage.setItem("tagsError3",false)
  if(result.tagid===null)
  {
        for(var x = 0; x < result.tagarr.length; x++)
        {
          for (var z = 0; z < store.length; z++) {
            if (result.tagarr[x] === store[z].name) {
                tagIds.push(store[z]._id)
            }
          }
        }
  }
  else
  {
    tagIds.push(result.tagId)
  }

  console.log(props.question)

  if(txt1===null)
  {
    console.log("IM SETTING TITLE TO DEFAULT")
    txt1 = props.question.title
  }
  if(txt2===null)
  {
    console.log("IM SETTING TEXT TO DEFAULT")
    txt2 = props.question.text
  }
  if(txt3===null)
  {
    console.log("IM SETTING TEXT TO DEFAULT")
    txt3 = props.question.tags
  }
  if(txt4 === null)
  {
    console.log("IM SETTING SUMMARY TO DEFAULT")
    txt4 = props.question.summary
  }
    // console.log("LOOOOOOKE HERE FOR TAGS")
    // console.log(tags)
    // console.log("PROPS.TAGS JUST BEFORE SENDING HIM IN")
    // var qtitle, qsum, qtags,qtext;
    // console.log("QID HERE")
    // console.log(qID)
    // console.log("LOGGING LENGTH HERE")
    // console.log(props.question)

    // console.log("4 LOGS HERE")
    // console.log(qtitle)
    // console.log(qsum)
    // console.log(qtags)
    // console.log(qtext)

    // if(txt1===null)
    //   {
    //     txt1 = qtitle
    //   }
    //   if(txt2===null)
    //   {
    //     txt2 = qtext
    //   }
    //   if(txt3===null)
    //   {
    //     txt3 = qtags
    //   }
    //   if(txt4===null)
    //   {
    //     txt4 = qsum
    //   }


    // console.log("THIS IS THE UPDATEPROPSTIME OUTSIDE: "+updatePropstime.length)

    console.log("IM LOGGING THE TITLE")
    console.log(txt1)
    console.log("IM LOGGING THE TEXT")
    console.log(txt2)
    console.log("IM LOGGING THE SUMMARY")
    console.log(txt4)
    if(txt3!==props.question.tags)
    {
      txt3 = tagIds;
    }
    console.log("TXT3 HERE")
    console.log(txt3)
    const postQuestionToDB = async () => {
      const questionData = {
        title: txt1,
        summary: txt4,
        text: txt2,
        tags: txt3,
        questionID: qID
      };
  
      try {
        await axios.post('http://localhost:8000/postquestionedit', questionData);
        console.log('Question edited successfully');
      } catch (error) {
        console.error('Error editing question: ', error);
      }
    };
    
    await postQuestionToDB(); 
    await props.questionCallFunc()
    console.log("FIND THE QUESTION HERE BRO")
    console.log(props.question)
    props.openUserPageFunc();
  }
  }
  
export function QuestionEditPage(props){

  // localStorage.setItem("titleError",false)
  // localStorage.setItem("titleError2",false)

  // localStorage.setItem("sumError",false)
  // localStorage.setItem("sumError2",false)

  // localStorage.setItem("textError",false)
  // localStorage.setItem("textError2",false)

  // localStorage.setItem("tagsError",false)
  // localStorage.setItem("tagsError2",false)
  // localStorage.setItem("tagsError3",false)

    console.log("QUESTIONS")
    console.log(props.question)
    console.log("ANSWERS")
    console.log(props.question.answers)
    console.log("COMMENTS")
    console.log(props.question.answers.comments)
    async function tagsPost(props)
    {
      const result = {
        tagarr: null, 
        tagid: null, 
      };

      var tagIds = []

    //   console.log("TAGS DEFAULT PRINTING HERE")
    //   console.log(props.question.tags)

      
    //   var qtitle, qsum, qtags,qtext;

    // for(var x = 0; x<props.question.length; x++)
    // {
    //    if(qID === props.question[x]._id)
    //    {
    //         qtitle = props.question[x].title
    //         qsum = props.question[x].summary
    //         qtags = props.question[x].tags
    //         qtext = props.question[x].text
    //    }
    // }
    // if(txt1===null)
    //   {
    //     txt1 = qtitle
    //   }
    //   if(txt2===null)
    //   {
    //     txt2 = qtext
    //   }
    //   if(txt3===null)
    //   {
    //     txt3 = qtags
    //   }
    //   if(txt4===null)
    //   {
    //     txt4 = qsum
    //   }
      

  if(txt3 === null)
  {
    console.log("IVE SET YOU DEFAULT")
    txt3 = props.question.tags
  }

  
      if(txt3!==props.question.tags)
      {
      console.log(txt3)
      var tagArr = []
      tagArr = txt3.split(" ")
      console.log(tagArr)
      for(var x = 0; x<tagArr.length; x++){
        for(var y = 0; y<props.tags.length; y++)
        {
           if(tagArr[x] === props.tags[y].name)
           {
              console.log("I WENT INTO THIS FIRST IF STATEMENT")
              console.log("I AM PRINTING THE tagArr VALUE FOR YOUR CONVIENIENCE")
              console.log(tagArr[x])
              console.log("I AM PRINTING props.tags[y].name FOR YOUR CONVIENIENCE")
              console.log(props.tags[y]._id)
              tagIds.push(props.tags[y]._id)
              break;
           }
           else if((!(tagArr[x] === props.tags[y].name)) && (y === props.tags.length-1))
           {
            console.log("I WENT INTO THE ELSE IF STATEMENT")
            const postTagToDB = async () => {
              const tagData = {
                  name: tagArr[x],
                  email:localStorage.getItem("loggedInEmail")
              };
              try {
                  const response = await axios.post('http://localhost:8000/posttag', tagData);
                  console.log('Tag created:', response.data);
              } catch (error) {
                  console.error('Error posting tag: ', error);
              }
            };
  
            await postTagToDB()
            await props.tagsCallFunc()
            
            console.log("PLEASE WORK GREAT HEAVENS ABOVE I AM CURRENTLY LOSING IT")
            console.log(props.tags)
  
          }   
        }
      }
      }
      else
      {
        console.log(txt3)
        tagArr = txt3;
        console.log("Tag Arr inside the else statement ")
        console.log(tagArr)
        for(var x = 0; x<tagArr.length; x++)
        {
            for(var y = 0; y<props.tags.length; y++)
            {
              if(tagArr[x]._id===props.tags[y]._id)
              {
                tagIds.push(props.tags[y]._id)
              }
            }
        }
        console.log("TAG IDS ARRAY IN SIDE THE ELSE STATEMENT")
        console.log(tagIds)
        result.tagid = tagIds
      }
      result.tagarr = tagArr;
      console.log(result)
      return result;
    }
    var tagsnew
    console.log("YO THIS IS THE TAGS INSIDE THE MAIN FUNCTION")
    console.log(props.tags)

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
    var testArr = []
    function getTags(val){
      setTags(val.target.value)
    }
    


    txt3 = tags


    const [questionSummary,setQuestionSummary] = useState(null);
  
    function getQuestionSummary(val){
      setQuestionSummary(val.target.value)
    }
    txt4 = questionSummary
    
  /*console.log(newModel.questions[0])*/
    
  function questionDelete(qid, answers, comments, answercomments)
  {
    console.log("ANSWER COMMENTS HERE")
    console.log(answercomments)
    // console.log("THIS BE THE TID BABY")
    // console.log(tid)
    console.log("THIS IS THE QID MY MAN")
    console.log(qid)
    const handleDeleteQuestion = async (questionId) => {
      try {

        await axios.delete(`http://localhost:8000/deletequestion/${questionId}`);
        console.log('Question deleted successfully');
      } catch (error) {
        console.error('Error deleting tag:', error);
      }
    };

    const handleDeleteAnswer= async (answerId) => {
      try {

        await axios.delete(`http://localhost:8000/deleteanswer/${answerId}`);
        console.log('Answer deleted successfully');
      } catch (error) {
        console.error('Error deleting tag:', error);
      }
    };

    const handleDeleteQuestionComments= async (commentsId) => {
      try {

        await axios.delete(`http://localhost:8000/deletequestioncomments/${commentsId}`);
        console.log('Comments deleted successfully');
      } catch (error) {
        console.error('Error deleting comments:', error);
      }
    };

    console.log("ANSWERS HERE")
    console.log(answers)

    for(var x = 0; x< answers.length; x++)
    {
       for(var y = 0; y < answers[x].comments.length; y++)
       {
          console.log(answers[x].comments[y])
          handleDeleteQuestionComments(answers[x].comments[y])
       }
    }
    for(var x = 0; x<answers.length; x++)
    {
       handleDeleteAnswer(answers[x]._id)
    }
    for(var x=0; x<comments.length; x++)
    {
       handleDeleteQuestionComments(comments[x]._id)
    }
    handleDeleteQuestion(qid)
    // console.log("ANSWER COMMENTS HERE")
    // console.log(answercomments)
    props.questionCallFunc()
    props.questionCallFunc()
    props.openUserPageFunc()
    props.openUserPageFunc()
  }

  function tagsCall() {
    return axios.get('http://localhost:8000/tags')
      .then(response => {
        const tagsFromData = response.data;
        const updatedTags = tagsFromData
        return updatedTags;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  async function handleEditClick() {
    try {
       var result = await tagsPost(props);
      const store = await tagsCall(); // Wait for the tagsCall function to complete
      await QuestionPostDB(txt1, txt2, txt3, txt4, props.question._id, props, store,result,props.question);
    } catch (error) {
      console.error(error);
    }
  }
  

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
                  <i id="questionTitleSubedit">Edit the title (50 characters max)</i>
                </td>
                <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                </td>
              </tr>
              <tr>
                <td id= "tagsCell" className="leftSideBar">
                  <a href="#" id="tagsLink" onClick={props.openTagsPageFunc}>Tags</a>
                </td>
                <td className="hideWhenAskingLine">
                <input type ="text" placeholder="Enter edit title here . . ." id="titleBar" onChange={getQuestionTitle} defaultValue={props.question.title}></input>
                {localStorage.getItem("titleError") === "true" && (
                  <div id="questionTitleErrorBox">Error: Question title cannot be empty</div>
                )}
                {localStorage.getItem("titleError2") === "true" && (
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
                  <a href="#" id="userProfileLink" style={{backgroundColor: "lightgray"}}  onClick={props.openUserPageFunc} >User</a>
                  )}
                </div>
              </td>
                <td id="mainBody" colSpan="2">

                  <div id="questionSummary">Question Summary*</div> 
                  <i id="questionSummarySubTextedit">Edit the summary (140 characters max)</i>
                  <input type ="text" placeholder="Enter edit question summary here . . ." id="questionSummaryBar" onChange={getQuestionSummary} defaultValue={props.question.summary}></input> 
                  {localStorage.getItem("sumError") === "true" && (
                  <div id="questionEmptySummaryErrorBox">Error: Question summary cannot be empty</div>
                  )}
                  {localStorage.getItem("sumError2") === "true" && (
                  <div id="questionSummaryTooLongErrorBox">Error: Question summary cannot be over 140 characters</div>
                  )}
                  
                  <div id="questionTextNew">Question Text*</div>
                  <i id="currentTextdiv">Edit the text</i>
                  <textarea name="message" rows="10" cols="49" id="questionTextBar" placeholder="Enter edit text here . . ." onChange={getQuestionText} defaultValue={props.question.text}></textarea>
                  {localStorage.getItem("textError") === "true" && (
                  <div id="questionTextErrorBox">Error: Question text cannot be empty</div>
                  )}
                  {localStorage.getItem("textError2") === "true" && (
                  <div id="questionHyperlinkFormatErrorBox">Error: Hyperlink formatting error. Please enter [text](link)</div>
                  )}
                  <div id="tagsText">Tags*</div>
                  <i id="tagsItalics">
                            <div id="currentTagdiv">Edit the tags: </div>
                        </i>
                  <input type ="text" placeholder="Enter edit tags here . . ." id="tagBar" onChange={getTags} defaultValue={displayTags(props.question,props.tags)}></input>
                  {localStorage.getItem("tagsError") === "true" && (
                  <div id="questionTagsErrorBox">Error: Question tags cannot be empty</div>
                  )}
                  {localStorage.getItem("tagsError2") === "true" && (
                  <div id="questionTooManyTagsErrorBox">Error: Question tags cannot exceed 5 tags</div>
                  )}
                  {localStorage.getItem("tagsError3") === "true" && (
                  <div id="questionTagTooLongErrorBox">Error: Question tag length cannot exceed 10 characters</div>
                  )}
                  {/* <div id="username">Username*</div> */}
                  {/* <input type ="text" placeholder="Enter username here . . ." id="userNameBar" onChange={getUsername}></input> */}
                  {/* {props.questionUsernameError && (
                  <div id="questionUsernameErrorBox">Error: Username cannot be empty</div>
                  )} */}
                  <div id="postQuestionButtonDiv">
                  <button id="postQuestionButton" onClick={handleEditClick}>
                                Edit
                     </button>
                    <button id="deleteQuestionButton" onClick={() => questionDelete(props.question._id, props.question.answers,props.question.comments,props.question.answers.comments)}>Delete</button>
                  </div>
                  <div id="starWarning">*indicates mandatory fields</div>
                </td>
              </tr>
            </table>
          </h2>
          </>
        );
}