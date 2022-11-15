import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const StudentMags = ({data}) => {
    let i=1;
    const Matching = ({data,name})=>{
        let arrayTableCell=[];
        if(data.name===name){
            for(i;i<data.amount;i++){
                if(i.toString()===data.number){
                    arrayTableCell.push(<TableCell>{data.rating}</TableCell>)
                    i++;
                    return arrayTableCell
                }
                else {
                    arrayTableCell.push(<TableCell></TableCell>)
                }
            }
        }
        else{
            arrayTableCell.push(<TableRow></TableRow>)
            i=1;
        }
        return arrayTableCell
    }

    const NumberCellTable=(num)=> {
        let array=[];
        for(let i=1;i<=num;i++){
            array.push(<TableCell>{i.toString()}</TableCell>)
        }
        return array;
    }
    const NameCellTable=(data)=> {
        console.log(data);
        let arrayName = [];
        let sol = [];
        data.forEach(value=> {
            if (!sol.includes(value.name)) {
                arrayName.push({name:value.name,amount:value.amount});
                sol.push(value.name)
            }
        })
        console.log(arrayName);
        return arrayName
    }
    if(data) {
        let nameTable =  NameCellTable(data);
        let arrayNumber
        return (
            <div>
                {nameTable.map(value => (
                    <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell>{value.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    {
                                        arrayNumber = NumberCellTable(value.amount)
                                    }
                                </TableRow>
                            </TableHead>
                                    <TableBody>
                                            {data.map((row) => (
                                                // <TableRow
                                                //     sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                // >
                                                <Matching data={row} name={value.name}/>
                                                // </TableRow>
                                            ))}
                                    </TableBody>
                        </Table>
                    </TableContainer>
                ))}

            </div>
        );
    }
};

export default StudentMags;