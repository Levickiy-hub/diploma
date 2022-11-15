import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import React, {useState} from "react";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Avatar, Button, TextField} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";



const LessonsList = ({lessons,setData})=>{
    const {request,loading,error}=useHttp();
    const message = useMessage();
    const [isTake,SetIsTake] =useState(false)
    const [form,setForm] = useState({
        name:'',parm:'add',number:'',course:'', id:''
    });
    const ChangeHandler = event =>{
        setForm({...form,[event.target.name]:[event.target.value]})
    };
    const GetLesson = (id,name,course,number)=>{
        SetIsTake(true);
        setForm({name:name,id:id,course:course,number:number,parm:'update'})
        console.log(form);
    }
    const DeleteLesson = async(id)=>{
        try {
           const data = JSON.stringify(await request('/api/admin/lesson/'+id, 'DELETE'));
           setData(data);
        }catch (e) {
            alert(e.message);
        }
    }
    const OnClickButton = async()=>{
        try{
            const {name,number,parm,id,course}=form;
            if(name===''|| number===''||course===''){
                message('заполните все поля','error')
            }
            else{
                const body={'name':name,'number':number,'parm':parm,'id':id,'course':course}
                const data= JSON.stringify(await request('/api/admin/lesson','POST',body));
                setData(data);
                SetIsTake(false);
                setForm({ name:'',parm:'add',number:'',course:'', id:''});
        }}
        catch (e){
            console.log(e.message);
        };
    }
    if(lessons){
        const data = JSON.parse(lessons);
        return(
            <div className="divStyle">
                <div className="divStyleCell">
                    <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">course</TableCell>
                                    <TableCell align="right">number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { data.map((row)=>(
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.course}</TableCell>
                                        <TableCell align="right">{row.number}</TableCell>
                                        <TableCell align="right"><Button onClick={event=>GetLesson(row.id,row.name,row.course,row.number)}>update</Button></TableCell>
                                        <TableCell align="right"><Button onClick={event=>DeleteLesson(row.id)}>delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='divStyleCell'>
                    {!isTake ?
                        <Paper elevation={10} className="paperStyle" align='center' sx={{ maxHeight: '50%', maxWidth: '50%'}}>
                        <Avatar sx={{ bgcolor: 'blue' }}>
                            <AssignmentIcon />
                        </Avatar>
                        <TextField variant="standard" name='name' label='Name' placeholder='name' defaultValue='' fullWidth required
                                   onChange={ChangeHandler}
                        />
                        <TextField variant="standard" name='course' label='Course' placeholder='Course' defaultValue=''  fullWidth required
                                   onChange={ChangeHandler}
                        />
                        <TextField variant="standard" name='number' label='Number' placeholder='Number' defaultValue='' fullWidth required
                                   onChange={ChangeHandler}
                        />
                            <div style={{padding:'10px'}}>
                        <Button  variant="contained" type='submit' color='primary' fullWidth className="buttonStyle" onClick={OnClickButton}>ADD</Button>
                            </div>
                    </Paper>:
                        <Paper elevation={10} className="paperStyle" align='center' sx={{ maxHeight: '50%', maxWidth: '50%'}}>
                            <Avatar sx={{ bgcolor: 'blue' }}>
                                <AssignmentIcon />
                            </Avatar>
                            <TextField variant="standard" name='name' fullWidth required
                                       onChange={ChangeHandler} value={form.name}
                            />
                            <TextField variant="standard" name='course'  fullWidth required
                                       onChange={ChangeHandler} value={form.course}
                            />
                            <TextField variant="standard" name='number'  fullWidth required
                                       onChange={ChangeHandler} value={form.number}
                            />
                                <Button  variant="contained" type='submit' color='primary' fullWidth className="buttonStyle" onClick={OnClickButton}>Update</Button>
                        </Paper>}
                </div>
            </div>
        )
    }

}

export default LessonsList;