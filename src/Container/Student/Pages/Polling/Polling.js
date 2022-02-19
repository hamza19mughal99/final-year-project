import React, { useEffect, useState, Fragment } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Modal, Form, Spinner } from "react-bootstrap";
import { getPolling, updatePoll } from "../../../../services/polling";
import Select from 'react-select'
import HomeIcon from "@mui/icons-material/Home";

const Polling = () => {

    const columns = [
        "EventName",
        "EventPoints",
        "Participants",
    ];
    const [pollingData, setPollingData] = useState(null)
    const [show, setShow] = useState(false);
    const [getParticipants, setGetParticipants] = useState(null)
    const [selected, setSelected] = useState([]);
    const [selectedPollingId, setSelectedPollingId] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleCoursesInputChange = (value) => {
        setSelected(value)
    }

    useEffect(() => {
        getPolling().then((res) => setPollingData(res));
    }, []);

    const VoteModalHandler = (participants, id) => {
        // addPolling(participants, selected)
        setGetParticipants(participants)
        setShow(true)
        setSelectedPollingId(id)
    }
    const handleClose = () => setShow(false);


    const voteModal = (
        <Modal show={show}>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 style={{ fontWeight: "bold" }}> Participants </h2>
                    <p style={{ cursor: "pointer", fontSize: "20px" }} onClick={handleClose} title="Close Staff">X</p>
                </div>
                <div>
                    <Form>
                        <Select
                            options={getParticipants}
                            value={selected}
                            onChange={handleCoursesInputChange}
                        />
                        {
                            loading ?
                                <div className={'text-center mt-2'}>
                                    <Spinner animation={'border'} />
                                </div>
                                :
                                <button className={'mt-2 text-center btn btn-send btn-block'} onClick={(event) => {
                                    event.preventDefault();
                                    setLoading(true)
                                    updatePoll(selected, selectedPollingId)
                                }} style={{ backgroundColor: "#3b4968", color: "white" }}> Give Vote </button>
                        }
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )

    let pollingTable = (
        <div className={'text-center'}>
            <Spinner animation="border" />
        </div>
    )

    if (pollingData && pollingData.length === 0) {
        pollingTable = (
            <p style={{ fontWeight: "bold" }} className={"text-center"}>
                No Data Found
            </p>
        );
    }

    if (pollingData && pollingData.length > 0) {
        pollingTable = (
            <Table>
                <TableHead>
                    <TableRow hover>
                        {columns.map((col, index) => (
                            <TableCell key={index} style={{ fontWeight: "bolder" }}>
                                {col}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Fragment>
                        {pollingData.map((polling, index) => {
                            return (
                                <TableRow hover key={index}>
                                    <TableCell> {polling.pollingData.event} </TableCell>
                                    <TableCell> {polling.pollingData.points} </TableCell>
                                    <TableCell>
                                        <button className={'w-50 text-center btn btn-send btn-block'}
                                            onClick={() => VoteModalHandler(polling.pollingData.participants, polling.id)} style={{ backgroundColor: "#3b4968", color: "white" }}> Give Vote </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </Fragment>
                </TableBody>
            </Table>
        );
    }

    return (
        <div className='page_responsive'>
            <div>
                <Breadcrumb>
                    <HomeIcon color="primary" />
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>Polling</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {voteModal}
            {pollingTable}
        </div>
    )
};

export default Polling;
