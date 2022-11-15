import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Avatar, Button, TextField} from "@mui/material";
import {useHttp} from "../hooks/http.hook";

import '../css/index.css'
import {useMessage} from "../hooks/message.hook";





const TeacherList = ({teacher,setData}) => {
    const {request,loading,error}=useHttp();
    const [isTake,SetIsTake] =useState(false);
    const message = useMessage();
    const GetTeacher = (id,name,login)=>{
        SetIsTake(true);
        setForm({username:name,id:id,login:login,parm:'update'})
        console.log(form);
    }
    const [form,setForm] = useState({
        username:'',parm:'add',id:'',login:''
    });
    const ChangeHandler = event =>{
        setForm({...form,[event.target.name]:[event.target.value]})
    };
    const DeleteTeacher = async(id)=>{
        try {
            const data=JSON.stringify(await request('/api/admin/teacher/'+id, 'DELETE'));
            setData(data);
        }catch (e) {
            message(e.message,'error');
        }
    }
    const OnClickButton = async()=>{
        try{
            const {username,login,parm,id}=form;
            if(username===''||login===''){
                message('заполните все поля','error')
            }else{
            const body={'name':username,'login':login,'parm':parm,'id':id}
            const data = JSON.stringify(await request('/api/admin/teacher','POST',body));
            console.log('data:',data);
            setData(data);
            SetIsTake(false);
            setForm({username:'',login:'',parm:'add'})
            }
        }
        catch (e){
            message(e,error);
        };
    }


    if(teacher){
    const data = JSON.parse(teacher);
    return (
        <div className='divStyle'>
            <div className='divStyleCell'>
            <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Login</TableCell>
                            <TableCell align="right">description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) =>(
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.login}</TableCell>
                                <TableCell align="right">{row.role}</TableCell>
                                <TableCell align="right"><Button onClick={event=>GetTeacher(row.id,row.name,row.login)}>update</Button></TableCell>
                                <TableCell align="right"><Button onClick={event=>DeleteTeacher(row.id)}>delete</Button></TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                </Table>
            </TableContainer>
            </div>
            <div className="divStyleCell">
                {!isTake ?
            <Paper elevation={10} className='paperStyle' align='center' sx={{ maxHeight: '50%', maxWidth: '50%'}}>
                <Avatar src="/broken-image.jpg"  sx={{ bgcolor: "blue" }} />
                <TextField variant="standard" name='username' label='Username' defaultValue='' placeholder='Username'  fullWidth required
                           onChange={ChangeHandler}/>
                <TextField variant="standard" name='login' label='Login' placeholder='Login' defaultValue='' fullWidth required
                           onChange={ChangeHandler}/>
                <Button  variant="contained" type='submit' color='primary' fullWidth className='buttonStyle' onClick={OnClickButton}>ADD</Button>
            </Paper>:
                    <Paper elevation={10} className="paperStyle" align='center' sx={{ maxHeight: '50%', maxWidth: '50%'}}>
                        <Avatar src="/broken-image.jpg"  sx={{ bgcolor: "blue" }} />
                        <TextField variant="standard" name='username' value={form.username}   fullWidth required
                                   onChange={ChangeHandler}/>
                        <TextField variant="standard" name='login'  value={form.login}  fullWidth required
                                   onChange={ChangeHandler}/>
                        <Button  variant="contained" type='submit' color='primary' fullWidth className='buttonStyle' onClick={OnClickButton}>Update</Button>
                    </Paper>
                }
        </div>
        </div>
    );
    }
};

export default TeacherList;