import React, { useEffect, useState } from "react";
import quizes from "./api/quizes";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import cookie from "js-cookie";
import QuizHistory from "./api/QuizHistory";
import { useNavigate } from "react-router";

import "./css/Passquiz.css";
function PassQuiz() {
  let quizId = useParams();
  const userId = cookie.get("id");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [data, setdata] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  // retreive quiz data
  const retreiveQuize = async () => {
    const response = await quizes.get(`${quizId.id}`);
    return response.data;
  };
  useEffect(() => {
    const getQuiz = async () => {
      const AllQuizes = await retreiveQuize();
      if (AllQuizes) setdata(AllQuizes);
    };
    getQuiz();
  }, []);
  
  const addHistoryquiz = () => {
    QuizHistory.post("/add-quizhistory", {
      student: userId,
      quiz: data.quiz._id,
      quizName: data.quiz.title,
      score: `your score is ${score}/${data.quiz.questions.length}`,
    });
    console.log("success");
  };

  const HandleCurrenctQuestion = (isRight) => {
    if (isRight === true) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  useEffect(() => {
    const setHistoryQuiz = async () =>{
      const setHistory = await addHistoryquiz()
    }
    setHistoryQuiz()
    }, [showScore]);
  

  if (!data) return <Spinner />;

  return (
    <div className="container">
      <h1>{data.quiz.title}</h1>

      {showScore ? (
        <div className="container">
          <div class="card text-center quiz-result">
            <div class="card-header">Score</div>
            <div>
              <h5 class="card-title">
                You scored {score} out of {data.quiz.questions.length}
              </h5>
              <button className="btn btn-success" onClick={() => navigate(-1)}>
                {" "}
                Ok{" "}
              </button>
            </div>
            <div class="card-footer text-muted">
              Try Our courses to get better score : {score}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="card questionCard ">
            <div className="card-header questionTitle">
              {data.quiz.questions[currentQuestion].message}
            </div>
            <ul className="list-group list-group-flush">
              {data.quiz.questions[currentQuestion].answers.map((answer) => (
                <li class="list-group-item">
                  <button
                    className="passAnswer"
                    onClick={() => HandleCurrenctQuestion(answer.isRight)}
                  >
                    {`${answer.message} + ${answer.isRight}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div class="card-footer text-muted">
            Question : {currentQuestion + 1}/ {data.quiz.questions.length}
            score : {score}
          </div>
        </div>
      )}
    </div>
  );
}

export default PassQuiz;
