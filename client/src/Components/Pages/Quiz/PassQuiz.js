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
  const [numberOfquestion, setnumberOfquestion] = useState(0);
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
      setnumberOfquestion(AllQuizes.quiz.numberOfQuestion);
    };
    getQuiz();
  }, []);
  const addHistoryquiz = (e) => {
    QuizHistory.post("/add-quizhistory", {
      student: userId,
      quiz: data.quiz._id,
      quizName: data.quiz.title,
      score: `your score is ${score}/${numberOfquestion}`,
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
      addHistoryquiz();
    }
  };

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
            <div class="card-footer text-muted">Try Our courses to get better</div>
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
                    {answer.message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div class="card-footer text-muted">
            Question : {currentQuestion + 1}/ {data.quiz.questions.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default PassQuiz;
/*
  <div className="container">
      <h1>{data.quiz.title}</h1>

      {showScore ? (
        <div className="card">
          <div className="card-body">
            {" "}
            You scored {score} out of {data.quiz.questions.length}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="card questionCard ">
            <div className="card-header questionTitle">Featured</div>
            <ul className="list-group list-group-flush">
                {data.quiz.questions[currentQuestion].answers.map((answer) => (
                <li class="list-group-item" >
                  <button
                    className="passAnswer"
                    onClick={() => HandleCurrenctQuestion(answer.isRight)}
                  >
                    {answer.message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
*/
/*
<div class="card text-center">
  <div class="card-header">
    {data.quiz.title}
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
*/

/*
<div className="container">
      <h1>{data.quiz.title}</h1>
      <div class="card-header text-center">
      <span > Question 1 / {data.quiz.questions.length} : </span>

             {data.quiz.questions[currentQuestion].message}
            </div>
            <div className='answer-section'>
						{data.quiz.questions[currentQuestion].answers.map((answer) => (
							<button onClick={HandleCurrenctQuestion}>{answer.message}</button>
						))}
					</div>
            <button> </button>
    </div>*/

/*
<div class="card" style="width: 18rem;">
  <div class="card-header">
{data.quiz.title}
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
</div>*/
/*
  {data.quiz.questions.map((question) => (
        <div key={question._id}>
          <div class="card-md-12  question-card">
            <div class="card-header text-center">
              question : {question.message}
            </div>
            <ul class="list-group list-group-flush">
              <PassQuizAnswers
                key={question._id}
                question={question}
                setcounter={setcounter}
                counter={counter}
              />
            </ul>
          </div>
        </div>
      ))}
      <SubmitAnswerQuiz
        counter={counter}
        quiz={data.quiz}
        numberOfquestion={numberOfquestion}
      />
*/
