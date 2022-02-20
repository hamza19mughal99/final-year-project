import React, { useState } from 'react'
import "./dashboard.css"
// import Header from './Header';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import 'react-calendar/dist/Calendar.css';
import AddCardIcon from '@mui/icons-material/AddCard';
import ReactApexChart from 'react-apexcharts'

export default function TeacherDashboard(props) {

    const [piechart] = useState({
        series: [20, 20, 20, 20, 20],
        options: {
            chart: {
                width: 480,
                type: 'pie',
            },
            labels: ['Software Engineering', 'Computer Engineering', 'Bio Medical Engineering', 'Civil Engineering', 'Electronic Engineering'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    })
    return (
        <>
            <main className='page_responsive'>

                <div className='dashboard_header'>
                    <h4 className='text-capitalize'>SSUET ADMIN DASHBOARD</h4>
                </div>
                <div>
                    <Breadcrumb>
                        <HomeIcon color="primary" />
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active className='d-flex justify-content-start'>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <Card className="cardStyle" sx={{ minWidth: 240, height: 150 }}>
                                <CardContent>
                                    <Link href="/admin/add-courses"  >
                                        <Typography variant="h5" component="div" className='mt-5 text-center '>
                                            <AddCardIcon />    Add Courses
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Card className="cardStyle" sx={{ minWidth: 240, height: 150 }}>
                                <CardContent>
                                    <Link href='/admin/add-student'  >
                                        <Typography variant="h5" component="div" className='mt-5 text-center'>
                                            <AddCardIcon />  Add Student
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Card className="cardStyle" sx={{ minWidth: 240, height: 150 }}>
                                <CardContent>
                                    <Link href='/admin/add-teacher'>
                                        <Typography variant="h5" component="div" className='mt-5 text-center'>
                                            <AddCardIcon />     Add Teacher
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Card className="cardStyle" sx={{ minWidth: 240, height: 180 }}>
                                <CardContent>
                                    <Link href='/admin/events'>
                                        <Typography variant="h5" component="div" className='mt-5 text-center'>
                                            <AddCardIcon />     Create Events
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Card className="cardStyle text-center" sx={{ minWidth: 240, height: 300 }} >
                                <div id="chart">
                                    <ReactApexChart options={piechart.options} series={piechart.series} type="pie" width={380} />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}