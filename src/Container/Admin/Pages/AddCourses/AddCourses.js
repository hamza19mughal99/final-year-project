import React, { useState } from 'react';
import { addCourse } from '../../../../services/courses';
import {Spinner} from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HomeIcon from "@mui/icons-material/Home";


const AddStudents = () => {

    const [courseData, setCourseData] = useState({})
    const [loader, setLoader] = useState(false)

    const formHandler = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        addCourse(courseData);

    }

    return (
        <div className='page_responsive'>
            <div>
                <Breadcrumb>
                    <HomeIcon color="primary" />
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>AddCourse</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Course Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="CourseName"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={formHandler}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Credit Hours
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="CreditHour"
                        id="exampleInputPassword1"
                        onChange={formHandler}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        CourseCode
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="CourseCode"
                        id="exampleInputPassword1"
                        onChange={formHandler}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Department
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="department"
                        id="exampleInputPassword1"
                        onChange={formHandler}
                        required
                    />
                </div>
                {
                    loader ?
                        <div className={'text-center mt-4'}>
                            <Spinner animation={"border"} />
                        </div>
                        :
                        <button type="submit" className={'mt-2 btn btn-send'} style={{ backgroundColor: "blue", color: "white" }}>
                            Add Course
                        </button>
                }
            </form>
        </div>
    )
}

export default AddStudents
