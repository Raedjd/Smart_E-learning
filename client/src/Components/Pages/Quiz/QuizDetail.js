import React, { useState, useEffect } from "react";
import "./css/QuizDetail.css";
import quizes from "./api/quizes";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import cookie from "js-cookie";


function QuizDetail() {
  let quizId = useParams();
  const userId = cookie.get("id");

  console.log("🚀 ~ file: QuizDetail.js ~ line 9 ~ QuizDetail ~ id", quizId.id);

  const [data, setdata] = useState(null);

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

  if (!data) return <Spinner />;
  return (
    <div class="quiz-detail-information">
      <div class="white-bg container">
        <div class="students-info-form">
          <h6 class="font-title--card text-center"> general Quiz Information</h6>
          <hr></hr>
          <div class="info-student">
                                        <dl class="row my-0 info-student-topic">
                                            <dt class="col-sm-4">
                                                <span>Quiz title : </span>
                                            </dt>
                                            <dd class="col-sm-8">
                                                <p>{data.quiz.title}</p>
                                            </dd>
                                        </dl>
                                        <dl class="row my-0 info-student-topic">
                                            <dt class="col-sm-4">
                                                <span>Quiz Creator : </span>
                                            </dt>
                                            <dd class="col-sm-8">
                                                <p>{data.user.username}</p>
                                            </dd>
                                        </dl>
                                        <dl class="row my-0 info-student-topic">
                                            <dt class="col-sm-4">
                                                <span>Description : </span>
                                            </dt>
                                            <dd class="col-sm-8">
                                                <p>{data.quiz.description}</p>
                                            </dd>
                                        </dl>
                                        <dl class="row my-0 info-student-topic">
                                            <dt class="col-sm-4">
                                                <span>level : </span>
                                            </dt>
                                            <dd class="col-sm-8">
                                                <p>{data.quiz.level}</p>
                                            </dd>
                                        </dl>
                                        
                                        <dl class="row my-0 info-student-topic">
                                            <dt class="col-sm-4">
                                                <span>Number of Questions : </span>
                                            </dt>
                                            <dd class="col-sm-8">
                                                <p>{data.quiz.numberOfQuestion}</p>
                                            </dd>
                                        </dl>
                                        <dl class="row my-0 info-student-topic">
                                            <dt class="col-sm-4">
                                                <span>Created-at :</span>
                                            </dt>
                                            <dd class="col-sm-8">
                                                <p>{data.quiz.createdAt}</p>
                                            </dd>
                                        </dl>
                                    </div>
        </div>
      </div>
<hr />

<div class="white-bg container" hidden={!(data.quiz.quizCreator===userId)}>
        <div class="students-info-form">
          <h6 class="font-title--card "> Questions</h6>
          <hr></hr>
          <div class="info-student">
            {data.quiz.questions.map((quiz , index)=>(
                    <dl key={index}class="row my-0 info-student-topic">
                    <dt class="col-sm-4">
                        <span>Question  : {index+1} </span>
                    </dt>
                    <dd class="col-sm-8">
                        <p>{quiz.message}</p>
                    </dd>
                </dl>
               
            ))}
               </div>                     
        </div>
      </div>
    </div>
  );
}

export default QuizDetail;
