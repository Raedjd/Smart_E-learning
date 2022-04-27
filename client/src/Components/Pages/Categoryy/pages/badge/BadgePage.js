import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Badge from "../../components/badge/Badge";
import { Link } from "react-router-dom";
import "./badgepage.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const BadgePage = () => {
  const [data, setData] = useState([]);
  const [bName, setBName] = useState("");
  const [bValue, setBValue] = useState(0);
  const [bDesc, setBDesc] = useState("");
  const [bLevel, setBLevel] = useState("");
  const [bColor, setBColor] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/api/badges").then((data) => {
      setData(data.data);
    });
  }, []);
  let handleName = (e) => {
    e.preventDefault();
    setBName(e.target.value);
  };
  let handleValue = (e) => {
    e.preventDefault();
    setBValue(e.target.value);
  };
  let handleDesc = (e) => {
    e.preventDefault();
    setBDesc(e.target.value);
  };
  let handleColor = (e) => {
    e.preventDefault();
    setBColor(e.target.value);
  };
  let handleLevel = (e) => {
    e.preventDefault();
    setBLevel(e.target.value);
  };
  let handleSubmit = () => {
    axios.post("http://localhost:5000/api/badges", {
      name: bName,
      description: bDesc,
      color: bColor,
      level: bLevel,
      value: bValue,
    });
    window.location.reload();
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="Title">All Badges</div>
        <div className="badgesWidgets">
          {data.map((e, index) => (
            <Link
              to={`${e._id}`}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <Badge
                key={index}
                title={e.name}
                color={e.color}
                level={e.level}
              />
            </Link>
          ))}
        </div>
        <div className="inputG">
          <h1>Create a New Badge</h1>
          <div className="ramadan">
            <div className="line">
              <input
                type="text"
                placeholder="Badge Name..."
                onChange={handleName}
              />
              <input
                type="number"
                placeholder="Badge Value..."
                onChange={handleValue}
              />
            </div>

            <div className="line">
              <select onChange={handleColor}>
                <option>blue</option>
                <option>blue-dark</option>
                <option>red</option>
                <option>yellow</option>
                <option>orange</option>
                <option>pink</option>
                <option>purple</option>
                <option>green</option>
                <option>green-dark</option>
                <option>teal</option>
                <option>silver</option>
                <option>gold</option>
              </select>
              <select onChange={handleLevel}>
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
              </select>
            </div>
            <textarea
              placeholder="Badge Description..."
              onChange={handleDesc}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgePage;
