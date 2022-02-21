import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import { studentSideBarItems } from "./Routes";
import './NavBar.css'
import logo from "../../../assets/logo.png"
import { updateLocation } from "../../../services/location";

const NavBar = () => {

    const location = useLocation();
    const [sideBar, setSideBar] = useState(false)
    const showSideBar = () => setSideBar(!sideBar);
    const navigate = useNavigate();

    const Student = localStorage.getItem("studentId");

    const onLogOutHandler = () => {
        updateLocation(Student, { lat: '', lng: '' })
        localStorage.clear();
        navigate('/')
    }

    const classes = (path) => {
        if (path === location.pathname) {
            return 'nav_active'
        }
        return ''
    }
    //    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                             <span class="navbar-toggler-icon"></span>
    //                         </button> 

    return (
        <>
            <div className={sideBar ? 'sidebar active' : 'sidebar'}>
                <div className={'logo_content'}>
                    <div className="profile img">
                        <img className={'mb-0'} src={logo} alt='ssuet-logo ' style={{ marginTop: "-3px" }} />
                    </div>
                    <FaIcons.FaBars className={'fa-bars'} onClick={showSideBar} />
                </div>
                <ul className="nav_list p-0">
                    {
                        studentSideBarItems.map((item, index) => {
                            return (
                                <li key={index} className={`${classes(item.path)}`}>
                                    <div>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </div>
                                </li>
                            )
                        })
                    }
                    <li className="logout_btn" onClick={onLogOutHandler}>
                        <Link to={'/'}>
                            <FiIcons.FiLogOut />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};
export default NavBar;