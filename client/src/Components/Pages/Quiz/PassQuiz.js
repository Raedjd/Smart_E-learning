import React, { useEffect, useState } from "react";
import quizes from "./api/quizes";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import cookie from "js-cookie";
import PassQuizAnswers from "./PassQuizAnswers";
import "./css/Passquiz.css";
import SubmitAnswerQuiz from "./SubmitAnswerQuiz";
function PassQuiz() {
  let quizId = useParams();
  const userId = cookie.get("id");

  const [data, setdata] = useState(null);
  const [numberOfquestion, setnumberOfquestion] = useState(0);
  const [counter, setcounter] = useState(0);
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

  if (!data) return <Spinner />;

  return (
    <div className="container">
      <h1>{data.quiz.title}</h1>
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
    </div>
  );
}

export default PassQuiz;
