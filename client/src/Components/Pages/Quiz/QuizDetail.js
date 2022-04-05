import React, { useState, useEffect } from "react";
import "./css/QuizDetail.css";
import quizes from "./api/quizes";
import Spinner from "./Spinner";

function QuizDetail({ match }) {
  const [data, setdata] = useState(null);

  // retreive quiz data
  const retreiveQuize = async () => {
    const response = await quizes.get(`${match.params.id}`);
    return response.data;
  };

  useEffect(() => {
    const getQuiz = async () => {
      const AllQuizes = await retreiveQuize();
      if (AllQuizes) setdata(AllQuizes);
    };
    getQuiz();
  }, []);

  if (!data) return <Spinner />;
  return (
    <div className="big-card">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{data?.quiz?.title}</h5>
          <p className="card-text">{data?.quiz?.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Author : {data?.user?.username}</li>
          <li className="list-group-item">Level : {data?.quiz?.level}</li>
          <li className="list-group-item">
            Number of question : {data?.quiz?.numberOfQuestion}
          </li>
        </ul>
        <div className="card-body"></div>
      </div>
    </div>
  );
}

export default QuizDetail;
