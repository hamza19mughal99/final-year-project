import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

import Dashboard from "../Pages/dashboard/dashboard";
import StudentLocation from "../Pages/StudentLocation/StudentLocation";
import TeacherLocation from "../Pages/TeacherLocation/TeacherLocation";
import AddStudents from "../Pages/AddStudents/AddStudents";
import AddTeacher from "../Pages/AddTeachers/AddTeachers";
import Events from "../Pages/Events/Events";
import AddCourses from "../Pages/AddCourses/AddCourses";

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: <Dashboard />,
    },
    {
        path: '/admin/view-student',
        component: <StudentLocation />,
    },
    {
        path: '/admin/view-teacher',
        component: <TeacherLocation />,
    },
    {
        path: '/admin/add-student',
        component: <AddStudents />,
    },
    {
        path: '/admin/add-teacher',
        component: <AddTeacher />,
    },
    {
        path: '/admin/events',
        component: <Events />,
    },
    {
        path: '/admin/add-courses',
        component: <AddCourses />
    }
]

export const adminSideBarItems = [
    {
        path: '/admin/dashboard',
        icon: <AiIcons.AiFillDashboard/>,
        title: 'Dashboard',
        isSubNav: false,
    },
    {
        path: '/admin/add-student',
        icon: <MdIcons.MdCarRental/>,
        title: 'AddStudents',
        isSubNav: false,
    },
    {
        path: '/admin/add-teacher',
        icon: <MdIcons.MdCarRental/>,
        title: 'AddTeacher',
        isSubNav: false,
    },
    {
        path: '/admin/add-courses',
        icon: <MdIcons.MdCarRental/>,
        title: 'AddCourses',
        isSubNav: false,
    },
    {
        path: '/admin/view-student',
        icon: <MdIcons.MdCarRental/>,
        title: 'View Student',
        isSubNav: false,
    },
    {
        path: '/admin/view-teacher',
        icon: <MdIcons.MdCarRental/>,
        title: 'View Teacher',
        isSubNav: false,
    },
    {
        path: '/admin/events',
        icon: <MdIcons.MdCarRental/>,
        title: 'Events',
        isSubNav: false,
    },
]



