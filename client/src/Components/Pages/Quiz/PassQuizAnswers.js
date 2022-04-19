import React from "react";
function PassQuizAnswers({ question, setcounter, counter }) {
  const radioboxhandler = (e) => {
    if (e.target.value === "true") {
      setcounter((counter) => counter + 1);
    }
    if (e.target.value === "false") {
      if (counter > 0) setcounter((counter) => counter - 1);
    }
  };

  return (
    <div>
      {question.answers.map((answer) => (
        <li key={answer._id} class="list-group-item">
          {answer.message}
          <input
            type="radio"
            name={`${question._id}`}
            onChange={radioboxhandler}
            value={answer.isRight}
            required
          />
        </li>
      ))}
    </div>
  );
}

export default PassQuizAnswers;
