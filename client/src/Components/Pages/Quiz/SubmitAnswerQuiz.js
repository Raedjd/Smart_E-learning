import React from "react";
import { useSelector } from "react-redux";
import cookie from "js-cookie";
import QuizHistory from "./api/QuizHistory";
function SubmitAnswerQuiz({numberOfquestion , counter,quiz}) {
    const userData = useSelector((state) => state.userReducer);
    const userId = cookie.get("id");
    const addHistoryquiz = () => {
        console.log(quiz)
      };
    return ( 
        <div className="btn-submit-answers">
        <button className="btn btn-success" type="submit" onClick={addHistoryquiz}>
          Submit your answers{" "}
        </button>
      </div>
     );
}

export default SubmitAnswerQuiz;