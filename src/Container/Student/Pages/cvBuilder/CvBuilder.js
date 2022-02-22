import React, { useState, useEffect } from 'react';
import Pdf from "react-to-pdf";
import "./cvBuilder.css";
import { getStudent } from "../../../../services/student";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const CvBuilder = () => {

    const [cvData, setCvData] = useState({})
    const [showCv, setShowCv] = useState(false)

    const [getStudentName, setGetStudentName] = useState('')
    const [getBatchYear, setGetBatchYear] = useState(2018)
    const [department, setDepartment] = useState('Software Engineering')
    const [technicalSkill, setTechnicalSkills] = useState([])
    const [softSkill, setSoftSkills] = useState([])


    useEffect(() => {
        getStudent().then((res) => {
            setGetStudentName(res.data().name)
            setGetBatchYear(res.data().batch)
            setDepartment(res.data().department)
            setSoftSkills(res.data().softSkill)
            setTechnicalSkills(res.data().technicalSkill)

        })
    }, [])

    console.log(technicalSkill)

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setCvData({
            ...cvData,
            [name]: value
        })

    }

    const FormSubmitHandler = (e) => {
        e.preventDefault();

        console.log(cvData)
        setShowCv(true)

    }

    const ref = React.createRef();

    const options = {
        orientation: 'portrait',
        unit: 'in',
        format: [10, 10]
    };

    return (
        <div className='page_responsive'>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className="d-flex justify-content-start">
                        CV Builder
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <form onSubmit={FormSubmitHandler}>
                    <h3> Personal Details </h3>
                    <div className="d-flex flex-wrap mb-5">
                        <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='profile' placeholder="enter short description" />
                        <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='objective' placeholder="enter objective" />
                        <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='email' placeholder="enter professional email address" />
                        <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='phone' placeholder="enter professional phone Number" />
                        <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='address' placeholder="enter House Address" />
                        <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='linkdin' placeholder="enter your linkedln link" />
                        <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='github' placeholder="enter your github link" />
                    </div>

                    <h4> Educational Details </h4>
                    <div>
                        <h5> School Details </h5>
                        <div className="d-flex flex-wrap mb-5">
                            <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='school_name' placeholder="enter your School Name" />
                            <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='school_field' placeholder="enter your Field" />
                            <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='school_passing' placeholder="year of passing" />
                        </div>
                        <h5> College Details </h5>
                        <div className="d-flex flex-wrap mb-5">
                            <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='college_name' placeholder="enter your college Name" />
                            <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='college_field' placeholder="enter your Field" />
                            <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='college_joining' placeholder="year of joining" />
                            <input className="form-control mb-2 w-100" required onChange={onChangeHandler} name='college_passing' placeholder="year of passing" />
                        </div>

                        <h5> University Details </h5>
                        <div className="d-flex flex-wrap mb-5">
                            <input className="form-control mb-2 w-100" disabled value={'Sir Syed University of Engineering and Technology'} />
                            <input className="form-control mb-2 w-100" disabled value={department} />
                            <input className="form-control mb-2 w-100" disabled value={getBatchYear} />
                            <input className="form-control mb-2 w-100" disabled value={parseInt(getBatchYear) + 4} name='college_passing' placeholder="year of passing" />
                        </div>
                        <p>notes * rest of details will automatically get from pages.</p>

                    </div>
                    <button type='submit' className={'text-center btn btn-send btn-block mb-3'} style={{ backgroundColor: "#3b4968", color: "white" }}>Download CV</button>
                </form>
            </div>
            {
                showCv ?
                    <>
                        <div className="Post" ref={ref}>
                            {/* <div className='container-fluid'> */}
                            <div className='row'>
                                <div className='col-md-3 cv_left'>
                                    <div>
                                        <h5>OBJECTIVE</h5>
                                        <p> {cvData.profile} </p>

                                        <h5>CONTACT</h5>
                                        <span> Phone: </span>
                                        <p> {cvData.phone} </p>

                                        <span> Email: </span>
                                        <p> {cvData.email} </p>

                                        <span> Address: </span>
                                        <p> {cvData.address} </p>

                                        <span> Github: </span>
                                        <p> {cvData.github} </p>

                                        <span> linkedln: </span>
                                        <p> {cvData.linkdin} </p>

                                    </div>
                                </div>

                                <div className='col-md-9 ' style={{ marginLeft: "-15px" }}>
                                    <div className='cv_right'>
                                        <h3 className='text-center'>{getStudentName}</h3>
                                    </div>

                                    <div className='objective'>
                                        <h5>Objectives</h5>
                                        <p> {cvData.objective}
                                        </p>

                                        <h5>Education</h5>
                                        <ul>
                                            <li>
                                                <p>Matriculation <span> ({cvData.school_field})</span></p>
                                                <p> {cvData.school_name} - ({cvData.school_passing})</p>
                                            </li>
                                            <li>
                                                <p>Intermediate <span> ({cvData.college_field})</span></p>
                                                <p> {cvData.college_name} - ({cvData.college_joining} - {cvData.college_passing})</p>
                                            </li>
                                            <li>
                                                <p>Graduate <span> ({department})</span></p>
                                                <p> Sir Syed University - ({getBatchYear} - {parseInt(getBatchYear) + 4})</p>
                                            </li>
                                        </ul>

                                        <h4>Skills</h4>
                                        <ul>
                                            {
                                                technicalSkill ?
                                                    technicalSkill.map((technical) => {
                                                        return (
                                                            <>
                                                                <li>
                                                                    {technical.courseName}
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                    : null
                                            }
                                        </ul>
                                        <ul>
                                            {
                                                softSkill ?
                                                    softSkill.map((soft) => {
                                                        return (
                                                            <>
                                                                <li>
                                                                    {soft.courseName}
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                    : null
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                        <Pdf targetRef={ref} options={options} filename={`${getStudentName}.pdf`}>
                            {({ toPdf }) => <button onClick={toPdf} className={'text-center btn btn-send btn-block mb-3'} style={{ backgroundColor: "#3b4968", color: "white" }}>Download CV</button>}

                        </Pdf>
                    </>
                    :
                    null
            }
        </div>
    );
}
export default CvBuilder;