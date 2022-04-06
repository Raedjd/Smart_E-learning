import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cookie from "js-cookie";
import { Link } from "react-router-dom";

import SingleQuiz from "./SingleQuiz";
import "./css/TeacherQuiz.css" 
import quizes from "./api/quizes";

function TeacherQuiz() {
      const [teacherquiz, setTeacherquiz] = useState([]);

    const userData = useSelector((state) => state.userReducer);
  const userId = cookie.get("id");
  
    const retreiveQuizes = async () => {
        const response = await quizes.get(`/teacher-quiz/${userId}`);
        return response.data;
      };
      useEffect(() => {
        const getAllQuizes = async () => {
          const AllQuizes = await retreiveQuizes();
          if (AllQuizes) setTeacherquiz(AllQuizes);
        };
        getAllQuizes();
      }, []);
      useEffect(()=>{

      })
      const removeQuizHandler= async (id) =>{
     console.log(id) 
          }
    return (  <div>
      <h2 className="text-center">All Quiz</h2>
    <div className="container">
      <Link to="/add-quiz" className="btn btn-primary">Add quiz</Link>
      <div className="teacherQuizes">

      {teacherquiz.map((quiz) => (
        <>
      <SingleQuiz key={quiz._id} quiz={quiz} 
      
      />
       
     
      </>
    ))}
    </div>
    </div>
    </div> );
}

export default TeacherQuiz;