import React, { useState, Fragment, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Spinner} from "react-bootstrap";
import {getTeacher} from "../../../../services/teachers";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const ManageCourses = () => {

    const columns = ['Course Code', 'Course Name', 'Credit Hours', 'Department'];
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        getTeacher().then((res) => {
            setTeacher(res.data())
        })
    }, [])
    console.log(teacher)

    let coursesData = <Spinner animation={'border'} />

    if(teacher.courses && teacher.courses.length === 0){
        coursesData = <h5>No Courses Found</h5>
    }

    if(teacher.courses && teacher.courses.length > 0){
       coursesData = (
           <Table>
               <TableHead>
                   <TableRow hover>
                       {
                           columns.map((col, index) => (
                               <TableCell key={index}>{col}</TableCell>
                           ))
                       }
                   </TableRow>
               </TableHead>
               <TableBody>
                   <Fragment>
                       {
                           teacher.courses.map((allCourses, index) => {
                               return (
                                   (
                                       <TableRow hover key={index}>
                                           <TableCell> {allCourses.value.CourseCode} </TableCell>
                                           <TableCell> {allCourses.value.CourseName} </TableCell>
                                           <TableCell> {allCourses.value.CreditHour} </TableCell>
                                           <TableCell> {allCourses.value.department}</TableCell>
                                       </TableRow>
                                   )
                               )
                           })
                       }
                   </Fragment>
               </TableBody>
           </Table>
       )
    }

    return (
        <div className="page_responsive">
            <div >
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>Manage Course</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Courses</Tab>
                </TabList>
                <TabPanel>
                    <div className="text-center table-responsive">
                        {
                            coursesData
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
export default ManageCourses;
