import React, { useEffect, useState } from "react";
import Navbar from "../Categoryy/components/navbar/Navbar";
import Sidebar from "../Categoryy/components/sidebar/Sidebar";
import quizes from "./api/quizes";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  console.log(allquizes)
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
                  <TableCell className="tableCell">numberOfQuestion</TableCell>          
                </TableRow>
              </TableHead>
              <TableBody> 
                 {allquizes.map((quiz, i) => (
                      <TableRow key={i}>
                      <TableCell className="tableCell">{i + 1}</TableCell>
                      <TableCell className="tableCell">{quiz.title}</TableCell>
                      <TableCell className="tableCell">{quiz.level}</TableCell>
                      <TableCell className="tableCell">{quiz.numberOfQuestion}</TableCell>
                      </TableRow>
                 ))}
                 </TableBody>
              </Table>
</TableContainer>
          </div>
         
          </div>
    )
}
export default AdminQuizes;
