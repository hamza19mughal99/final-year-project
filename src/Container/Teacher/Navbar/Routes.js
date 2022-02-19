import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

import Dashboard from "../Pages/dashboard/dashboard";
import ManageCourses from "../Pages/ManageCourses/ManageCourses";
import Events from "../Pages/Events/Events";
import StudentLocation from "../Pages/StudentLocation/StudentLocation";
import Setting from "../Pages/Setting/Setting";
import CreatePolling from "../Pages/CreatePolling/CreatePolling";

export const teacherRoutes = [
    {
        path: '/teacher/dashboard',
        component: <Dashboard />,
    },
    {
        path: '/teacher/manage-courses',
        component: <ManageCourses />,
    },
    {
        path: '/teacher/events',
        component: <Events />,
    },
    {
        path: '/teacher/student-location',
        component: <StudentLocation />,
    },
    {
        path: '/teacher/create-polling',
        component: <CreatePolling />,
    },

    {
        path: '/teacher/setting',
        component: <Setting />,
    }

]

export const teacherSideBarItems = [
    {
        path: '/teacher/dashboard',
        icon: <AiIcons.AiFillDashboard />,
        title: 'Dashboard',
        isSubNav: false,
    },
    {
        path: '/teacher/manage-courses',
        icon: <MdIcons.MdCarRental />,
        title: 'Courses',
        isSubNav: false,
    },
    {
        path: '/teacher/student-location',
        icon: <MdIcons.MdCarRental />,
        title: 'Student Location',
        isSubNav: false,
    },
    {
        path: '/teacher/events',
        icon: <MdIcons.MdCarRental />,
        title: 'Events',
        isSubNav: false,
    },
    {
        path: '/teacher/create-polling',
        icon: <MdIcons.MdCarRental />,
        title: 'Create polling',
        isSubNav: false,
    },
    {
        path: '/teacher/setting',
        icon: <MdIcons.MdCarRental />,
        title: 'Setting',
        isSubNav: false,
    }


]



