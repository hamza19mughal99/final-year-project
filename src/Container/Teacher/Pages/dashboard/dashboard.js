import React, { useState, useEffect } from 'react'
import "./dashboard.css"
import Header from './Header';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Spinner} from "react-bootstrap";
import {getTeacher} from "../../../../services/teachers";
import {NavLink} from "react-router-dom"

export default function TeacherDashboard(props) {

    const [value, onChange] = useState(new Date());

    const [loader, setLoader] = useState(true)
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        getTeacher().then((res) => {
            setTeacher(res.data())
            setLoader(false)
        })
    }, [])

    return (
        <>
            <div className='page_responsive'>
                {/* <Header /> */}

                <div className='dashboard_header'>
                { loader ? <Spinner animation={'border'} /> : <h4 className='text-capitalize'>{teacher.name} (id: {teacher.id})</h4>}
                </div>
                <div >
                    <Breadcrumb>
                        <HomeIcon color="primary" />
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active className='d-flex justify-content-start'>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <Card className="cardStyle" sx={{ minWidth: 240, height: 180 }}>
                                <CardContent>
                                    <NavLink to='/teacher/create-polling'>
                                        <Typography variant="h5" component="div" className='mt-5 text-center'>
                                            Create Live Polling
                                        </Typography>
                                    </NavLink>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Card className="cardStyle" sx={{ minWidth: 240, height: 180 }}>
                                <CardContent>
                                    <NavLink to='/teacher/student-location'  >
                                        <Typography variant="h5" component="div" className='mt-5 text-center'>
                                            Check Student Location
                                        </Typography>
                                    </NavLink>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Calendar
                                onChange={onChange}
                                value={value}
                            />
                        </div>

                    </div>
                </div>

                <div className="container-fluid mt-5">
                    <div className="row">
                        
                            <div className="col-md-4 mb-3">
                                <Card className="cardStyle" sx={{ minWidth: 240, height: 180 }}>
                                    <CardContent>
                                        <NavLink to='/teacher/events'>
                                            <Typography variant="h5" component="div" className='mt-5 text-center'>
                                                Events
                                            </Typography>
                                        </NavLink>
                                    </CardContent>
                                </Card>
                            </div>

                        
                            <div className="col-md-4 mb-3">
                                <Card className="cardStyle" sx={{ minWidth: 240, height: 180 }}>
                                    <CardContent>
                                        <NavLink to='/teacher/student-activity' >
                                            <Typography variant="h5" component="div" className='mt-5 text-center'>
                                                Student Activity
                                            </Typography>
                                        </NavLink>
                                    </CardContent>
                                </Card>
                            </div>
                        
                        <div className="col-md-4 mb-3">
                            <Card className="cardStyle" sx={{ minWidth: 240, height: 180 }}>
                                <CardContent>
                                    <NavLink to='/teacher/manage-courses'>
                                        <Typography variant="h5" component="div" className='mt-5 text-center'>
                                            Manages Courses
                                        </Typography>
                                    </NavLink>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
