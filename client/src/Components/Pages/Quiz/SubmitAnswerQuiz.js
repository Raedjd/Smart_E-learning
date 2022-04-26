import React from "react";
import cookie from "js-cookie";
import QuizHistory from "./api/QuizHistory";
function SubmitAnswerQuiz({numberOfquestion , score,quiz}) {
    const userId = cookie.get("id");
    const addHistoryquiz = (e) => {
        e.preventDefault();
        QuizHistory.post("/add-quizhistory",{
            student : userId, 
            quiz:quiz._id,
            quizName:quiz.title,
            score:`your score is ${score}/${numberOfquestion}`
            
        })
        console.log("success")
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