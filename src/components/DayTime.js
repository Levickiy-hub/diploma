import React, {useCallback, useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem, Radio,
    RadioGroup,
    Select,
    TableBody
} from "@mui/material";
import '../css/index.css'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";


const DayTime =({data,day,time,setData}) => {
    const message= useMessage();
    const {request}=useHttp();
    const [form,setForm] = useState({
        day:'',time:''
    });
    const [week,setWeek] = useState(null);
        const handleChangeDay = value =>{
        setForm({...form,'day':value})
        console.log(value);
    };
    const handleChangeTime = value =>{
        setForm({...form,'time':value})
        console.log(value);
    };
    const handleChangeWeek = (event) => {
        setWeek(event.target.value);
    };
    const OnClickButtonAdd = async (id) => {
        try {
            const {day,time}=form;
            if(day ===''||time ===''){
                message('заполните все поля','error')
            }else{
                 const body={'day':day,'time':time,'week':week}
                const data = JSON.stringify(await request('/api/admin/schedule/'+id+'/datetime', 'POST', body));
                setData(data);
                // message('данное уже занято','error')
            } }catch (e) {
            message(e.message,'error');
        }
    };
    if(data){
    return (
        <div className={'divStyle'}>
            {/*<div>*/}
            {/*    <Box sx={{ minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>*/}
            {/*        <FormControl fullWidth>*/}
            {/*            <InputLabel id="demo-simple-select-label">{data.day}</InputLabel>*/}
            {/*            <Select*/}
            {/*                labelId="demo-simple-select-label"*/}
            {/*                id="demo-simple-select"*/}
            {/*                //value={data.day}*/}
            {/*                onChange={(e)=>handleChangeTime(e.target.value)}*/}
            {/*            >*/}
            {/*                {day.map((row) =>(*/}
            {/*                    <MenuItem value={row.id}>{row.day}</MenuItem>*/}
            {/*                ))}*/}
            {/*            </Select>*/}
            {/*        </FormControl>*/}
            {/*    </Box>*/}
            {/*    <Box sx={{ minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>*/}
            {/*        <FormControl fullWidth>*/}
            {/*            <InputLabel id="demo-simple-select-label">{data.time_start+' - '+data.time_end}</InputLabel>*/}
            {/*            <Select*/}
            {/*                labelId="demo-simple-select-label"*/}
            {/*                id="demo-simple-select"*/}
            {/*                // value={data.time_start+' - '+data.time_end}*/}
            {/*                onChange={(e)=>handleChangeDay(e.target.value)}*/}
            {/*            >*/}
            {/*                {time.map((row) =>(*/}
            {/*                    <MenuItem value={row.id}>{row.time_start+' - '+ row.time_end}</MenuItem>*/}
            {/*                ))}*/}
            {/*            </Select>*/}
            {/*        </FormControl>*/}
            {/*    </Box>*/}
            {/*    <Button>update</Button>*/}
            {/*    <div className="divStyleCell">*/}
            {/*        <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>*/}
            {/*            <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
            {/*                <TableHead>*/}
            {/*                    <TableRow>*/}
            {/*                        <TableCell>{data.teacher}</TableCell>*/}
            {/*                    </TableRow>*/}
            {/*                </TableHead>*/}
            {/*                <TableBody>*/}
            {/*                    {data.dateTeacher}*/}
            {/*                </TableBody>*/}
            {/*            </Table>*/}
            {/*        </TableContainer>*/}
            {/*    </div>*/}
            {/*    <div className="divStyleCell">*/}
            {/*        <TableContainer  component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%'}}>*/}
            {/*            <Table sx={{ minWidth: 400 }} aria-label="simple table">*/}
            {/*                <TableHead>*/}
            {/*                    <TableRow>*/}
            {/*                        <TableCell>{data.course}-{data.number}-{data.subgroup}</TableCell>*/}
            {/*                    </TableRow>*/}
            {/*                </TableHead>*/}
            {/*            </Table>*/}
            {/*        </TableContainer>*/}
            {/*    </div>*/}
            {/*/!*</div>*!/*/}
            <div className='divDayTime'>
                <div>
                    <Box sx={{ minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">day</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.day}
                                onChange={(e)=>handleChangeDay(e.target.value)}
                            >
                                {day.map((row) =>(
                                    <MenuItem value={row.id}>{row.day}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, maxWidth:120,margin: '10px',position:'right'}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">time</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={data.time_start+' - '+data.time_end}
                                onChange={(e)=>handleChangeTime(e.target.value)}
                            >
                                {time.map((row) =>(
                                    <MenuItem value={row.id}>{row.time_start+' - '+ row.time_end}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Week</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="null"
                            name="radio-buttons-group"
                            value={week}
                            onChange={handleChangeWeek}
                        >
                            <FormControlLabel value="null" control={<Radio />} label="Weekly" />
                            <FormControlLabel value="1" control={<Radio />} label="First week" />
                            <FormControlLabel value="0" control={<Radio />} label="Second week" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <Button onClick={event => OnClickButtonAdd(data.id)}>add</Button>
            </div>
        </div>
    );
    }
};

export default DayTime;