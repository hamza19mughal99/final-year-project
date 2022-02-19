import React, { Fragment, useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Modal, Spinner } from "react-bootstrap";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import 'react-tabs/style/react-tabs.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { getStudents } from "../../../../services/student";
import "./StudentLocation.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import firebase from "../../../../config/firebase";

const Students = (props) => {
    const [searchData, setSearchData] = useState({})
    const [allSearch, setAllSearch] = useState(null)

    const studentLocationHandler = (e) => {
        const { name, value } = e.target

        setSearchData({
            ...searchData,
            [name]: value
        })
    }

    const LocationHandler = (e) => {
        e.preventDefault();

        firebase.firestore().collection("students").where("rollNo", "==", searchData.rollNo)
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

    const column = ["Roll No.", "Name", "Batch", "CGPA", "Reward Points", "Location"]

    const [allStudents, setAllStudents] = useState(null)

    const [show, setShow] = useState(false);

    const [studentLocation, setStudentLocation] = useState({})
    const [locationBol, setLocationBol] = useState(false)

    useEffect(() => {
        getStudents().then((res) => setAllStudents(res))
    }, [])

    const handleClose = () => setShow(false);

    const MapModalHandler = (location) => {
        console.log(location)
        setStudentLocation(location)

        function arePointsNear(checkPoint, centerPoint, km) {
            const ky = 40000 / 360;
            const kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
            const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
            const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
            return Math.sqrt(dx * dx + dy * dy) <= km;
        }

        const currentLocation = { lat: location.lat, lng: location.lng };
        const uniLocation = { lat: '24.915806', lng: '67.093152' };

        const n = arePointsNear(currentLocation, uniLocation, 1);

        setLocationBol(n)
        setShow(!show)
    }

    const mapModal = (
        <Modal show={show} size={'xl'} >
            <Modal.Header className={'modal_header'}>
                <AiFillCloseCircle onClick={handleClose} />
            </Modal.Header>
            {
                locationBol ?
                    <div className={'map_wrapper_setting'}>
                        <Map google={props.google}
                            initialCenter={studentLocation}
                            zoom={18}
                        >
                            <Marker
                                position={
                                    studentLocation
                                }
                                name={'Your position'} />
                        </Map>
                    </div>
                    : <h5> The Location of Student is out from University</h5>
            }
        </Modal>
    )

    const getStudentTable = (students) => {

        let studentData = <Spinner animation="border" />

        if(students && students.length === 0){
            studentData = <h5>No Student Found</h5>
        }

        if(students && students.length > 0){
            studentData = (
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
                                            <TableCell> {allSearch.rollNo} </TableCell>
                                            <TableCell> {allSearch.name} </TableCell>
                                            <TableCell> {allSearch.batch} </TableCell>
                                            <TableCell> {allSearch.CGPA} </TableCell>
                                            <TableCell> {allSearch.rewardPoints} </TableCell>
                                            <TableCell> <MdLocationOn
                                                style={{ cursor: "pointer", fontSize: "20px" }}
                                                onClick={() => MapModalHandler(allSearch.location)} />
                                            </TableCell>
                                        </TableRow>
                                        :
                                        students.map(student => {
                                            return (
                                                <TableRow>
                                                    <TableCell> {student.rollNo} </TableCell>
                                                    <TableCell> {student.name} </TableCell>
                                                    <TableCell> {student.batch} </TableCell>
                                                    <TableCell> {student.CGPA} </TableCell>
                                                    <TableCell> {student.rewardPoints} </TableCell>
                                                    <TableCell> <MdLocationOn
                                                        style={{ cursor: "pointer", fontSize: "20px" }}
                                                        onClick={() => MapModalHandler(student.location)} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                }
                            </Fragment>
                        </TableBody>
                    </Table>
                </>
            )
        }
        return studentData;
    }

    return (
        <div className='page_responsive'>
            {mapModal}
            <div>
                <Breadcrumb>
                    <HomeIcon color="primary" />
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>ViewStudent</Breadcrumb.Item>
                </Breadcrumb>
            </div>
                <form onSubmit={LocationHandler}>
                    <div className={'d-flex'}>
                    <input
                        type="text"
                        className="form-control w-75"
                        name='rollNo'
                        onChange={studentLocationHandler}
                        placeholder={'Search By Roll No.'}
                    />
                    <button type="submit" className={' w-25 btn btn-send'}>
                        Search
                    </button>
                    </div>
                </form>
            <Tabs>
                <TabList>
                    <Tab>All Students</Tab>
                </TabList>
                <TabPanel>
                    <div className="text-center">
                        {
                            getStudentTable(allStudents)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
export default (GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API
})(Students));