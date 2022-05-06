import React from "react";

const Message = (props) => (
  <div>
    {props.speaks === "bot" && <p style={{ color: "red" }}>{props.text} </p>}
    {props.speaks === "me" && <p style={{ color: "blue" }}>{props.text} </p>}
  </div>
);

export default Message;
