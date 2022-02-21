import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import logo from '../../assets/pmp-logo.png'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import HomeImg from "../../assets/home_img.jpg"
import {Container, Navbar, Nav} from "react-bootstrap"

const Home = () => {
    const navigate = useNavigate();

    const getToken = localStorage.getItem('studentId')
    const getTeacherToken = localStorage.getItem('teacherId');
    const getAdminToken = localStorage.getItem('adminId');

    let headerBtn;

    if (!getToken && !getTeacherToken && !getAdminToken) {

        headerBtn = (
            <div className="d-flex">
                <div className="mr-1">
                    <ul class="navbar-nav ms-auto mb-2">
                        <li class="nav-item">
                            <Link className="nav-link" to="/login"> Student Login </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul class="navbar-nav ms-auto mb-2">
                        <li class="nav-item">
                            <Link className="nav-link" to="/teacher/login"> Teacher Login </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )

    }

    if (getToken && !getTeacherToken && !getAdminToken) {
        headerBtn = (
            <div className="mr-1">
                <ul class="navbar-nav ms-auto mb-2">
                    <li class="nav-item">
                        <Link className="nav-link" to="/student/dashboard"> Go to dashboard </Link>
                    </li>
                </ul>
            </div>
        )
    }

    if (!getToken && getTeacherToken && !getAdminToken) {
        headerBtn = (
            <div className="mr-1">
                <ul class="navbar-nav ms-auto mb-2">
                    <li class="nav-item">
                        <Link className="nav-link" to="/teacher/dashboard"> Go to Teacher dashboard </Link>
                    </li>
                </ul>
            </div>
        )
    }

    if (!getToken && !getTeacherToken && getAdminToken) {
        headerBtn = (
            <div className="mr-1">
                <ul class="navbar-nav ms-auto mb-2">
                    <li class="nav-item">
                        <Link className="nav-link" to="/admin/dashboard"> Go to Admin dashboard </Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-white">
                    <div class="container">
                        <Link className="login" to="/">
                            <img
                                src={logo}
                                width="100"
                                height="80"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            /></Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        {headerBtn}

                    </div>
                </nav>
            </div>
            {/* <div style={{backgroundColor: '#fff'}}>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Nav>
                            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                            <Nav.Link onClick={() => navigate('/search-student')}>Search Student By Skill</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div> */}

            <div className='container main_section'>
                <div className='row align-items-center'>
                    <div className='col-md-5 main_section_text'>
                        <h5>The University</h5>
                        <p>National rankings, environmentally friendly and state-of-the-art facilities, growing reputation for excellence in teaching and affordable cost of engineering education are some of the main attractions of SSUET.</p>
                        <button>Learn More</button>
                    </div>

                    <div className='col-md-7'>
                        <img src={HomeImg} alt='home_img'
                            style={{ maxWidth: '100%' }}
                        />
                    </div>
                </div>
            </div>

            {/* <div className='thirdSection' >
                <Grid className='thirdsection-paper' container justifyContent="center">
                    <Paper elevation={20}
                        component="form"
                        sx={{ p: '10px', display: 'flex', alignText: 'center', flexDirection: 'column', width: '50%', margin: '10%' }}
                    >
                        <h2>Vision</h2>
                        <Divider variant="middle" />

                        <h6 style={{ padding: "20px 0" }}>To make SSUET a leading innovation provider in education and research with a focus on realizing positive economic impact, entrepreneurial mindset and a sense of social responsibility as envisioned by Sir Syed Ahmed Khan.</h6>

                    </Paper>
                </Grid>
            </div> */}

            <div className='thirdSection'>
                <div className='vision_div'>
                    <div className='vision_div_main'>
                    <h3>Vision</h3>
                    <hr />
                    <p>To make SSUET a leading innovation provider in education and research with a focus on realizing positive economic impact, entrepreneurial mindset and a sense of social responsibility as envisioned by Sir Syed Ahmed Khan.</p>
                    </div>
                </div>
            </div>

            <div className='footer1'>
                <div className='footer1-innerdiv'>
                    <div className='footer1-content'>
                        <h4>About</h4>
                        <h6 className='footer1-h6' >Undergraduate Admissions</h6>
                        <h6 className='footer1-h6'>Postgraduate Admissions</h6>
                        <h6 className='footer1-h6'>FAQ's</h6>
                        <h6 className='footer1-h6'>Admission Query</h6>
                    </div>

                    <div className='footer1-content'>
                        <h4>QEC</h4>
                        <h6 className='footer1-h6'>Director Message</h6>
                        <h6 className='footer1-h6'>QEC Introduction</h6>
                        <h6 className='footer1-h6'>QEC News & Events</h6>
                        <h6 className='footer1-h6'>SSUET Policies</h6>
                    </div>

                    <div className='footer1-content'>
                        <h4>ORIC</h4>
                        <h6 className='footer1-h6'>ORIC</h6>
                        <h6 className='footer1-h6'>About ORIC</h6>
                        <h6 className='footer1-h6'>ORIC Events</h6>

                    </div>

                    <div className='footer1-content'>
                        <h4>Research</h4>
                        <h6 className='footer1-h6'>Research Journal</h6>
                        <h6 className='footer1-h6'>Research Cluster</h6>

                    </div>

                    <div className='footer1-content'>
                        <h4>Directorates</h4>
                        <h6 className='footer1-h6'>DSA-Students Affairs</h6>
                        <h6 className='footer1-h6'>CCPE-Center For Continuing Professional Education</h6>
                        <h6 className='footer1-h6'>GCCP-Guidance Center & Career Planning</h6>
                        <h6 className='footer1-h6'>Sports</h6>
                    </div>
                </div>
            </div>
            <div className='footer2' >
                <div className='footer_text'>
                    <p>All Rights Reserved by PMP Company</p>
                </div>
            </div>
        </>
    )
}
export default Home