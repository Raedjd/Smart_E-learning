import "./badge.scss";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SecurityIcon from "@mui/icons-material/Security";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const Badge = ({ title, value, level, color }) => {
  return (
    <div className="hoverEffect">
      <div className={`badge ${color}`}>
        <div className="circle">
          {level === "beginner" ? (
            <FlashOnIcon className="heros" />
          ) : level === "intermediate" ? (
            <SecurityIcon className="heros" />
          ) : level === "advanced" ? (
            <RocketLaunchIcon className="heros" />
          ) : null}
        </div>
        <div className="ribbon">{title}</div>
      </div>
    </div>
  );
};

export default Badge;
