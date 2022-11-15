import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import Navbar from "./navbar";
import Loading from "../../components/loading";
import LessonsList from "../../components/LessonsList";

const Lessons = () => {
    let {request,loading,error}=useHttp();
    const [lessons,setLessons] = useState(null);
    const getLessons = useCallback( async()=>{
        try{
            const data = await request('/api/admin/lesson','GET',null,{});
            console.log('data:',data);
            setLessons(JSON.stringify(data));
        }
        catch (e){alert(e.message.toString())};
    },[request,setLessons]);
    useEffect( ()=>{
         getLessons();
    },[getLessons])
    if(loading){
        return (<Loading/>)
    }

    return (
        <>
            {!error && <Navbar/>}
            {!loading && lessons  && <LessonsList lessons={lessons} setData={setLessons}/>}
        </>
    );
};

export default Lessons;