import React, {useEffect, useState} from 'react';
import {Avatar, Button, Grid, Paper, TextField} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {green} from "@mui/material/colors";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, STUDENT_ROUTE, TEACHER_ROUTE} from "../../untils/consts";


const Index = () => {
    const [form,setForm] = useState({
        password:'',password2:''
    })
    const message = useMessage();
    const {request,loading,error}=useHttp();
    const navigate = useNavigate();
    const OnClickButton = async()=>{
        try{
            const {password,password2}=form;
            if(password===''||password2===''){
                message('заполните все поля','error')
            }else{
                const data = await request('/api/updatepassword','POST',{...form});
                console.log('info:',data.message);
                if(data.message==='ok'){
                    if(data.role==='admin'){
                        navigate(ADMIN_ROUTE);
                        message('ok','success');
                    }
                    else if(data.role==='teacher'){
                        navigate(TEACHER_ROUTE);
                        message('ok','success');
                    }
                    else if(data.role==='student'){
                        navigate(STUDENT_ROUTE);
                        message('ok','success');
                    }
                    else{
                       message('no role','error');
                    }
                }
                else{
                    message(data.message,'error');
                }
            }
    }
        catch (e){
            console.log(e.message);
        };
    }

    const ChangeHandler = event =>{
        setForm({...form,[event.target.name]:[event.target.value]})
    };
    useEffect(()=>{
        message(error);
    },[error,message]);


    const paperStyle={padding:20,height:"70hv",width:280,margin:"20px,auto"}
    const avatarStyle={backgroundColor:green}
    const buttonStyle={margin:"40px 0px 0px 0px"}
    return (
        <Grid align='center'>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Update Password</h2>
                </Grid>
                <TextField variant="standard" name='password2' label='Password' placeholder='Password' type='password' fullWidth required onChange={ChangeHandler}/>
                <TextField variant="standard" name='password' label='Password' placeholder='Password' type='password' fullWidth required onChange={ChangeHandler}/>
                <Button  variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} disabled={loading} onClick={OnClickButton}>Change password</Button>
            </Paper>
        </Grid>
    );
}

export default Index;