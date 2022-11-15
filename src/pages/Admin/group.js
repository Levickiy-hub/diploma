import React, {useCallback, useEffect, useState} from 'react';
import Navbar from './navbar'
import {useHttp} from "../../hooks/http.hook";
import Loading from "../../components/loading";
import GroupList from "../../components/GroupList";

const Group = () => {
    let {request,loading,error}=useHttp();
    let [groups,setGroups] = useState(null);
    const getGroups = useCallback( async()=>{
        try{
            const data = await request('/api/admin/group','GET');
            console.log('data:',data);
            setGroups(JSON.stringify(data));
        }
        catch (e){alert(e.message.toString())};
    },[request,setGroups]);
    useEffect(()=>{
         getGroups();
    },[getGroups])

    if(loading){
        return (<Loading/>)
    }

    return (
        <div>
            {!error && <Navbar/>}
            {!loading && groups  && <GroupList groups={groups} setData={setGroups}/>}
        </div>
    );
};

export default Group;