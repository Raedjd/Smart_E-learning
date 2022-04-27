import React from "react";
import Answer from "./Answer";
import "./css/Question.css"


function Question({ question, updateFields, addAnswer , updateAnswerFeild , questions,setquestions ,setnumberOfquestion,numberOfquestion}) {
    
  const inputHandler = (e) => {
    updateFields(question.id, e.target.value);
  };
  const handleRemove = (id) => {
    const list = questions.filter((question) => question.id !== id);
    setquestions(list);
    setnumberOfquestion(numberOfquestion - 1);
  };

  return (
    
    <div className="question-box">
      
      <label>Question: {question.id}</label>
      <div className="question-box-input-btn">
      <input
        onChange={inputHandler}
        className="form-control"
        type="text"
        required
        placeholder="enter your question"
      />
         <button
              className="btn btn-danger delete-question-btn"
              onClick={() => handleRemove(question.id)}
            >
                X
            </button>
      </div>
         
      {question.answers.map((answer, index) => (
        <div key={index} className="Question-input">
          <Answer answer={answer} question={question} updateAnswerFeild={updateAnswerFeild} />
        </div>
      ))}
      <button className="btn btn-success"
        onClick={(e) => {
          e.preventDefault();
          addAnswer(question.id, {
            isRight: false,
            message: "",
            id: question.answers.length + 1,
          });
        }}
      >
        add answers
      </button>
      <hr></hr>
    </div>
  );
}

export default Question;
