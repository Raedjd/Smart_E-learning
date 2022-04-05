import React from "react";
import Answer from "./Answer";


function Question({ question, updateFields, addAnswer , updateAnswerFeild }) {
    
  const inputHandler = (e) => {
    updateFields(question.id, e.target.value);
  };

  return (
    <div>
      <label>Question: {question.id}</label>
      <input
        onChange={inputHandler}
        className="form-control"
        type="text"
        required
        placeholder="enter your question"
      />
      {question.answers.map((answer, index) => (
        <div key={index} className="Question-input">
          <Answer answer={answer} question={question} updateAnswerFeild={updateAnswerFeild} />
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          addAnswer(question.id, {
            isRigth: false,
            message: "",
            id: question.answers.length + 1,
          });
        }}
      >
        add answers
      </button>
    </div>
  );
}

export default Question;
