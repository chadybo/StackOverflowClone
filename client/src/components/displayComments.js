import React from "react";
import { getDateFormat } from "./dateFormatting";

export default function DisplayComments(props){
    var commentsArr = [];

    for (var i = 0; i < props.question.comments.length; i++){
        for(var j = 0; j < props.comments.length; j++){
            if(props.question.comments[i]._id === props.comments[j]._id){

                // console.log("I AM IN THE IF STATEMENT")

                commentsArr.push(props.comments[j]);
            }
        }
    }

    var pageNumber = props.commentPagePageNumber;
    var startingIndex = (pageNumber*3) - 3
    var endingIndex = (pageNumber*3)

    return(
        <>
            {commentsArr.slice(startingIndex, endingIndex).map((comment) => (
                <div key = {comment._id} className = "comment">
                    
                        <div id= "questionCommentsVotingBox">
                        {localStorage.getItem("isGuest") == "false" && (
                        <button id= "upvoteComment" onClick={() => props.upvoteCommentFunc(comment, props.question)}>Upvote</button>
                        )}
                        <div id= "totalVotesDivComment">{comment.upvotes.length} votes</div>
                        </div>

                    <div id="questionComment">
                        {comment.text}
                    </div>

                    <div id= "questionCommentUser">
                        <div id="questionCommentAuthorDiv">
                        <span className="greenText">{comment.ans_by}</span>
                        </div>
                        <div id="questionCommentDate">
                            commented {getDateFormat(new Date(comment.ans_date_time))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );


}