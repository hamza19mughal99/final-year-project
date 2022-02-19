import React, { useState, Fragment, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Spinner } from "react-bootstrap";
import 'react-tabs/style/react-tabs.css';
import "./teacher.css";
import { getTeachers } from "../../../../services/teachers";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import firebase from "../../../../config/firebase";

const Teachers = () => {

    const column = ["Card No.", "Name", "Email", "Department", "Year of Joining"]
    const [AllTeachers, setAllTeachers] = useState(null)
    const [searchData, setSearchData] = useState({})
    const [allSearch, setAllSearch] = useState(null)

    useEffect(() => {

        getTeachers().then((res) => {
            setAllTeachers(res)
        })

    }, [])

    const teacherLocationHandler = (e) => {
        const {name, value} = e.target

        setSearchData({
            ...searchData,
            [name]: value
        })
    }

        const LocationHandler = (e) => {
        e.preventDefault();

        firebase.firestore().collection("teachers").where("id", "==", searchData.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setAllSearch(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const getTeacherTable = (teachers) => {
        let teacherData = <Spinner animation='border' />

        if (teachers && teachers.length === 0) {
            teacherData = <h5> No Teacher Found</h5>
        }

        if (teachers && teachers.length > 0) {
            teacherData = (
<>
    <Table>
        <TableHead>
            <TableRow hover>
                {
                    column.map((col, index) => (
                        <TableCell key={index}>{col}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
        <TableBody>
            <Fragment>
                {
                    allSearch ?
                        <TableRow>
                            <TableCell> {allSearch.id} </TableCell>
                            <TableCell> {allSearch.name} </TableCell>
                            <TableCell> {allSearch.email} </TableCell>
                            <TableCell> {allSearch.department} </TableCell>
                            <TableCell> {allSearch.yearJoin} </TableCell>
                        </TableRow>
                        :
                        teachers.map((teacher) => (
                            <TableRow >
                                <TableCell> {teacher.id} </TableCell>
                                <TableCell> {teacher.name} </TableCell>
                                <TableCell> {teacher.email} </TableCell>
                                <TableCell> {teacher.department} </TableCell>
                                <TableCell> {teacher.yearJoin} </TableCell>
                            </TableRow>))
                }
            </Fragment>
        </TableBody>
    </Table>
</>
            )
        }
        return teacherData;
    }

    return (
        <div className='page_responsive'>
            <div>
                <Breadcrumb>
                    <HomeIcon color="primary" />
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>ViewTeacher</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <form onSubmit={LocationHandler}>
                <div className={'d-flex'}>
                    <input
                        type="text"
                        className="form-control w-75"
                        name='id'
                        onChange={teacherLocationHandler}
                        placeholder={'Search By ID'}
                    />
                    <button type="submit" className={' w-25 btn btn-send'}>
                        Search
                    </button>
                </div>
            </form>
            <Tabs>
                <TabList>
                    <Tab>All Teachers</Tab>
                </TabList>
                <TabPanel>
                    <div className="text-center">
                        {
                            getTeacherTable(AllTeachers)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
export default Teachers;