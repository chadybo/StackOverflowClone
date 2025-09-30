import React from "react";
import { useState, useEffect } from "react";
import { getDateFormat } from "./dateFormatting";
import DisplayAnswerComments from "./displayAnswerComments";
import axios from "axios";

export default function DisplayAnswersQuestion(props){
   
    // console.log("YO IM IN DISPLAY ANSWERS")
    // console.log(props.answers)
    // console.log(props.answers[0]._id)
    // console.log(props.question.answers[0])
    //  console.log(props.question)
    //  console.log(props.answers.length)
    //  console.log(props.question.answers.length)
    var answersArr = [];

    for (var i = 0; i < props.question.answers.length; i++){
        for(var j = 0; j < props.answers.length; j++){
            if(props.question.answers[i]._id === props.answers[j]._id){

                // console.log("I AM IN THE IF STATEMENT")
                if(props.answers[j].email === localStorage.getItem("loggedInEmail"))
                {
                  answersArr.push(props.answers[j]);
                }
            }
        }
    }

    for (var i = 0; i < props.question.answers.length; i++){
      for(var j = 0; j < props.answers.length; j++){
          if(props.question.answers[i]._id === props.answers[j]._id){

              // console.log("I AM IN THE IF STATEMENT")
              if(props.answers[j].email !== localStorage.getItem("loggedInEmail"))
              {
                answersArr.push(props.answers[j]);
              }
          }
      }
  }

    // console.log(answersArr)

    function showHTMLInText(stringWithHtml) {
        return { __html: stringWithHtml };
    }

    var pageNumber = props.answersPagePageNumber;
    var startingIndex = (pageNumber*5) - 5
    var endingIndex = (pageNumber*5)

    //////////////////////////////////////////////////////////////////////////////////////////
    // const [commentText,setCommentText] = useState(null);
    // function getCommentText(val){
    //     setCommentText(val.target.value)
    // }

    // const clearTextBoxAndPostComment = (commentText, question, answer) => {
    //   console.log("Comment text before posting:", commentText);
    //   props.createAndAddCommentAnswerFunc(commentText, props.question, answer);
    //   setCommentText('');
    //   console.log("Comment text after posting:", commentText);
    // };
////////////////////////////////////////////////////////////////////////////////////////////
    const [commentTexts, setCommentTexts] = useState({});

    const getCommentText = (answerId, val) => {
        setCommentTexts((prevCommentTexts) => ({
        ...prevCommentTexts,
        [answerId]: val.target.value,
        }));
    };

    const clearTextBoxAndPostComment = (answer) => {
        const commentText = commentTexts[answer._id] || "";
        console.log("Comment text before posting:", commentText);
        props.createAndAddCommentAnswerFunc(
        commentText,
        props.question,
        answer
        );
        setCommentTexts((prevCommentTexts) => ({
        ...prevCommentTexts,
        [answer._id]: "",
        }));
        console.log("Comment text after posting:", commentText);
    };

    //////////////////////////////////////////////////////////////////////////ANSWER INDIVIDUAL PAGE NUMBERS
    const [answerCommentsPageNumbers, setAnswerCommentsPageNumbers] = useState({});

    useEffect(() => {
    if (Object.keys(answerCommentsPageNumbers).length === 0) {
        const initialPageNumbers = {};
        answersArr.forEach((answer) => {
        initialPageNumbers[answer._id] = 1;
        });
        setAnswerCommentsPageNumbers(initialPageNumbers);
    }
    }, [answersArr, answerCommentsPageNumbers]);


    const newIncrementCommentsPageFunc = (answerId, arrLength) => {
        setAnswerCommentsPageNumbers((prevPageNumbers) => {
          const currentNumber = prevPageNumbers[answerId] || 1;
          const newNumber = currentNumber + 1;
    
          if ((newNumber - 1) * 3 >= arrLength) {
            return { ...prevPageNumbers, [answerId]: 1 };
          }
    
          return { ...prevPageNumbers, [answerId]: newNumber };
        });
      };
    
      const newDecrementCommentsPageFunc = (answerId) => {
        setAnswerCommentsPageNumbers((prevPageNumbers) => {
          const currentNumber = prevPageNumbers[answerId] || 1;
          const newNumber = Math.max(currentNumber - 1, 1);
    
          return { ...prevPageNumbers, [answerId]: newNumber };
        });
      };
    
      function answerDelete(answerId,answer)
      {
      const handleDeleteAnswer= async (answerId) => {
        try {
  
          await axios.delete(`http://localhost:8000/deleteanswer/${answerId}`);
          console.log('Answer deleted successfully');
        } catch (error) {
          console.error('Error deleting tag:', error);
        }
      };

      const handleDeleteAnswerComments= async (commentsId) => {
        try {
  
          await axios.delete(`http://localhost:8000/deletequestioncomments/${commentsId}`);
          console.log('Comments deleted successfully');
        } catch (error) {
          console.error('Error deleting comments:', error);
        }
      };

      for(var x = 0; x<answer.comments.length; x++)
      {
            handleDeleteAnswerComments(answer.comments[x]._id)
      }
      handleDeleteAnswer(answerId)
      props.answersCall()
      props.answersCall()
      props.openUserQuestionAnswerPageFunc();

    }

    ///////////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            {answersArr.slice(startingIndex, endingIndex).map((answer) => (
                <div key = {answer._id} className = "answer">
                    
                        <div id= "answerVotingBox">
                        {props.isGuest == false && (
                        <button id= "upvote" onClick={() => props.upvoteAnswerFunc(answer, props.question)}>Upvote <br></br>{answer.upvotes.length}</button>
                        )}
                        <div id= "totalVotesDiv">{answer.upvotes.length - answer.downvotes.length} votes</div>
                        {props.isGuest == false && (
                        <button id= "downvote" onClick={() => props.downvoteAnswerFunc(answer, props.question)}>Downvote {answer.downvotes.length}</button>
                        )}
                        </div>

                    <div id="answerTextDiv" dangerouslySetInnerHTML = {showHTMLInText(answer.text)}>
                    </div>
                    <div id= "answerAuthorAndDateDiv">
                        <div id="answerAuthorDiv">
                        <span className="greenText">{answer.ans_by}</span>
                        </div>
                        <div id="answerDateDiv">
                            answered {getDateFormat(new Date(answer.ans_date_time))}
                        </div>
                    </div>
                    
                    <div id="questionCommentsBigDiv">
                    <DisplayAnswerComments
                        answer = {answer}
                        question = {props.question}
                        comments = {props.comments}
                        upvoteCommentFunc = {props.upvoteCommentFunc}
                        isGuest = {props.isGuest}
                        commentPagePageNumber = {answerCommentsPageNumbers[answer._id]}
                        incrementCommentsPageFunc = {props.incrementCommentsPageFunc}
                        decrementCommentsPageFunc = {props.decrementCommentsPageFunc}
                    />
                    </div>

                    {/* <div id="questionCommentPostForm">
                        <input type ="text"  value={commentTexts[answer._id] || ""} placeholder="Add comment here (140 chars. max). . ." id={`commentTextBox_${answer._id}`} class="commentTextBoxAnswers" onChange={(val) => getCommentText(answer._id, val)}></input>
                        {props.commentTooLongError && (
                        <div id="commentTooLongErrorBox">Error: Comment text cannot exceed 140 characters</div>
                        )}
                        {props.commentEmptyError && (
                        <div id="commentEmptyErrorBox">Error: Comment text cannot be empty</div>
                        )}
                        <br></br>
                            <button id="postCommentButton" onClick={() => clearTextBoxAndPostComment(answer)}>Post Comment</button>
                    </div> */}
                    
                    <div id='pageButtonsComments'>
                        {answerCommentsPageNumbers[answer._id] != 1 && (
                        <button id="prevPageButtonComments" onClick={() => newDecrementCommentsPageFunc(answer._id)}>Prev</button>
                        )}
                        {answerCommentsPageNumbers[answer._id]}
                        {answer.comments.length > 3 && (
                        <button id="nextPageButtonComments" onClick={() => newIncrementCommentsPageFunc(answer._id, answer.comments.length)}>Next</button>
                        )}
                    </div>
                    {/* <div><button onClick={()=>answerDelete(answer._id,answer)}>Delete</button></div> */}
                    <div id="deleteButtonAnswerDiv">
                    {(localStorage.getItem("loggedInEmail") === answer.email || localStorage.getItem("isAdmin") === "true") && (
                      <button id="deleteButtonAnswer" onClick={()=>answerDelete(answer._id,answer)}>
                        Delete
                      </button>)}
                    </div>
                    {/* <div><button onClick={()=>props.openAnsweringPageNewFunc(answer)}>Edit</button></div> */}
                    <div id="editButtonAnswerDiv">
                    {(localStorage.getItem("loggedInEmail") === answer.email || localStorage.getItem("isAdmin") === "true") && (
                      <button id="editButtonAnswer" onClick={()=>props.openAnsweringPageNewFunc(answer)}>
                        Edit
                      </button>)}
                    </div>

                </div>
            ))}
        </>
    );
}