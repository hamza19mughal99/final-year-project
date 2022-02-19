import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//admin
import { adminRoutes } from "./Container/Admin/NavBar/Routes";
import AdminNavBar from "./Container/Admin/NavBar/Navbar";

//student
import { studentRoutes } from "./Container/Student/Navbar/Routes";
import StudentNavBar from "./Container/Student/Navbar/Navbar";

//teacher
import { teacherRoutes } from "./Container/Teacher/Navbar/Routes";
import TeacherNavBar from "./Container/Teacher/Navbar/Navbar";

import Home from "./Container/StaticPages/Home";
import SearchStudent from './Container/StaticPages/SearchStudent/SearchStudent';
import About from './Container/StaticPages/About';
import Login from "./Container/Student/Pages/Login/Login.js";
import TeacherLogin from "./Container/Teacher/Pages/Login/Login";
import AdminLogin from "./Container/Admin/Pages/Login/Login"
import {Slide, ToastContainer} from "react-toastify";

function App() {

  const getToken = localStorage.getItem('studentId')
  const getTeacherToken = localStorage.getItem('teacherId');
  const getAdminToken = localStorage.getItem('adminId');

  const AdminLayout = (
    adminRoutes.map((item, index) => (
      <Route key={index} path={item.path} element={
        <React.Fragment>
          <AdminNavBar />
          {item.component}
        </React.Fragment>
      } />
    ))
  )

  const StudentLayout = (
      studentRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={
          <React.Fragment>
            <StudentNavBar />
            {item.component}
          </React.Fragment>
        } />
      ))
    )

  const TeacherLayout = (
    teacherRoutes.map((item, index) => (
      <Route key={index} path={item.path} element={
        <React.Fragment>
          <TeacherNavBar />
          {item.component}
        </React.Fragment>
      } />
    ))
  )
  return (
    <div className="App">
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            transition={Slide}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      <Router>
        <Routes>
          {getAdminToken ? AdminLayout : <Route
              path="*"
              element={<Navigate to="/" />}
          />}
          {getToken ? StudentLayout : <Route
              path="*"
              element={<Navigate to="/" />}
          />}
          {getTeacherToken ? TeacherLayout : <Route
              path="*"
              element={<Navigate to="/" />}
          />}
          <Route path={'/'} element={<Home />} />
          <Route path={'/search-student'} element={<SearchStudent />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/teacher/login'} element={<TeacherLogin />} />
          <Route path={'/admin/login'} element={<AdminLogin />}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;