import React from "react";
import { Link } from "react-router-dom";

import "./css/SingleQuiz.css";
import QuizDetail from "./QuizDetail";
function SingleQuiz({ quiz }) {

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{quiz.title}</h5>
          <p className="card-text">{quiz.description}</p>
          <h6 className="card-subtitle mb-2 text-muted">{quiz.level}</h6>
          <Link className="card-link" to={`quiz/${quiz._id}`}>
            More detail
          </Link>
         
          
        </div>
      </div>
    </div>
  );
}

export default SingleQuiz;
