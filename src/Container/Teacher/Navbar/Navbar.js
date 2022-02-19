import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import {teacherSideBarItems} from "./Routes";
import './NavBar.css'
import logo from "../../../assets/logo.png"

const NavBar = () => {

    const location = useLocation();
    const [sideBar, setSideBar] = useState(false)
    const showSideBar = () => setSideBar(!sideBar);

    const onLogOutHandler = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const classes = (path) => {
        if (path === location.pathname) {
            return 'nav_active'
        }
        return ''
    }

    return (
        <>
            <div className={sideBar ? 'sidebar active' : 'sidebar'}>
                <div className={'logo_content'}>
                    <div className={'profile'}>
                        <img className={'mb-0'} src={logo} alt='ssuet logo ' style={{marginTop :"-3px"}}/>
                    </div>
                    <FaIcons.FaBars className={'fa-bars'} onClick={showSideBar} />
                </div>
                <ul className="nav_list p-0">
                    {
                        teacherSideBarItems.map((item, index) =>{
                                return  (
                                    <li key={index} className={`${classes(item.path)}`}>
                                        <div>
                                            <Link to={item.path}>
                                                { item.icon }
                                                <span>{ item.title }</span>
                                            </Link>
                                        </div>
                                    </li>
                                )
                        })
                    }
                    <li  onClick={onLogOutHandler}>
                        <Link to={'#'} className="logout_btn">
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