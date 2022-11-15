import React from 'react';
import {Routes,Route,Navigate } from 'react-router-dom'
import {ADMIN_ROUTE, AUTH_ROUTE, STUDENT_ROUTE, TEACHER_ROUTE,UPDATEPASSWORD_ROUTE} from "../untils/consts";
import Auth from '../pages/Auth'
import Admin from '../pages/Admin'
import AStudent from "../pages/Admin/student";
import Group from "../pages/Admin/group"
import ATeacher from "../pages/Admin/teacher";
import Schedule from "../pages/Admin/schedule";
import Lesson from "../pages/Admin/lesson";
import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import UpdatePassword from "../pages/UpdatePassword";


export const AppRouter = () => {
    return (
        <Routes>
            <Route path={ADMIN_ROUTE} element={<Admin/>} exact/>
            <Route path='/admin/student' element={<AStudent/>} exact/>
            <Route path='/admin/groups' element={<Group/>} exact/>
            <Route path='/admin/teacher' element={<ATeacher/>} exact/>
            <Route path='/admin/schedules' element={<Schedule/>} exact/>
            <Route path='/admin/lessons' element={<Lesson/>} exact/>
            <Route path={STUDENT_ROUTE} element={<Student/>}exact/>
            <Route path={TEACHER_ROUTE} element={<Teacher/>}exact/>
            <Route path={AUTH_ROUTE} element={<Auth/>} exact/>
            <Route path={UPDATEPASSWORD_ROUTE} element={<UpdatePassword/>} exact/>
            <Route path="*" element={<Navigate to ={AUTH_ROUTE} />}/>
        </Routes>
    );
}

export default AppRouter;