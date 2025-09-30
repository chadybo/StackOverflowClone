import React from "react";
import { QuestionEditPage } from "./questionEditPage";
export default function DisplayUserQuestions(props) {


  const handleQuestionClick = (question) => {
    console.log("THIS IS JUST BEFORE IM SENDING HIM TO EDIT")
    console.log(question)

    props.openQuestionEditPageFunc(question)
  };

  return (
    <>
      {props.questionstoDisplay.map((question) => (
        <div key={question._id} className="userQuestions">
          <div id="userTitleDiv" onClick={() => handleQuestionClick(question)}>{question.title}</div>
        </div>
      ))}
    </>
  );
}