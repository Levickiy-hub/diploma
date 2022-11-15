import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import Navbar from "./navbar";
import Loading from "../../components/loading";
import ScheduleList from "../../components/ScheduleList";

const Schedule = () => {
    let {request,loading,error}=useHttp();
    const [schedule,setSchedule] = useState(null);
    const getSchedule = useCallback( async()=>{
        try{
            const data = await request('/api/admin/schedule','GET',null,{});
            console.log('data:',data);
            setSchedule(JSON.stringify(data));
        }
        catch (e){alert(e.message.toString())};
    },[request,setSchedule]);

    useEffect( ()=>{
         getSchedule();
    },[getSchedule])

    if(loading){
        return (<Loading/>)
    }

    return (
        <>
            {!error&&<Navbar/>}
            {!loading && schedule  && <ScheduleList schedule={schedule} setData={setSchedule}/>}
        </>
    );
};

export default Schedule;