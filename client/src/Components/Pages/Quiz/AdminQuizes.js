import React, { useEffect, useState } from "react";
import Navbar from "../Categoryy/components/navbar/Navbar";
import Sidebar from "../Categoryy/components/sidebar/Sidebar";
import quizes from "./api/quizes";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function AdminQuizes() {
  const [allquizes, setallquizes] = useState([]);
  //retreive all quizes
  const retreiveQuizes = async () => {
    const response = await quizes.get(`/all-quizs`);
    return response.data;
  };
  useEffect(() => {
    const getAllQuizes = async () => {
      const AllQuizes = await retreiveQuizes();
      if (AllQuizes) {
        setallquizes(AllQuizes);
      }
    };

    getAllQuizes();
  }, []);
  console.log(allquizes);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="Title">All Quizes</div>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">title</TableCell>
                <TableCell className="tableCell">level</TableCell>
                <TableCell className="tableCell">category</TableCell>

                <TableCell className="tableCell">numberOfQuestion</TableCell>
                <TableCell className="tableCell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allquizes.map((quiz, i) => (
                <TableRow key={i}>
                  <TableCell className="tableCell">{i + 1}</TableCell>
                  <TableCell className="tableCell">{quiz.title}</TableCell>
                  <TableCell className="tableCell">{quiz.level}</TableCell>
                  <TableCell className="tableCell">{quiz.category}</TableCell>

                  <TableCell className="tableCell">
                    {quiz.numberOfQuestion}
                  </TableCell>
                  <TableCell className="tableCell">
                    <Button
                      color="error"
                      onClick={() => {
                        quizes.delete(`/delete-quiz/${quiz._id}`);
                        window.location.reload();
                      }}
                    >
                      <DeleteIcon className="icon" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default AdminQuizes;
