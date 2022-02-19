import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../../../assets/pmp-logo.png"
import firebase from "../../../config/firebase";

const SearchStudent = () => {
    const navigate = useNavigate();

    const getToken = localStorage.getItem('studentId')
    const getTeacherToken = localStorage.getItem('teacherId');
    const getAdminToken = localStorage.getItem('adminId');
    const [searchData, setSearchData] = useState({})

    const studentLocationHandler = (e) => {
        const { name, value } = e.target

        setSearchData({
            ...searchData,
            [name]: value
        })
    }

    const LocationHandler = (e) => {
        e.preventDefault();

        firebase.firestore().collection("students").where('technicalSkill', "array-contains", "SAAS")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    let headerBtn;
    if (!getToken && !getTeacherToken && !getAdminToken) {

        headerBtn = (
            <div className="d-flex">
                <div className="mr-1">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login"> Student Login </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
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
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/student/dashboard"> Go to dashboard </Link>
                    </li>
                </ul>
            </div>
        )
    }

    if (!getToken && getTeacherToken && !getAdminToken) {
        headerBtn = (
            <div className="mr-1">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/teacher/dashboard"> Go to Teacher dashboard </Link>
                    </li>
                </ul>
            </div>
        )
    }

    if (!getToken && !getTeacherToken && getAdminToken) {
        headerBtn = (
            <div className="mr-1">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/dashboard"> Go to Admin dashboard </Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        <Link className="login" to="/">
                            <img
                                src={logo}
                                width="100"
                                height="80"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        {headerBtn}
                    </div>
                </nav>
            </div>
            <div style={{ backgroundColor: '#fff' }}>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Nav>
                            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                            <Nav.Link onClick={() => navigate('/search-student')}>Search Student By Skill</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>

            <div className='container mt-5'>
                <form onSubmit={LocationHandler}>
                    <div className={'d-flex'}>
                        <input
                            type="text"
                            className="form-control w-75"
                            name='softSkill'
                            onChange={studentLocationHandler}
                            placeholder={'Search By SoftSkill '}
                        />
                        <button type="submit" className={' w-25 btn btn-send'}>
                            Search
                        </button>
                    </div>
                </form>

                <div className='mt-5'>
                    <ul>
                        <li className='mb-2'>
                            <div className='d-flex justify-content-between'>
                                <h5>Name: <strong> Hamza Ahmed Mughal </strong></h5>
                                <h5>RollNo: <strong> SE-092-2018 </strong></h5>
                                <button className="nav-link" >View Cv</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default SearchStudent