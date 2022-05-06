import "./TopicManag.scss";
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

const TopicManag = () => {
  const [data, setData] = useState([]);
  //const [categoryName, setCategoryName] = useState("");
  //const [categoryChanged, setCategoryChanged] = useState("");
  const [clicked, setClicked] = useState(false);
  const [Idclick, setIdClick] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/api/topics").then((data) => {
      setData(data.data);
    });
  }, []);
  //let handleInputChange = (e) => {
    //e.preventDefault();
   // setCategoryName(e.target.value);
  //};
  let dataArr = [...data];
  
  
  

  return (
    <div className="list">
      
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        
        <div className="tables">
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">ID</TableCell>
                  <TableCell className="tableCell">Title</TableCell>
                  <TableCell className="tableCell">Content</TableCell>
                  <TableCell className="tableCell">User</TableCell>
                  <TableCell className="tableCell">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((top, i) => (
                  <TableRow key={i}>
                    <TableCell className="tableCell">{i + 1}</TableCell>
                    <TableCell className="tableCell">{top.title}</TableCell>
                    <TableCell className="tableCell">{top.content}</TableCell>
                    <TableCell className="tableCell">
                      {top.userId}
                    </TableCell>
                    <TableCell className="tableCell">
                      <button
                        onClick={() => {
                          axios.delete(
                            `http://localhost:5000/api/topics/${top._id}`
                          );
                          window.location.reload();
                        }}
                        className="deleteBtn"
                      >
                        DELETE
                      </button>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        
      </div>
    </div>
  );
};

export default TopicManag;
