import React, { Fragment, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import 'react-tabs/style/react-tabs.css';
import { Spinner } from "react-bootstrap";
import { getEvents } from "../../../../services/events";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const UpComingEvents = props => {
    const columns = ['Event Name', 'Event Date', 'Event Time', 'Event Location'];
    const [events, setEvents] = useState(null)

    useEffect(() => {
        getEvents().then((res) => {
            setEvents(res)
        })
    }, [])


    const getEventTable = (Events) => {
        let showEvents = (
            <div className={'text-center'}>
                <Spinner animation="border" />
            </div>
        )

        if (Events && Events.length === 0) {
            showEvents = <p className={'text-center'}>No Events Found</p>
        }

        if (Events && Events.length > 0) {
            showEvents = (
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
                                {Events.map(event => (
                                    <TableRow>
                                        <TableCell> {event.eventDetails.eventName} </TableCell>
                                        <TableCell> {event.eventDetails.eventDate} </TableCell>
                                        <TableCell> {event.eventDetails.eventTime} </TableCell>
                                        <TableCell> {event.eventDetails.location} </TableCell>
                                    </TableRow>
                                ))}
                            </Fragment>
                        </TableBody>
                    </Table>
                </div>
            )
        }
        return showEvents;
    }

    return (
        <div className="page_responsive">
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className="d-flex justify-content-start">
                        Upcoming Events
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div>
                {
                    getEventTable(events)
                }
            </div>
        </div>
    );
};
export default UpComingEvents;