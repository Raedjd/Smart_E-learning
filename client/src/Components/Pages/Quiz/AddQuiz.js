import React, { useState } from "react";
import Question from "./Question";
import quizes from "./api/quizes";
import { useSelector } from "react-redux";
import cookie from "js-cookie";

import "./css/AddQuiz.css";
function AddQuiz() {
  const userData = useSelector((state) => state.userReducer);
  const userId = cookie.get("id");
  
  const [questions, setquestions] = useState([]);
  const [numberOfquestion, setnumberOfquestion] = useState(0);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [level, setlevel] = useState("beginner");

  const addQuestion = (e) => {
    e.preventDefault();
    setnumberOfquestion(numberOfquestion + 1);

    setquestions([
      ...questions,
      {
        id: questions.length + 1,
        message: "",
        answers: [],
      },
    ]);
  };
  const updateFields = (id, message) => {
    const list = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          message,
        };
      }
      return question;
    });
    setquestions(list);
  };

  const updateAnswerFeild = (id, answer) => {
    const list = questions.map((question) => {
    console.log("🚀 ~ file: AddQuiz.js ~ line 46 ~ list ~ question", question.answers)
      if (question.id === id) {
        return {
          ...question,
          answer,
        };
      }
      return question;
    });
    setquestions(list);
  };
  
  const addAnswer = (id, answer) => {
    const list = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          answers: [...question.answers, answer],
        };
      }
      return question;
    });
    setquestions(list);
  };
  const addquiz = (e) => {
    e.preventDefault();
    quizes
      .post("/add-quiz", {
        quizCreator:userId,
        title: title,
        description: description,
        questions: questions,
        level: level,
        numberOfQuestion: numberOfquestion,

      })
      .then(() => {
        console.log("succes");
      });
  };

  return (
    <div>
      <h1>Add Quiz</h1>
    <div className="container">
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            onChange={(event) => settitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            id="Description"
            rows="3"
            onChange={(event) => setdescription(event.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Level</label>
          <select
            onChange={(event) => setlevel(event.target.value)}
            className="form-control"
          >
            <option>beginner</option>
            <option>Medium</option>
            <option>advanced</option>
          </select>
        </div>
        
        {questions.map((question, index) => (
          <div key={index} className="Question-input">
            <Question
              question={question}
              updateFields={updateFields}
              addAnswer={addAnswer}
              updateAnswerFeild={updateAnswerFeild}
              questions={questions}
              setquestions={setquestions}
              setnumberOfquestion={setnumberOfquestion}
              numberOfquestion={numberOfquestion}
            />
         
           
            
          </div>
        ))}
       
        <button type="submit" className="btn btn-primary add-question-btn" onClick={addQuestion}>
          add question
        </button>
        <hr></hr>
        <div className="submit-quiz-btn"><button onClick={addquiz} type="submit" className="btn btn-primary submit-quiz-btn">
          Submit
        </button></div>
        
      </form>
    </div>
    </div>
  );
}

export default AddQuiz;
