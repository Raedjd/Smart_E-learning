import React , {useState} from "react";
import { Link  } from "react-router-dom";
import quizes from "./api/quizes";
import "./css/SingleQuiz.css";
import cookie from "js-cookie";



function SingleQuiz({ quiz }) {
  const userId = cookie.get("id");

  const deletequizHandler= () =>{
      quizes.delete(`/delete-quiz/${quiz._id}`)
  }
  return (
    <div className="col-lg-4 col-md-6 card-quiz">
      <div className="cardFeature">
        <h5 className="font-title--xs text-primary"> {quiz.title}</h5>
        <h5 className="font-title--xs">{`level :  ${quiz.level}`}</h5>

        <hr></hr>
        <div className="singlequiz-btn">
        <Link  hidden={!(quiz.quizCreator===userId)} className="btn btn-success singlequiz-btn-detail" to={`/pass-quiz/${quiz._id}`}> Pass quiz</Link>
        <Link  className="btn btn-primary singlequiz-btn-detail" to={`/quiz/${quiz._id}`}> more details</Link>
        <button hidden={!(window.location.href==="http://localhost:3000/profilstudent")} onClick={deletequizHandler} className="btn btn-danger singlequiz-btn">
        delete
      </button>
        </div>
       
      </div>
    </div>
  );
}

export default SingleQuiz;
