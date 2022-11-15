import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import Navbar from "./navbar";
import Loading from "../../components/loading";
import StudentsList from "../../components/StudentsList";

const Student = () => {
    const {request,loading,error}=useHttp();
    const [student,setStudent] = useState(null);
    const getStudent = useCallback( async()=>{
        try{
            const data = await request('/api/admin/student','GET');
            console.log('data:',data);
            setStudent(JSON.stringify(data));
        }
        catch (e){alert(e.message.toString())};
    },[request,setStudent]);

    useEffect( ()=>{
        getStudent();
    },[getStudent])

    if(loading){
        return (<Loading/>)
    }

    return (
        <div>
            {!error &&<Navbar/>}
            {!loading && student  && <StudentsList students={student} setData={setStudent}/>}
        </div>
    );
};

export default Student;