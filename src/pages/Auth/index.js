import React, {useEffect, useState} from 'react';
import {Grid, Paper, Button, TextField, Avatar} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useHttp} from "../../hooks/http.hook";
import {authHook} from "../../hooks/auth.hook";
import {useMessage} from "../../hooks/message.hook";

const Index = () => {
    const paperStyle={padding:20,height:"70hv",width:280,margin:"20px,auto"}
    const buttonStyle={margin:"40px 0px 0px 0px"}
    const [form,setForm] = useState({
        username:'',password:''
    })
    const {request,loading,error}=useHttp();
    const {login}=authHook()
    const message = useMessage();
    const OnClickButton = async()=>{
        try{
            const data = await request('/api','POST',{...form});
            console.log('data:',data);
            login(data);
        }
        catch (e){
            console.log(e.message);
        }
    }
    useEffect(()=>{
        message(error);
    },[error,message]);

    const ChangeHandler = event =>{
        setForm({...form,[event.target.name]:[event.target.value]})
    };
    return (
        <Grid align='center'>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar><LockOutlinedIcon/></Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <TextField variant="standard" name='username' label='Username' placeholder='Username' fullWidth required onChange={ChangeHandler}/>
                <TextField variant="standard" name='password' label='Password' placeholder='Password' type='password' fullWidth required onChange={ChangeHandler}/>
                <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} disabled={loading} onClick={OnClickButton}>Sign in</Button>
            </Paper>
        </Grid>
    );
};

export default Index;