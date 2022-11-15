import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Modal from "../modal/Modal"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import '../css/index.css'
import StudentMags from "./StudentMags";

const StudentsList = ({students,setData}) => {
    const {request,loading}=useHttp();
    const [isTake,setIsTake] = useState(false);
    const [active,setActive]=useState(false);
    const message = useMessage();
    const [form, setForm] = useState({
        username: '',group:'', parm:'add',name:'',login:''
    })
    const [activeContent,setActiveContent]=useState(null);
    const ModalActive=async(id)=>{
        const data = await request('/api/admin/student/'+id,'GET');
        setActiveContent(data);
        setActive(true);
    }
    const GetStudent=(id,name,login,course,group,subgroup)=>{
        setIsTake(true);
        setForm({username:name,id:id,login:login,parm:'update',number:group,course:course,subgroup:subgroup})
    }
    const DeleteStudent = async(id)=>{
        try {
           const data = JSON.stringify(await request('/api/admin/student/'+id, 'DELETE'));
           setData(data);
        }catch (e) {
            message(e.message,'error');
        }
    }
    const OnClickButton = async () => {
        try {
            const {username,login,parm,id,group}=form;
            if(username==='' ||group==='' ||login===''){
                message('Заполните все поля','error')
            }
            else{
                const body={'name':username,'login':login,'parm':parm,'id':id,'group':group}
                const data=JSON.stringify(await request('/api/admin/student', 'POST', body));
                setIsTake(false);
                setData(data);
            }
        } catch (e) {
            message(e.message,'error');
        }
    };
    const ChangeHandler = event =>{
        setForm({...form,[event.target.name]:[event.target.value]})
    };
    const handleChangeGroup = value =>{
        setForm({...form,'group':value})
    };
        if (students) {
            const data = JSON.parse(students);
            const user = data.students;
            const groups = data.groups;
            return (
                <div>
                     <div className="divStyle">
                         <div className="divStyleCell">
                             <TableContainer component={Paper} sx={{maxHeight: '100%', maxWidth: '100%'}}>
                                 <Table sx={{minWidth: 650}} aria-label="simple table">
                                     <TableHead>
                                         <TableRow>
                                             <TableCell>Name</TableCell>
                                             <TableCell align="right">Login</TableCell>
                                             <TableCell align="right">Group</TableCell>
                                             <TableCell align="right">description</TableCell>
                                         </TableRow>
                                     </TableHead>
                                     <TableBody>
                                         {user.map((row) => (
                                             <TableRow
                                                 sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                             >
                                                 <TableCell component="th" scope="row">
                                                     {row.name}
                                                 </TableCell>
                                                 <TableCell align="right">{row.login}</TableCell>
                                                 <TableCell align="right">
                                                     {row.course}-{row.number}-{row.subgroup}
                                                 </TableCell>
                                                 <TableCell align="right"><Button onClick={event=>ModalActive(row.id)}>{row.role}</Button></TableCell>
                                                 <TableCell align="right">
                                                     <Button onClick={event=>GetStudent(row.id,row.name,row.login,row.course,row.number,row.subgroup)}>
                                                         update
                                                     </Button>
                                                     <Button onClick={event=>DeleteStudent(row.id)}>
                                                         delete
                                                     </Button>
                                                 </TableCell>
                                             </TableRow>
                                         ))}
                                     </TableBody>
                                 </Table>
                             </TableContainer>
                         </div>
                         <div className="divStyleCell">
                             {!isTake ?
                             <Paper elevation={10} className="paperStyle" align='center'
                                    sx={{maxHeight: '50%', maxWidth: '50%'}}>
                                 <Avatar src="/broken-image.jpg" sx={{bgcolor: "blue"}}/>
                                 <TextField variant="standard" name='username' label='Username' defaultValue='' placeholder='Username'
                                            fullWidth onChange={ChangeHandler} required/>
                                 <TextField variant="standard" name='login' label='Login' placeholder='Login' defaultValue='' fullWidth
                                            onChange={ChangeHandler} required/>
                                 <Box sx={{minWidth: 120, maxWidth: 200, margin: '10px', position: 'right'}}>
                                     <FormControl fullWidth>
                                         <InputLabel id="demo-simple-select-label">course/number/subgroup</InputLabel>
                                         <Select
                                             labelId="demo-simple-select-label"
                                             id="demo-simple-select"
                                              defaultValue=''
                                              label="group"
                                             onChange={(e)=>handleChangeGroup(e.target.value)}
                                         >
                                             {groups.map((row) => (
                                                 <MenuItem name='group' value={row.id}>
                                                     {row.course}/{row.number}/{row.subgroup}
                                                 </MenuItem>
                                             ))}
                                         </Select>
                                     </FormControl>
                                 </Box>
                                 <Button variant="contained" type='submit' color='primary' fullWidth className="buttonStyle"
                                         disabled={loading} onClick={OnClickButton}>ADD</Button>
                             </Paper>:
                                 <Paper elevation={10} className="paperStyle" align='center'
                                        sx={{maxHeight: '50%', maxWidth: '50%'}}>
                                     <Avatar src="/broken-image.jpg" sx={{bgcolor: "blue"}}/>
                                     <TextField variant="standard"  name='username' value={form.username}
                                                fullWidth onChange={ChangeHandler} required/>
                                     <TextField variant="standard" name='login' fullWidth value={form.login}
                                                onChange={ChangeHandler} required/>
                                     <Box sx={{minWidth: 120, maxWidth: 200, margin: '10px', position: 'right'}}>
                                         <FormControl fullWidth>
                                             <InputLabel id="demo-simple-select-label">{form.course}/{form.number}/{form.subgroup}</InputLabel>
                                             <Select
                                                 labelId="demo-simple-select-label"
                                                 id="demo-simple-select"
                                                 value={form.group}
                                                 label="group"
                                                 onChange={(e)=>handleChangeGroup(e.target.value)}

                                             >
                                                 {groups.map((row) => (
                                                     <MenuItem name='group' value={row.id}>{row.course}/{row.number}/{row.subgroup}</MenuItem>
                                                 ))}
                                             </Select>
                                         </FormControl>
                                     </Box>
                                         <Button variant="contained" type='submit' color='primary' fullWidth className="buttonStyle"
                                                 name='parm' value='add'
                                                 disabled={loading} onClick={OnClickButton}>Update</Button>
                                 </Paper>}
                         </div>
                     </div>
                    <Modal active={active} setActive={setActive} content={activeContent&&<StudentMags data={activeContent}/>}/>
                </div>
            );
        }
    }

export default StudentsList;