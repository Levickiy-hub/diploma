import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TextField} from "@mui/material";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import "../css/teacher.css"

const TeacherTable=({data,setData,name})=>{
    const {request,loading,error}=useHttp();
    const message = useMessage();
    const UpdateRating=async (value='',student,number,id=null)=>{
        try{
            const body = {'rating':value,'student':student,'number':number,'id':id};
            const data = await request('/api/teacher/lessons','POST',body);
            setData(data);
        }
        catch (e) {
            message(e,'error');
        }
    }

    const Matching = (row)=>{
        for(let i=0;i<row.row.length;i++){
            if(row.len.toString()===row.row[i].number.toString() && row.row[i].student===row.student){
                return( <TableCell><TextField variant="standard" defaultValue={row.row[i].rating}  name='rating'  fullWidth required
                                               onBlur={(e)=>UpdateRating(e.target.value,row.student,row.len,
                                                  // row.row[i].schedule,
                                                   row.row[i].id)}
                /></TableCell>)
            }
        }
        return(
        <TableCell>
            <TextField variant="standard" name='rating' fullWidth required
                        onBlur={(e)=> UpdateRating(e.target.value,row.student,row.len
                           // ,row.row[0].schedule
                        )}
            />
        </TableCell>)
    }
    const NumberCellTable=(num)=> {
        let array=[];
        for(let i=1;i<=num;i++){
            array.push(i.toString())
        }
        return array;
    }
    if(data){
        console.log("data",data);
        const {mags,number,students} =data;
        const array = NumberCellTable(number);
        console.log(mags);
return(
    <div>
        <div className='tableCellHead'>{name}</div>
        <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell className="tableCell" component ="th" scope="row">Name/Number</TableCell>
                        {array.map((row) => (
                            <TableCell className="tableCell" component="th" scope="row">
                                {row}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student)=>(
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                          <TableCell className="tableCell">{student.name}</TableCell>
                            {array.map((row) => (
                               <Matching row={mags} len={row} student={student.id}/>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
    }
}

export default TeacherTable;