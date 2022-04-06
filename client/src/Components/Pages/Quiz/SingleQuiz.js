import React from "react";
import { Link ,useParams } from "react-router-dom";
import quizes from "./api/quizes";
import "./css/SingleQuiz.css";
import QuizDetail from "./QuizDetail";

function SingleQuiz({ quiz }) {
  

  return (
    <div className="col-lg-4 col-md-6 card-quiz">
      <div className="cardFeature">
        <h5 className="font-title--xs text-primary"> {quiz.title}</h5>
        <h5 className="font-title--xs">{`level :  ${quiz.level}`}</h5>

        <hr></hr>
        <Link  className="btn btn-primary" to={`/quiz/${quiz._id}`}> more details</Link>

        <button hidden={!(window.location.href==="http://localhost:3000/profilstudent")} onClick={()=>{
        quizes.delete(`/delete-quiz/${quiz._id}`)
        
      }} className="btn btn-danger btn-delete-teacher-quiz">
        delete
      </button>
      </div>
    </div>
  );
}

export default SingleQuiz;
