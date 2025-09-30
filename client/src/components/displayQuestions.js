import React from "react";
////import Model from "../models/model";
import { getDateFormat } from "./dateFormatting";
import axios from 'axios'; 

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
    return result;
}

const updateViews = async (question) => {
    try {
      await axios.post('http://localhost:8000/updateview', { questionID: question._id });
      console.log("THE VIEWS OF THE QUESTION AFTER UPDATE: " + question.views);
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

export default function DisplayQuestions(props){
    // console.log("WE ARE IN DISPLAY QUESTIOSN FUCKER")
    // console.log("HELLLLLLLLLLLLLLOOOOOOOOOOO" + props.questions.length);
    async function openPageAndUpateView(question) {
        try {
            await updateViews(question);
            props.openAnswersPageFunc(question);
        } catch (error) {
            console.error('Error updating view count:', error);
        }
    }

    // console.log("props.questions HERE")
    // console.log(props.questions)
    var pageNumber = props.mainPagePageNumber;
    var startingIndex = (pageNumber*5) - 5
    var endingIndex = (pageNumber*5)

    // props.tagsCallFunc()
    
    return(
        <>
            {props.questions.slice(startingIndex, endingIndex).map((question) => (
                <div key = {question._id} className = "question" onClick={() => openPageAndUpateView(question)}>
                    <div id="viewCountFormat">
                        {question.views} views 
                        <br />
                        {question.answers.length} answers
                        <br />
                        {question.upvotes.length - question.downvotes.length} votes
                    </div>
                    <div id="formatTitle">
                        {question.title}
                    </div>
                    <div id="formatSummary">
                        {question.summary}
                    </div>
                    {/* <div id="userNameAndDateFormat">
                        <div id="userNameFormat">
                            <span className="redText">{question.asked_by}</span> asked
                        </div>
                        <div id="dateFormat">
                            {getDateFormat(new Date(question.ask_date_time))}
                        </div>
                    </div> */}
                    <div id="bigTagDiv">
                        {displayTags(question, props.tags,props).map((tag, index) => (
                            <div className ="smallTagDiv" key = {index}>{tag} </div>
                        ))} 
                    </div>
                    <div id="userNameAndDateFormat">
                        <div id="userNameFormat">
                            <span className="redText">{question.asked_by}</span> asked
                        </div>
                        <div id="dateFormat">
                            {getDateFormat(new Date(question.ask_date_time))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}