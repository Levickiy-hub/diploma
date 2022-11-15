import React, {useCallback, useEffect, useState} from 'react';
import Navbar from '../Teacher/navbar';
import {useHttp} from "../../hooks/http.hook";
import Loading from "../../components/loading";
import TeacherTable from "../../components/TeacherTable"
import {Button} from "@mui/material";

const Index = () => {
    let {request,loading}=useHttp();
    const [courses,setCourses] = useState(null);
    const [lessons,setLessons] = useState(null);
    const [nameSubject,setNameSubject] = useState('');
    const [mag,setMag] = useState(null);
    const getCourses = useCallback( async()=>{
        try{
            const data = await request('/api/teacher','GET');
            console.log('data:',data);
            setCourses(data);
        }
        catch (e){alert(e.message.toString())};
    },[request,setCourses]);
    const OnClickButtonLess = useCallback( async(lessonid,number,group, name,subgroup,num)=>{
        try{
            const body ={lessonid:lessonid,number:number,group:group};
            setNameSubject(name+' '+subgroup+'/'+num);
            const data = await request('/api/teacher/lesson','POST',body);
            console.log('data:',data);
            setMag(data);
        }
        catch (e){alert(e.message.toString())};
    },[request,setMag]);

    const OnClickButton= useCallback( async(course)=>{
        try{
            const body ={course:course};
            console.log(body);
            const data = await request('/api/teacher','POST',body);
            console.log('data:',data);
            const {lessons}=data;
            setLessons(lessons);
        }
        catch (e){alert(e.message.toString())};
    },[request,setLessons]);
    useEffect(()=>{
        getCourses();
    },[getCourses])

    if(loading){
        return (<Loading/>)
    }
    return (
        <div>
            <Navbar/>
            {!loading && courses && courses.map((row)=>
                <Button variant="contained"
                        onClick={event=>OnClickButton(row.id)}>{row.course}
                </Button>
            )}
            <br/>
            {!loading && lessons && lessons.map((row)=>
                <Button variant="contained"
                    onClick={event => OnClickButtonLess(row.id,row.col,row.group,row.name,row.number,row.subgroup)}>{row.name} {row.number}/{row.subgroup}</Button>
            )}
            <br/>
            {!loading && mag && <TeacherTable data={mag} setData={setMag} name={nameSubject}/>}
        </div>
    );
};

export default Index;