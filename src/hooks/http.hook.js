import {useCallback, useState} from 'react'
export const useHttp=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const request=useCallback(async(url,method='GET',body=null,headers={'Content-Type': 'application/json'})=>{
        try{
            setLoading(true);
            let response;
            console.log(method);
            if(method==='POST')
                response=await fetch(url,{method,headers,body: JSON.stringify(body)});
            else if(method==='DELETE')
                response=await fetch(url,{method,headers});
            else if(method==='GET')
                response=await fetch(url,{method,headers});
            if(!response.ok){
                if(response.status===403) {
                    window.location.replace("../auth");
                    throw new Error('недостаточно прав');
                }
                else throw new Error(response.message||'ERROR')
            }
            else if(response.status===204){
                setLoading(false);
                return null;
            }

            const data = await response.json();
            setLoading(false);
            return data;
        }
        catch (e) {
            setError(e.message)
            setLoading(false);
            throw e;
        }
    },[])
    return{request,loading,error}
}