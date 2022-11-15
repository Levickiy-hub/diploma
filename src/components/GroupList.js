import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {useHttp} from "../hooks/http.hook";
import {Avatar, Button, TextField} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import '../css/index.css'
import {useMessage} from "../hooks/message.hook";


const GroupList = ({groups,setData}) => {
    const {request, loading} = useHttp(), [isTake, SetIsTake] = useState(false), [form, setForm] = useState({
        subgroup: '', number: '', course: ''
    })
    const message= useMessage();
    const [students,setStudents] = useState(null);
    const ChangeHandler = event => {
        setForm({...form, [event.target.name]: [event.target.value]})
    };
    const GetGroup = async (id, course, number, subgroup) => {
            setForm({course: course, number: number, subgroup: subgroup})
            const data = await request('/api/admin/group/'+id+'/students', 'GET');
            console.log(data);
            setStudents(data);
            SetIsTake(true);
    };
    const DeleteGroup = async(id)=>{
        try {
            const data=JSON.stringify(await request('/api/admin/group/'+id, 'DELETE'));
            setData(data);
        }catch (e) {
            alert(e.message);
        }
    }
    const OnClickButton = async () => {
        try {
            let subgroup, number,  id, course;
            ({subgroup, number,  id, course} = form);
            if (subgroup === '' || number === '' || course === '') {
                message('заполните все поля')
            } else {
                const body = {'subgroup': subgroup, 'number': number, 'id': id, 'course': course}
                const data = JSON.stringify(await request('/api/admin/group', 'POST', body));
                console.log('data:', data);
                setData(data);
                SetIsTake(false);
                setForm({subgroup: '',  number: '', course: '', id: ''})
            }
        } catch (e) {
            console.log(e.message);
        };
    };
    if (groups) {
        const data = JSON.parse(groups);
        console.log(data);
        return (
            <div className="divStyle">
                <div className={"divStyleCell"}>
                    <TableContainer component={Paper} sx={{maxHeight: '100%', maxWidth: '100%'}}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>course</TableCell>
                                    <TableCell align="right">number</TableCell>
                                    <TableCell align="right">subgroup</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">{row.course}</TableCell>
                                        <TableCell align="right">{row.number}</TableCell>
                                        <TableCell align="right">{row.subgroup}</TableCell>
                                        <TableCell align="right"><Button
                                            onClick={event => GetGroup(row.id, row.course, row.number, row.subgroup)}>select</Button></TableCell>
                                        <TableCell align="right"><Button onClick={event=>DeleteGroup(row.id)}>delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="divStyleCell" >
                    <Paper elevation={10} className="paperStyle" align='center' sx={{ maxHeight: '100%', maxWidth: '50%'}}>
                    <Avatar sx={{ bgcolor: 'blue' }}>
                        <AssignmentIcon />
                    </Avatar>
                    {!isTake ?
                        <div>
                            <TextField variant="standard" name='course' label='Course' defaultValue='' placeholder='Course' fullWidth required
                                       onChange={ChangeHandler}
                            />
                            <TextField variant="standard" name='number' label='Number' defaultValue='' placeholder='Number' fullWidth required
                                       onChange={ChangeHandler}
                            />
                            <TextField variant="standard" name='subgroup' label='Subgroup' defaultValue='' placeholder='Subgroup' fullWidth required
                                       onChange={ChangeHandler}
                            />
                            <Button  variant="contained" type='submit' color='primary' fullWidth className="buttonStyle" onClick={OnClickButton}>ADD</Button>
                        </div>:
                        <div>
                          <h2>{form.course}-{form.number}-{form.subgroup}</h2>
                            <TableContainer component={Paper} sx={{maxHeight: '100%', maxWidth: '100%'}}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Login</TableCell>
                                            <TableCell align="right">description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students.map((row) => (
                                            <TableRow
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                                <TableCell align="right">{row.login}</TableCell>
                                                <TableCell align="right">{row.role}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/*<Button  variant="contained" type='submit' color='primary' fullWidth className="buttonStyle" onClick={OnClickButton}>Update</Button>*/}
                        </div>
                    }
                    </Paper>
                </div>
            </div>
        )
    }
}

export default GroupList;