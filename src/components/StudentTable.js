import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";

const StudentTable=({data})=>{
  console.log(data);
  const Matching = (row)=>{
    for(let i=0;i<row.row.length;i++){
      if(row.len.toString()===row.row[i].number.toString()){
        return <TableCell>{row.row[i].rating}</TableCell>
      }
    }
     return <TableCell> </TableCell>
  }
  const NumberCellTable=(num)=> {
    let array=[];
    for(let i=1;i<=num;i++){
      array.push(i.toString())
    }
    return array;
  }

if(data){
  const {mag,les} =data;
  const array = NumberCellTable(les.number);
  return(
      <div>
        <div>{les.name}</div>
        <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                {array.map((row) => (

                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                {array.map((row) => (
                <Matching row={mag} len={row}/>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}
};

export default StudentTable;