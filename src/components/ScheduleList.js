import React, {useCallback, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useHttp} from "../hooks/http.hook";
import '../css/index.css'
import {useMessage} from "../hooks/message.hook";
import Modal from "../modal/Modal";
import DayTime from "./DayTime";





const ScheduleList = ({schedule,setData}) => {
    const [isTake,SetIsTake] =useState(false);
    const [active,setActive] = useState(false);
    const [activeData,setActiveData]= useState({})
    const [form,setForm] = useState({
        name:'',parm:'add',number:'',course:'', id:'',subgroup:'',teacher:''
    });
    const message= useMessage();
    const {request,loading}=useHttp();
    const [dateTime,setDateTime]=useState(null)

    // const getDateTime = useCallback( async(gid,tid)=>{
    //     try{
    //         const data = await request('/api/admin/datetime/'+gid+'/'+tid,'GET',null,{});
    //         console.log('data:',data);
    //         setDateTime(JSON.stringify(data));
    //     }
    //     catch (e){alert(e.message.toString())};
    // },[request,setDateTime]);

    const ModalActive = async (id,groupId, course,number,subgroup,teacherId,teacher)=>{
        // await getDateTime(groupId,teacherId);
        // const dateTeacher = dateTime.teacher;
        // const dateGroup = dateTime.group;
        setActiveData({id:id,course:course,number:number,subgroup:subgroup,teacher:teacher
            //, dateGroup:dateGroup,dateTeacher:dateTeacher
        });
        setActive(true);
    }
    const GetSchedule = (id,name,course,number,subgroup,teacher)=>{
        SetIsTake(true);
        setForm({name:name,id:id,course:course,number:number,parm:'update',subgroup: subgroup,teacher:teacher})
        console.log(form);
    };
    const handleChangeGroup = value =>{
        setForm({...form,'group':value})
        console.log(value);
    };
    const handleChangeTeacher = value =>{
        setForm({...form,'teacher':value})
        console.log(value);
    };
    const handleChangeLesson = value =>{
        setForm({...form,'lesson':value})
        console.log(value);
    };
    const DeleteSchedule = async(id,dtid)=>{
        try {
            const data = JSON.stringify(await request('/api/admin/schedule/'+id+'/'+dtid, 'DELETE'));
            setData(data);
        }catch (e) {
            alert(e.message);
        }
    };
    const OnClickButton = async () => {
        try {
            const {teacher,lesson,parm,id,group}=form;
            if(teacher ===''||lesson ===''||group ===''){
                message('заполните все поля','error')
            }else{
            const body={'teacher':teacher,'lesson':lesson,'parm':parm,'id':id,'group':group}
            const data = JSON.stringify(await request('/api/admin/schedule', 'POST', body));
            console.log('data:', data);
            setData(data);
        } }catch (e) {
            message(e.message);
        }
    };
    if(schedule){
        const data = JSON.parse(schedule);
        const lessons = data.lessons;
        const teachers = data.teachers;
        const days = data.days;
        const times = data.times;
         schedule = data.schedule;
         console.log(schedule);
        const groups = data.groups;
        return (
            <div className="divStyle">
                <div className="divStyleCell">
                    <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Teacher</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Course</TableCell>
                                    <TableCell align="right">Number</TableCell>
                                    <TableCell align="right">Subgroup</TableCell>
                                    <TableCell align="right">Day - Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {schedule.map((row) =>(
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.teacher}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.course}</TableCell>
                                        <TableCell align="right">{row.number}</TableCell>
                                        <TableCell align="right">{row.subgroup}</TableCell>
                                        <TableCell align="right"><Button onClick={event =>ModalActive(row.id,row.gid,row.course,row.number,row.subgroup,row.uid,row.teacher)}>
                                            {row.day ? row.day + ' ' + row.time_start + '-' + row.time_end+' ':'Time'}
                                            {row.day && row.week===null ? 'weekly ':''}
                                            {row.week!==null && row.week===true ? 'first week':''}
                                            {row.week!==null && row.week===false ? 'second week':''}
                                        </Button></TableCell>
                                        <TableCell align="right"><Button onClick={event=>GetSchedule(row.id,row.name,row.course,row.number,row.subgroup, row.teacher)}>update</Button></TableCell>
                                        <TableCell align="right"><Button onClick={event=>DeleteSchedule(row.id, row.dtid)}>delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="divStyleCell">
                    {!isTake ?
                        <Paper elevation={10} className="paperStyle" style={{minWidth:"initial"}} align='center' sx={{ maxHeight: '50%', maxWidth: '50%'}}>
                            <Avatar src="/broken-image.jpg"  sx={{ bgcolor: "blue" }} />
                            <div className="divStyle">
                                <Box sx={{ flexWrap: 'wrap' }}>
                                <Box component='div' sx={{minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">teacher</InputLabel>
                                          <Select
                                             labelId="demo-simple-select-label"
                                             id="demo-simple-select"
                                             onChange={(e)=>handleChangeTeacher(e.target.value)}
                                          >
                                          {teachers.map((row) =>(
                                             <MenuItem value={row.id}>{row.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box component='div' sx={{minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">lessons</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e)=>handleChangeLesson(e.target.value)}
                                                >
                                                    {lessons.map((row) =>(
                                                        <MenuItem value={row.id}>{row.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box component='div' sx={{minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">course/number/subgroup</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e)=>handleChangeGroup(e.target.value)}
                                                >
                                                    {groups.map((row) =>(
                                                        <MenuItem value={row.id}>{row.course}/{row.number}/{row.subgroup}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                </Box>
                            </div>
                            <Button  variant="contained" type='submit' color='primary' fullWidth className="buttonStyle" onClick={OnClickButton}>ADD</Button>
                        </Paper>:
                            <Paper elevation={10} className="paperStyle" style={{minWidth:"initial"}} align='center' sx={{ maxHeight: '50%', maxWidth: '50%'}}>
                                <Avatar src="/broken-image.jpg"  sx={{ bgcolor: "blue" }} />
                                <div className="divStyle">
                                    <Box sx={{ flexWrap: 'wrap' }}>
                                        <Box component='div' sx={{ minWidth: 120, maxWidth:120,margin: '10px'}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{form.teacher}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={form.teacher}
                                                    onChange={(e)=>handleChangeTeacher(e.target.value)}
                                                >
                                                    {teachers.map((row) =>(
                                                        <MenuItem value={row.id}>{row.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box component='div' sx={{ minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{form.name}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={form.lesson}
                                                    onChange={(e)=>handleChangeLesson(e.target.value)}
                                                >
                                                    {lessons.map((row) =>(
                                                        <MenuItem value={row.id}>{row.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box component='div' sx={{ minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{form.course}/{form.number}/{form.subgroup}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={(e)=>handleChangeGroup(e.target.value)}
                                                >
                                                    {groups.map((row) =>(
                                                        <MenuItem value={row.id}>{row.course}/{row.number}/{row.subgroup}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                </div>
                                <Button  variant="contained" type='submit' color='primary' fullWidth className="buttonStyle" onClick={OnClickButton}>update</Button>
                        </Paper>
                    }
                </div>
                <Modal active={active} setActive={setActive} content={<DayTime day={days} time={times} data={activeData} setData={setData}/>}/>
            </div>
        );
    }
};

export default ScheduleList;