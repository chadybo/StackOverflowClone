import axios from "axios";
import { useState } from "react";


export default function DisplayAnswersnew(props){

    return (
        <>
          {props.questions.map((question) => (
        <div key={question._id} className="answeredQuestionsDiv">
          <div id="questionAnswerDiv" onClick={()=>props.openUserQuestionAnswerPageFunc(question)}>{question.title}</div>
        </div>
      ))}
        </>
      );
}