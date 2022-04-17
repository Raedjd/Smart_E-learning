import "./subcategory.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Subcategory = () => {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryChanged, setCategoryChanged] = useState("");
  const [hello, setHello] = useState();
  const [clicked, setClicked] = useState(false);
  const [Idclick, setIdClick] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories").then((data) => {
      setData(data.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/api/subcategories").then((data) => {
      setDatas(data.data);
    });
  }, []);

  let handleInputChange = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };
  let handleUpdateChange = (e) => {
    e.preventDefault();
    setCategoryChanged(e.target.value);
  };
  let handleSubmit = () => {
    axios.post("http://localhost:5000/api/subcategories", {
      name: categoryName,
      category: hello,
    });
    window.location.reload();
  };
  let handleSubmitChanged = () => {
    axios.put(`http://localhost:5000/api/subcategories/${Idclick}`, {
      name: categoryChanged,
    });
    window.location.reload();
  };
  let optionClicked = (e) => {
    let pos = data.map((item) => item.name);
    let index = pos.indexOf(e.target.value);
    let ping = data[index];
    setHello(ping._id);
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
        <div className="listContainers">
          <div className="listTitle">Our Sub-Categories</div>
          <div className="tables">
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">ID</TableCell>
                    <TableCell className="tableCell">Name</TableCell>
                    <TableCell className="tableCell">Courses</TableCell>
                    <TableCell className="tableCell">CategoryID</TableCell>
                    <TableCell className="tableCell">***</TableCell>
                    <TableCell className="tableCell">***</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.map((cat, i) => (
                    <TableRow key={i}>
                      <TableCell className="tableCell">{i + 1}</TableCell>
                      <TableCell className="tableCell">{cat.name}</TableCell>
                      <TableCell className="tableCell">{10}</TableCell>
                      <TableCell className="tableCell">
                        {cat.category}
                      </TableCell>
                      <TableCell className="tableCell">
                        <button
                          onClick={() => {
                            axios.delete(
                              `http://localhost:5000/api/subcategories/${cat._id}`
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
        </div>
        <div className="listContainers">
          <div className="listTitle">Add a new Sub-Category</div>
          <div className="options">
            <div className="select">
              <h3>Please Select a Category</h3>
              <select onChange={optionClicked}>
                <option disabled selected>
                  Choose a category
                </option>
                {data.map((category, index) => (
                  <option key={index}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="inputs">
              <input
                type="text"
                placeholder="Sub-Category Name..."
                onChange={handleInputChange}
              />
              <button onClick={handleSubmit}>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subcategory;
