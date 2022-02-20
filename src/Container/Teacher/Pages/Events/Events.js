import React, {Fragment, useEffect, useState} from 'react';
import { Modal, Spinner } from "react-bootstrap";
import { Form } from "reactstrap";
import { addEvent, getEvents } from '../../../../services/events'
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import firebase from "../../../../config/firebase";

const Events = () => {

    const [show, setShow] = useState(false);
    const [eventData, setEventData] = useState({})
    const [events, setEvents] = useState(null)
    const [loader, setLoader] = useState(false)
    const [searchData, setSearchData] = useState({})
    const [allSearch, setAllSearch] = useState(null)

    const columns = ['Event Name', 'Event Date', 'Event Time', 'Event Location', 'Action'];

    useEffect(() => {

        getEvents().then((res) => {
            console.log(res)
            setEvents(res)
        })

    }, [])

    const eventLocationHandler = (e) => {
        const {name, value} = e.target

        setSearchData({
            ...searchData,
            [name]: value
        })
    }

    const LocationHandler = (e) => {
        e.preventDefault();

        firebase.firestore().collection("events").where("eventName", "==", searchData.eventName)
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

    const ModalOpenHandler = () => {
        setShow(!show);
    }

    const formHandler = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        addEvent(eventData)
    }

    const handleClose = () => setShow(false);

    const modal = (
        <Modal show={show} size={'lg'} className="StaffEditCard">
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 style={{ fontWeight: "bold" }}> Add Events </h2>
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
                            placeholder="Event Venue"
                            name="eventVenue"
                            onChange={formHandler}
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Event Date"
                            name="eventDate"
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
                    <div className='mb-3'>
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Event Time"
                            name="eventTime"
                            onChange={formHandler}
                        />

                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Location"
                            name="location"
                            onChange={formHandler}
                        />

                    </div>
                    <div className={'text-center'}>
                        {
                            loader ? <Spinner animation="border" />
                                : <button type={'submit'} className={' mt-2 px-5 btn btn-send btn-block'} style={{ backgroundColor: "blue", color: "white" }}>Add</button>
                        }
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )

    const deleteHandler = (id) => {
        firebase.firestore().collection("events").doc(id).delete().then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

    }

    const getEventTable = (Events) => {

        let eventData = <Spinner animation="border"/>

        if (Events && Events.length === 0) {
            eventData = <h5>No Events Found</h5>
        }

        if (Events && Events.length > 0) {
            eventData = (
                <>
                    <Table>
                        <TableHead>
                            <TableRow hover>
                                {
                                    columns.map((col, index) => (
                                        <TableCell key={index} style={{fontWeight: "bolder"}}>{col}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Fragment>
                                {
                                    allSearch ?
                                        <TableRow>
                                            <TableCell> {allSearch.eventName} </TableCell>
                                            <TableCell> {allSearch.eventDate} </TableCell>
                                            <TableCell> {allSearch.eventTime} </TableCell>
                                            <TableCell> {allSearch.location} </TableCell>
                                        </TableRow>
                                        :
                                        Events.map(event => {
                                            return (
                                            <TableRow>
                                                <TableCell> {event.eventDetails.eventName} </TableCell>
                                                <TableCell> {event.eventDetails.eventDate} </TableCell>
                                                <TableCell> {event.eventDetails.eventTime} </TableCell>
                                                <TableCell> {event.eventDetails.location} </TableCell>
                                                <TableCell> <button className={'btn-send'} onClick={() => deleteHandler(event.id)}> Delete </button> </TableCell>
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
        return eventData
    }

    return (
        <>
            <div className="page_responsive">
                {modal}
                <div>
                    <Breadcrumb>
                        <HomeIcon color="primary" />
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active className='d-flex justify-content-start'>CreateEvents</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <button className={'btn btn-send btn-block'}
                        onClick={ModalOpenHandler}> CREATE EVENT </button>
                <hr />
                <form onSubmit={LocationHandler}>
                    <div className={'search_div mb-3'}>
                        <input
                            type="text"
                            className="form-control"
                            name='eventName'
                            onChange={eventLocationHandler}
                            placeholder={'Search By Event Name'}
                        />
                        <button type="submit" className={'btn btn-send'}>
                            Search
                        </button>
                    </div>
                </form>
                <div className="text-center table-responsive">
                    {
                        getEventTable(events)
                    }
                </div>
            </div>
        </>
    );
};
export default Events;