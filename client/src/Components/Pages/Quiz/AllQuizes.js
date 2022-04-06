import React, { useEffect, useState } from "react";
import quizes from "./api/quizes";
//import components
import SingleQuiz from "./SingleQuiz";
//import css
import "./css/allQuizes.css";
function AllQuizes() {
  
  const [allquizes, setallquizes] = useState([]);
  //retreive all quizes
  const retreiveQuizes = async () => {
    const response = await quizes.get(`/all-quizs`);
    return response.data;
  };
  useEffect(() => {
    const getAllQuizes = async () => {
      const AllQuizes = await retreiveQuizes();
      if (AllQuizes) setallquizes(AllQuizes);
    };
    getAllQuizes();
  }, []);
  return (
    <div>
      <h1>All quizes</h1>
      <hr></hr>
      <div className="main">
        {allquizes.map((quiz) => (
          <SingleQuiz key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

export default AllQuizes;
