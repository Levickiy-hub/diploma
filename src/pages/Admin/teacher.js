import React, {useCallback, useEffect, useState} from 'react';
import Navbar from './navbar'
import {useHttp} from "../../hooks/http.hook";
import Loading from "../../components/loading";
import TeacherList from "../../components/TeacherList";
const Teacher = () => {
    let {request,loading,error}=useHttp();
    const [teacher,setTeacher] = useState(null);
    const getTeacher = useCallback( async()=>{
        try{
            const data = await request('/api/admin/teacher','GET',null,{});
            console.log('data:',data);
            setTeacher(JSON.stringify(data));
        }
        catch (e){alert(e.message.toString())};
    },[request,setTeacher]);

    useEffect( ()=>{
         getTeacher();
    },[getTeacher])

    if(loading){
        return (<Loading/>)
    }

    return (
        <>
            {!error && <Navbar/>}
            {!loading && teacher  && <TeacherList teacher={teacher} setData={setTeacher}/>}
        </>
    );
};

export default Teacher;