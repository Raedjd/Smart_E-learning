import React, { useEffect, useState } from "react";
import quizes from "./api/quizes";
import Spinner from "./Spinner";
import LevelFilter from "./LevelFilter";
//import components
import SingleQuiz from "./SingleQuiz";
//import css
import "./css/allQuizes.css";
function AllQuizes() {
  
  const [allquizes, setallquizes] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [flterQuestion, setflterQuestion] = useState([]);
  const [questionName, setquestionName] = useState("All");

  const [levelName, setLevelName] = useState("All");
  //retreive all quizes
  const retreiveQuizes = async () => {
    const response = await quizes.get(`/all-quizs`);
    return response.data;
  };
  useEffect(() => {
    const getAllQuizes = async () => {
      const AllQuizes = await retreiveQuizes();
      if (AllQuizes) {
        setallquizes(AllQuizes);
        setFilterLevel(AllQuizes);
        setflterQuestion(AllQuizes)
      }
    };

    getAllQuizes();
  }, []);

  if (!allquizes) return <Spinner />;
  return (
      <div>
        <h1>All Quizes</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-none d-lg-block">
              <h2>Filter</h2>
  
              <LevelFilter
                allquizes={allquizes}
                setFilterLevel={setFilterLevel}
                levelName={levelName}
                setLevelName={setLevelName}
              />
             

            </div>
            
            <div className="col-lg-8">
              <div className="row event-search-content">
                {filterLevel.map((quiz) => (
                  <SingleQuiz key={quiz._id} quiz={quiz} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default AllQuizes;
