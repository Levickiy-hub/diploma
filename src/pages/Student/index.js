import React, {useCallback, useEffect, useState} from 'react';
import Navbar from '../Student/navbar'
import {useHttp} from "../../hooks/http.hook";
import Loading from "../../components/loading";
import StudentTable from "../../components/StudentTable";
import {Button} from "@mui/material";


const Index = () => {
    let {request,loading}=useHttp();
    const [lessons,setLessons] = useState(null);
    const [mag,setMag] = useState(null);

    const OnClickButton= useCallback( async(lessons='',value='')=>{
        try{
            const body ={schedule : value,lessonid:lessons};
            console.log(body); 
            const data = await request('api/student','POST',body);
            console.log('data:',data);
            setMag(data);
        }
        catch (e){alert(e.message.toString())};
    },[request,setMag]);

    const getLessons = useCallback( async()=>{
        try{
            const data = await request('api/student','GET');
            console.log('data:',data);
            setLessons(data);
        }
        catch (e){alert(e.message.toString())};
    },[request,setLessons]);

    useEffect(()=>{
        getLessons();
    },[getLessons])

    if(loading){
        return (<Loading/>)
    }


    return (
        <div>
            <Navbar/>
            {!loading && lessons && lessons.map((row)=>
                <Button variant="contained" onClick={event => OnClickButton(row.lessons,row.id)}>{row.name}</Button>
            )}
            {!loading && mag && <StudentTable data={mag}/>}
        </div>
    );
};

export default Index;