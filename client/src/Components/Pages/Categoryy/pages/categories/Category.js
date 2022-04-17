import "./category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/card/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Category = () => {
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryChanged, setCategoryChanged] = useState("");
  const [clicked, setClicked] = useState(false);
  const [Idclick, setIdClick] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories").then((data) => {
      setData(data.data);
    });
  }, []);
  let handleInputChange = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };
  let dataArr = [...data];
  let handleSubmit = () => {
    axios.post("http://localhost:5000/api/categories", {
      name: categoryName,
    });
    window.location.reload();
  };
  let handleSubmitChanged = () => {
    axios.put(`http://localhost:5000/api/categories/${Idclick}`, {
      name: categoryChanged,
    });
    window.location.reload();
  };
  let handleUpdateChange = (e) => {
    e.preventDefault();
    setCategoryChanged(e.target.value);
  };

  return (
    <div className="list">
      {clicked ? (
        <div className="modal">
          <div className="modalInput">
            <input
              type="text"
              placeholder="Sub-Category Name..."
              onChange={handleUpdateChange}
            />
            <button onClick={handleSubmitChanged}>submit</button>
          </div>
        </div>
      ) : null}
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="catWidgets">
          {dataArr.map((category, index) => (
            <Card
              key={index}
              title={category.name}
              counter="10"
              subs={category.subCategories.length}
            />
          ))}
        </div>
        <div className="tables">
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">ID</TableCell>
                  <TableCell className="tableCell">Name</TableCell>
                  <TableCell className="tableCell">Courses</TableCell>
                  <TableCell className="tableCell">Sub-Categories</TableCell>
                  <TableCell className="tableCell">***</TableCell>
                  <TableCell className="tableCell">***</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((cat, i) => (
                  <TableRow key={i}>
                    <TableCell className="tableCell">{i + 1}</TableCell>
                    <TableCell className="tableCell">{cat.name}</TableCell>
                    <TableCell className="tableCell">{10}</TableCell>
                    <TableCell className="tableCell">
                      {cat.subCategories.length}
                    </TableCell>
                    <TableCell className="tableCell">
                      <button
                        onClick={() => {
                          axios.delete(
                            `http://localhost:5000/api/categories/${cat._id}`
                          );
                          window.location.reload();
                        }}
                        className="deleteBtn"
                      >
                        DELETE
                      </button>
                    </TableCell>
                    <TableCell className="tableCell">
                      <button
                        onClick={() => {
                          setClicked(true);
                          setIdClick(cat._id);
                          console.log(cat._id);
                        }}
                        className="updateBtn"
                      >
                        Update
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="wrapperInput">
          <h1>Create a New category</h1>
          <p>
            Create a new category so teachers can have more teaching options or
            you can wait for a teacher to just ask for a new category in demand.
          </p>
          <div className="inputGroup">
            <input
              type="text"
              placeholder="Category Name..."
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
