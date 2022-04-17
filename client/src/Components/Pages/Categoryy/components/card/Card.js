import "./card.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Card = ({ title, counter, subs }) => {
  return (
    <div className="cardWidget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">{counter}</span>
        <span className="link">Number of subcategories : {subs}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          15 %
        </div>
      </div>
    </div>
  );
};

export default Card;
