import {useCallback, useContext} from "react";
import {ADMIN_ROUTE, STUDENT_ROUTE, TEACHER_ROUTE, UPDATEPASSWORD_ROUTE} from "../untils/consts";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";



export const authHook= ()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useContext(Context)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
// eslint-disable-next-line react-hooks/rules-of-hooks
    const saveUser = useCallback((data,message='')=>{
        if (data && data.message !== 'noAutorized') {
            localStorage.setItem('userid', data.id);
            localStorage.setItem('username', data.name)
            localStorage.setItem('userrole', data.role);
            user.setUser(user);
            user.setIsAuth(true);
            if(message==='updatePassword'){
                navigate(UPDATEPASSWORD_ROUTE);
            }
            else if (data.role === 'admin') {
                navigate(ADMIN_ROUTE);
            }
            else if (data.role === 'student') {
                navigate(STUDENT_ROUTE);
            }
            else if (data.role === 'teacher') {
                navigate(TEACHER_ROUTE);
            }
        }
    },[navigate,user])
// eslint-disable-next-line react-hooks/rules-of-hooks
    const login = useCallback((data) => {
        console.log(data);
        if(data.message==='updatePassword')
        saveUser(data.user,data.message)
        else saveUser(data);
    },[saveUser])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const logout = useCallback(()=>{
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        localStorage.removeItem('userrole');
    },[])
    return {login,logout}
}