import React from "react";
import { useState, useEffect } from "react";
import { getDateFormat } from "./dateFormatting";
import DisplayAnswerComments from "./displayAnswerComments";

export default function DisplayAnswers(props){
   
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

                answersArr.push(props.answers[j]);
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

////////////////////////////////////////////////////////////////////////////////////////////
    const [commentTexts, setCommentTexts] = useState({})

    ////////////////////////////////////////////////////////////ONLY WORKS WHEN ALTERNATE
    useEffect(() => {
        if (props.repTooLowComment) {
          alert('You must have at least 50 reputation to comment');
        }
    }, [props.repTooLowComment]);
    
    useEffect(() => {                                            
        if (props.answerCommentEmptyError) {
          alert('Comment text cannot be empty');
        }
    }, [props.answerCommentEmptyError]);

    useEffect(() => {
        if (props.answerCommentTooLongError) {
          alert('Comment text cannot be more than 140 characters');
        }
    }, [props.answerCommentTooLongError]);

    const getCommentText = (answerId, val) => {
        setCommentTexts((prevCommentTexts) => ({
          ...prevCommentTexts,
          [answerId]: val.target.value,
        }));
    };

    const clearTextBoxAndPostComment = (answer) => {                /////////////////////////////2 CLICKS
        const commentText = commentTexts[answer._id] || ""

        console.log("Comment text before posting:", commentText)

            console.log("Comment text before posting:", commentText);
            props.createAndAddCommentAnswerFunc(commentText, props.question, answer);
      
            setCommentTexts((prevCommentTexts) => ({
              ...prevCommentTexts,
              [answer._id]: "",
            }));
            
            // if (props.repTooLowComment) {
            //     console.log("DAISY")
            //     alert('You must have atleast 50 reputation to comment');
            // }

            // if (props.answerCommentEmptyError) {
            //     alert('Comment text cannot be empty');
            // }
            
            // if (props.answerCommentTooLongError) {
            //     alert('Comment text cannot be more than 140 characters');
            // }
            
            console.log("Comment text after posting:", commentText);

    };

    //////////////////////////////////////////////////////////////////////////ANSWER INDIVIDUAL PAGE NUMBERS
    const [answerCommentsPageNumbers, setAnswerCommentsPageNumbers] = useState({});

    useEffect(() => {
        if (Object.keys(answerCommentsPageNumbers).length === 0 && answersArr.length > 0) {
            console.log("PEACHHHHHHHHHHHHHHHHHHHHHHHHC")
            const initialPageNumbers = {};
    
            answersArr.forEach((answer) => {
                initialPageNumbers[answer._id] = 1;
            });
    
            setAnswerCommentsPageNumbers(initialPageNumbers);
        }
    }, [answersArr, answerCommentsPageNumbers]);

    const newIncrementCommentsPageFunc = (answerId, arrLength) => {
        setAnswerCommentsPageNumbers((prevPageNumbers) => {
          console.log("LUGIGIIIIIIIIIIIIIIIIIIIIIII")
          const currentPageNumber = (prevPageNumbers[answerId] || 1)

          const newPageNumber = (currentPageNumber + 1)
    
          if ((newPageNumber - 1) * 3 >= arrLength) {
            return {...prevPageNumbers, [answerId]: 1}
          }
    
          return {...prevPageNumbers, [answerId]: newPageNumber}
        });
      };
    
      const newDecrementCommentsPageFunc = (answerId) => {
        setAnswerCommentsPageNumbers((prevPageNumbers) => {
          console.log("MARIOOOOOOOOOOOOOOOOOOOOO")
          const currentPageNumber = (prevPageNumbers[answerId] || 1)

          const newPageNumber = (currentPageNumber - 1)
    
          return {...prevPageNumbers, [answerId]: newPageNumber}
        });
      };
    
    ///////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (props.repTooLowAnswerUpvote) {
          alert('You must have at least 50 reputation to vote');
        }
      }, [props.repTooLowAnswerUpvote]);
    ///////////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            {answersArr.slice(startingIndex, endingIndex).map((answer) => (
                <div key = {answer._id} className = "answer">
                    
                        <div id= "answerVotingBox">
                        {localStorage.getItem("isGuest") == "false" && (
                        <button id= "upvote" onClick={() => props.upvoteAnswerFunc(answer, props.question)}>Upvote <br></br>{answer.upvotes.length}</button>
                        )}
                        <div id= "totalVotesDiv">{answer.upvotes.length - answer.downvotes.length} votes</div>
                        {localStorage.getItem("isGuest") == "false" && (
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
                    {/* {console.log("TOO LONG ERROR T OR F: " + commentTooLongErrors[answer._id])}
                    {console.log("EMPTY ERROR T OR F: " + commentEmptyErrors[answer._id])}
                    {console.log("COMMENTTEXT: " + commentTexts[answer._id])} */}
                    {localStorage.getItem("isGuest") == "false" && (
                    <div id="questionCommentPostForm">

                        <input type ="text"  
                        value={commentTexts[answer._id]}
                        placeholder="Add comment here (140 chars. max). . ." 
                        id={`commentTextBox_${answer._id}`} 
                        class="commentTextBoxAnswers" 
                        onChange={(e) => getCommentText(answer._id, e)}></input>

                        {/* {props.answerCommentTooLongError == true && (
                        <div id="commentTooLongErrorBox">Error: Comment text cannot exceed 140 characters</div>
                        )}
                        {props.answerCommentEmptyError == true && (
                        <div id="commentEmptyErrorBox">Error: Comment text cannot be empty</div>
                        )} */}
                        <br></br>
                            <button id="postCommentButton" onClick={() => clearTextBoxAndPostComment(answer)}>Post Comment</button>
                    </div>
                    )}
                    
                    <div id='pageButtonsComments'>
                        {answerCommentsPageNumbers[answer._id] != 1 && (
                        <button id="prevPageButtonComments" onClick={() => newDecrementCommentsPageFunc(answer._id)}>Prev</button>
                        )}
                        {answer.comments.length > 3 && (
                        <>{answerCommentsPageNumbers[answer._id]}</>
                        )}
                        {answer.comments.length > 3 && (
                        <button id="nextPageButtonComments" onClick={() => newIncrementCommentsPageFunc(answer._id, answer.comments.length)}>Next</button>
                        )}
                    </div>

                </div>
            ))}
        </>
    );
}