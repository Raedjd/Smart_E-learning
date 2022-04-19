import "./datatable.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { AiOutlineFileUnknown } from "react-icons/ai";
import axios from "axios";
const Datatable = () => {
  const userData = useSelector((state) => state.usersReducer);


const usersData = Object.keys(userData).map((key) => userData[key]);

  return (
    <div className="tables">
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">ID</TableCell>
                  <TableCell className="tableCell">username</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">Status</TableCell>
                  <TableCell className="tableCell">Document</TableCell>
          
                  <TableCell className="tableCell">***</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody> 
                 {usersData.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell className="tableCell">{i + 1}</TableCell>
                    <TableCell className="tableCell">{user.username}</TableCell>
                    <TableCell className="tableCell">{user.email}</TableCell>
                    <TableCell className="tableCell">{user.role}</TableCell>
                    <TableCell className="tableCell">  <button
                        onClick={() => {
                          saveAs(
                            user.yourDataFile
                          );
                     
                        }}
                       hidden={!user.yourDataFile}  
                      >
                      <AiOutlineFileUnknown/>
                      </button> </TableCell>
       
                
               
                     <TableCell className="tableCell">
                      <button
                  
                  onClick={() => {
                    axios({
                      method: "patch",
                      url: `${process.env.REACT_APP_API_URL}api/user/update-role/${user._id}`,
                      withCredentials: true,
                
                    })
                      .then((response) => {
                        console.log(response);
                      })
                      .catch((err) => {
                        console.log(err); 
                      });
                    // console.log(user._id)
                     window.location.reload();
                  }}
                        className="updateBtn"
                        hidden={user.role !== "student"}
                      >
                        Become a teacher
                      </button>
                    </TableCell> 
                  </TableRow>
                ))} 
              </TableBody>
            </Table>
          </TableContainer>
        </div>
  );
};

export default Datatable;
