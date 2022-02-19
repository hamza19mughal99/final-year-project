import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

import Dashboard from "../Pages/dashboard/dashboard";
import Courses from "../Pages/courseDetails/CourseDetails";
import SoftSkills from "../Pages/SoftSkills/SoftSkills";
import TechnicalSkills from "../Pages/TechnicalSkills/TechnicalSkills";
import Transcript from "../Pages/Transcript/Transcript";
import UpComingEvents from "../Pages/UpComingEvents/UpComingEvents";
import CvBuilder from "../Pages/cvBuilder/CvBuilder";
import Polling from "../Pages/Polling/Polling";


export const studentRoutes = [
    {
        path: '/student/dashboard',
        component: <Dashboard />,
    },
    {
        path: '/student/courses',
        component: <Courses />,
    },
    {
        path: '/student/polling',
        component: <Polling />,
    },
    {
        path: '/student/soft-skills',
        component: <SoftSkills />,
    },
    {
        path: '/student/technical-skills',
        component: <TechnicalSkills />,
    },
    {
        path: '/student/transcript',
        component: <Transcript />,
    },
    {
        path: '/student/upcoming-events',
        component: <UpComingEvents />,
    },
    {
        path: "/student/cv-builder",
        component: <CvBuilder />
    }
]

export const studentSideBarItems = [
    {
        path: '/student/dashboard',
        icon: <AiIcons.AiFillDashboard />,
        title: 'Dashboard',
        isSubNav: false,
    },
    {
        path: '/student/courses',
        icon: <MdIcons.MdCarRental />,
        title: 'Courses',
        isSubNav: false,
    },
    {
        path: '/student/polling',
        icon: <MdIcons.MdCarRental />,
        title: 'Polling',
        isSubNav: false,
    },
    {
        path: '/student/soft-skills',
        icon: <MdIcons.MdCarRental />,
        title: 'SoftSkills',
        isSubNav: false,
    },
    {
        path: '/student/technical-skills',
        icon: <MdIcons.MdCarRental />,
        title: 'TechnicalSkills',
        isSubNav: false,
    },
    {
        path: '/student/transcript',
        icon: <MdIcons.MdCarRental />,
        title: 'Transcript',
        isSubNav: false,
    },
    {
        path: '/student/upcoming-events',
        icon: <MdIcons.MdCarRental />,
        title: 'UpComingEvents',
        isSubNav: false,
    },
    {
        path: '/student/cv-builder',
        icon: <MdIcons.MdCarRental />,
        title: 'CvBuilder',
        isSubNav: false,
    },
]



