import React from "react";
function Answer({ answer ,question, updateAnswerFeild } ) {
  const inputHandler = (e) => {
    answer.message=e.target.value
    updateAnswerFeild(question.id ,answer)
  };
  const checkboxhandler =  (e) =>{
    answer.isRigth=e.target.checked
    updateAnswerFeild(question.id ,answer)


  }

  
  return (
    <div>
      <label>Answer: </label>
      <input
        className="form-control"
        type="text"
        required
        placeholder="enter your answer"
        onChange={inputHandler}
      />
      <input type="checkbox" name="isRight"   onChange={checkboxhandler}/> isRight
    </div>
  );
}

export default Answer;
