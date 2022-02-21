import React, { Fragment, useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Modal, Spinner } from "react-bootstrap";
import { updateTechnicalSkills } from "../../../../services/technicalSkills"
import { getStudent } from "../../../../services/student"
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const TechnicalSkills = props => {
    const Student = localStorage.getItem("studentId");

    const columns = ['Skill Name', 'From', 'Year Of Complete'];
    const [loader, setLoader] = useState(false)
    const [technicalSkillData, setTechnicalSkillData] = useState([])
    const [student, setStudent] = useState([])
    const [show, setShow] = useState(false);

    const formHandler = (e) => {
        setTechnicalSkillData({
            ...technicalSkillData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        let technicalSkillArr = student.technicalSkill;

        technicalSkillArr.push(technicalSkillData)
        updateTechnicalSkills(Student, technicalSkillArr);
    }

    useEffect(() => {
        getStudent().then((res) => {
            setStudent(res.data())

        })
    }, [])


    const ModalOpenHandler = () => {
        setShow(!show);
    }
    const handleClose = () => setShow(false);

    const modal = (
        <Modal show={show} size={'lg'} className="StaffEditCard">
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 style={{ fontWeight: "bold" }}> Add Technical Skills </h2>
                    <p style={{ cursor: "pointer", fontSize: "20px" }} onClick={handleClose} title="Close Staff">X</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Enter Course Name" className="form-control mb-2" name="courseName" onChange={formHandler} />
                    <input placeholder="From where " className="form-control mb-2" name="certification" onChange={formHandler} />
                    <input placeholder="Enter year of completion" className="form-control mb-2" name="yearOfComplete" onChange={formHandler} />
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


    let studentTechnicalSkill = (
        <div className={'text-center'}>
            <Spinner animation={'border'} />
        </div>
    )
    if (student.technicalSkill && student.technicalSkill.length === 0) {
        studentTechnicalSkill = <p className={'text-center'}>No Technical Skills</p>
    }

    if (student.technicalSkill && student.technicalSkill.length > 0) {
        studentTechnicalSkill = (
            <div className="table-responsive">
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
                                student.technicalSkill.map((technicalSkill, index) => {
                                    return (
                                        <TableRow hover key={index}>
                                            <TableCell> {technicalSkill.courseName} </TableCell>
                                            <TableCell> {technicalSkill.certification} </TableCell>
                                            <TableCell> {technicalSkill.yearOfComplete} </TableCell>
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
        <>
            <div className="page_responsive">
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active className="d-flex justify-content-start">
                            Technical Skills
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {modal}
                <button className={'text-center btn btn-send btn-block'}
                    onClick={ModalOpenHandler} style={{ backgroundColor: "#3b4968", color: "white" }}> Add </button>
                <hr />

                <div>
                    {studentTechnicalSkill}
                </div>
            </div>
        </>
    );
};
export default TechnicalSkills;