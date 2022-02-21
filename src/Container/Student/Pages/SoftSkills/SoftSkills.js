import React, { Fragment, useState, useEffect } from 'react';
import { Modal, Spinner } from "react-bootstrap";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { updateSoftSkills } from "../../../../services/softSkills"
import { getStudent } from "../../../../services/student"
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const SoftSkills = () => {
    const Student = localStorage.getItem("studentId");

    const columns = ['Course Name', 'Date', 'From'];
    const [loader, setLoader] = useState(false)
    const [softSkillData, setSoftSkillsData] = useState([])
    const [student, setStudent] = useState([])
    const [show, setShow] = useState(false);

    const formHandler = (e) => {
        setSoftSkillsData({
            ...softSkillData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        let softSkillsArr = student.softSkill;
        softSkillsArr.push(softSkillData)
        updateSoftSkills(Student, softSkillsArr);
    }

    useEffect(() => {
        getStudent().then((res) => {
            setStudent(res.data())
        })
    }, [])

    const ModalOpenHandler = async (event) => {
        event.preventDefault();
        setShow(true)
    }

    const handleClose = () => setShow(false);
    const modal = (
        <Modal show={show} size={'lg'} className="StaffEditCard">
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 style={{ fontWeight: "bold" }}> Add Soft Skills </h2>
                    <p style={{ cursor: "pointer", fontSize: "20px" }} onClick={handleClose} title="Close Staff">X</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Enter Skill " className="form-control mt-1" name="courseName" onChange={formHandler} />
                    <input placeholder=" Date" className="form-control mt-1" name="fromDate" onChange={formHandler} />
                    {/* <input placeholder="End Date" className="form-control mt-1" name="ToDate" onChange={formHandler} /> */}
                    <input placeholder="From Where" className="form-control mt-1" name="From" onChange={formHandler} />
                    {
                        loader ?
                            <div className={'text-center mt-3'}>
                                <Spinner animation={'border'} />
                            </div>
                            :
                            <button className={'text-center btn btn-send btn-block mt-1'} style={{ backgroundColor: "#4d4d4d", color: "white" }}>ADD</button>
                    }
                </form>
            </Modal.Body>
        </Modal>
    )

    let studentSoftSkill = (
        <div className={'text-center'}>
            <Spinner animation={'border'} />
        </div>
    )
    if (student.softSkill && student.softSkill.length === 0) {
        studentSoftSkill = <p className={'text-center'}>No Soft Skills</p>
    }

    if (student.softSkill && student.softSkill.length > 0) {
        studentSoftSkill = (
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
                            {
                                student.softSkill.map((softSkill, index) => {
                                    console.log(softSkill)
                                    return (
                                        <TableRow hover key={index}>
                                            <TableCell> {softSkill.courseName} </TableCell>
                                            <TableCell> {softSkill.fromDate} </TableCell>
                                            {/* <TableCell> {softSkill.ToDate} </TableCell> */}
                                            <TableCell> {softSkill.From}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </Fragment>
                    </TableBody>
                </Table>
            </div>
        )
    }

    return (
        <div className="page_responsive">
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className="d-flex justify-content-start"> Soft Skills </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {modal}
            <button className={'btn btn-send btn-block'}
                onClick={ModalOpenHandler} style={{ backgroundColor: "#3b4968", color: "white" }}> Add </button>
            <hr />
            <div>
                {studentSoftSkill}
            </div>
        </div>
    );
};
export default SoftSkills;