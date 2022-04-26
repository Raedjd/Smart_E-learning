import React, { useEffect, useState } from "react";
import QuizHistory from "./api/QuizHistory";
import cookie from "js-cookie";
import { useSelector } from "react-redux";
import quizes from "./api/quizes";


import Spinner from "./Spinner";

function HistoryQuiz() {
  const [historyQuizs, setHistoryQuiz] = useState([]);
  const [quiz , setquiz] = useState ([])
  const userData = useSelector((state) => state.userReducer);

  const userId = cookie.get("id");
  const retreiveHistoryQuizes = async () => {
    const response = await QuizHistory.get(`/student-quiz/${userId}`);
    return response.data;
  };
  
  useEffect(() => {
    const getAllHsitoryQuizes = async () => {
      const allHistoryQuiz = await retreiveHistoryQuizes();
      if (allHistoryQuiz) setHistoryQuiz(allHistoryQuiz);
    };
    
    getAllHsitoryQuizes();
  }, []);
  

  useEffect(() => {
   
  }, []);
  if (!historyQuizs) return <Spinner />;
console.log(historyQuizs)
  return (
      <div>
    {historyQuizs.map((Historyquiz) => (

    <div className="col-lg-4 col-md-6 card-quiz">
      <div className="cardFeature">
          <div>
            <h5 className="font-title--xs text-primary">
              {" "}
              {Historyquiz.quizName}
            </h5>
            <h5 className="font-title--xs">{`score :  ${Historyquiz.score}`}</h5>
          </div>
        
      </div>
      </div>
      ))}
    </div>
  );
}

export default HistoryQuiz;
