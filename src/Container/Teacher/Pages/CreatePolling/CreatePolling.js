import React, { useState, useEffect, Fragment } from 'react';
import { Form, Modal, Spinner } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { MultiSelect } from "react-multi-select-component";
import { getStudents } from "../../../../services/student";
import { addPolling, getAllPollingData } from "../../../../services/polling";
import HomeIcon from "@mui/icons-material/Home";
import "./CreatePolling.css";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import firebase from "../../../../config/firebase";

const CreatePolling = () => {
    const columns = [
        "EventName",
        "EventPoints",
        "View Result",
        "Actions"
    ];
    const [pollingData, setPollingData] = useState({})
    const [selected, setSelected] = useState([]);
    const [studentData, setStudentData] = useState([])
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false)
    const [allPollingData, setAllPollingData] = useState(null)
    const [viewResult, setViewResult] = useState([])
    const [show2, setShow2] = useState(false)

    const ModalOpenHandler = () => {
        setShow(true);
    }
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);

    useEffect(() => {
        getStudents().then((res) => {
            setStudentData(res)
        })

    }, [])
    const ResultModalHandler = (poll) => {
        setViewResult(poll)
        setShow2(true)
    }


    const modal2 = (
        <Modal show={show2} size={'lg'} className="StaffEditCard">
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 style={{ fontWeight: "bold" }}> View Result </h2>
                    <p style={{ cursor: "pointer", fontSize: "20px" }} onClick={handleClose2} title="Close Staff">X</p>
                </div>
                <hr />
                {
                    viewResult.pollingData ?
                        viewResult.pollingData.participants.map(value => {
                            return (
                                <>
                                    {
                                        viewResult[value.label] ?
                                            <div className={'polling_result'}>
                                                <h5> <span> {value.label} </span> has <span> {viewResult[value.label]} </span> votes up till Now. </h5>
                                            </div>
                                            : null
                                    }
                                </>
                            )
                        })
                        : null
                }
            </Modal.Body>
        </Modal>
    )

    const formHandler = (e) => {
        const { name, value } = e.target;
        setPollingData({
            ...pollingData,
            [name]: value
        })
    }

    const handleCoursesInputChange = (value) => {
        setSelected(value)
    }

    useEffect(() => {
        getAllPollingData().then((res) => {
            setAllPollingData(res)
        })
    }, [])

    const StudentOptions = studentData.map((student, index) => {
        return {
            label: student.rollNo,
            value: student,
            key: index
        }
    })

    const onFormSubmit = (e) => {
        e.preventDefault()

        const formData = {
            event: pollingData.eventName,
            points: pollingData.eventPoints,
            participants: selected
        }
        setLoader(true)
        addPolling(formData)
    }

    const deleteHandler = (id) => {
        firebase.firestore().collection("polling").doc(id).delete().then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const modal = (
        <Modal show={show} size={'lg'} className="StaffEditCard">
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 style={{ fontWeight: "bold" }}> Create Polling </h2>
                    <p style={{ cursor: "pointer", fontSize: "20px" }} onClick={handleClose} title="Close Staff">X</p>
                </div>
                <Form onSubmit={onFormSubmit}>
                    <div className='mb-3'>
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Event Name"
                            name='eventName'
                            onChange={formHandler}
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Event Points"
                            name="eventPoints"
                            onChange={formHandler}
                        />
                    </div>
                    <div>
                        <MultiSelect
                            options={StudentOptions}
                            value={selected}
                            onChange={handleCoursesInputChange}
                            labelledBy="Participant Students"
                            placeholder={'Participant Students'}
                        />
                    </div>
                    <div className={'text-center'}>
                        {
                            loader ? <Spinner className={'mt-3'} animation="border" /> :
                                <button type={'submit'} className={' mt-3 px-5 btn btn-send btn-block'} style={{ backgroundColor: "#3b4968", color: "white" }}>Add</button>
                        }
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )

    let showPollData = (
        <div className={'text-center'}>
            <Spinner className={'mt-3'} animation="border" />
        </div>
    )

    if (allPollingData && allPollingData.length === 0) {
        showPollData = (
            <div className={'text-center'}>
                <p>No Polling Data Found</p>
            </div>
        )
    }

    if (allPollingData && allPollingData.length > 0) {
        showPollData = (
            <div className='table-responsive'>
                <Table>
                    <TableHead>
                        <TableRow hover>
                            {
                                columns.map((col, index) => (
                                    <TableCell key={index} style={{ fontWeight: "bolder" }}>{col}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Fragment>
                            {allPollingData.map(poll => {
                                console.log(poll)
                                return (
                                    <TableRow>
                                        <TableCell> {poll.pollingData.event} </TableCell>
                                        <TableCell> {poll.pollingData.points} </TableCell>
                                        <TableCell>
                                            <button onClick={() => ResultModalHandler(poll)} className={'btn btn-send'}> View Result </button>
                                        </TableCell>
                                        <TableCell>
                                            <button onClick={() => deleteHandler(poll.id)} className={'btn btn-send'}> Delete </button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </Fragment>
                    </TableBody>
                </Table>
            </div>
        )
    }

    return (
        <div className='page_responsive'>
            {modal}
            {modal2}
            <div>
                <Breadcrumb>
                    <HomeIcon color="primary" />
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>Create Polling</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <button className={'btn btn-send btn-block'}
                onClick={ModalOpenHandler}> CREATE POLLING </button>
            <hr />
            <div>
                {showPollData}
            </div>

        </div>
    )
};

export default CreatePolling;
