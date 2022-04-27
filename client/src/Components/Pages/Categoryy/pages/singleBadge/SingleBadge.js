import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "../../components/badge/Badge";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./singlebadge.scss";
import axios from "axios";

const SingleBadge = () => {
  const { badgeId } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:5000/api/badges/${badgeId}`).then((data) => {
      setData(data.data);
    });
  }, [badgeId]);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="badgeInfo">
          <div
            className="deleteB"
            onClick={() => {
              axios.delete(`http://localhost:5000/api/badges/${badgeId}`);
              window.location.href = "http://localhost:3000/dash/badges";
            }}
          >
            Delete
          </div>
          <Badge color={data.color} title={data.name} level={data.level} />
          <div className="right">
            <p>level : {data.level}</p>
            <p>value : {data.value} points</p>
            <p>description : {data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBadge;
