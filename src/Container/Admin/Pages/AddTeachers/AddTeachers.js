import React, { useState, useEffect } from 'react';
import { addTeacher } from '../../../../services/teachers'
import { getCourses } from "../../../../services/courses"
import {Spinner} from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import firebase from "../../../../config/firebase";
import {successNotify, errorNotify } from "../../../../lib/toast";

const AddTeachers = () => {

    const [formInput, setFormInput] = useState({
        name: '',
        email: '',
        id: '',
        department: '',
        yearJoin: '',
        courses: ''
    })
    const [loader, setLoader] = useState(false)
    const [getCourse, setGetCourse] = useState([])
    const [selected, setSelected] = useState([]);

    const handleCoursesInputChange = (value) => {
        setSelected(value)
    }

    useEffect(() => {

        getCourses().then((res) => {
            setGetCourse(res)
        })

    }, [])

    const CourseOptions = getCourse.map((course, index) => {
        return {
            label: course.CourseName,
            value: course,
            key: index
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true)
        addTeacher({

        })

        firebase.auth().createUserWithEmailAndPassword(formInput.email, "123456")
        .then((userCredential) => {
            const user = userCredential.user;
            firebase.firestore().collection("teachers").doc(user.uid).set({
                name: formInput.name,
                email: formInput.email,
                id: formInput.id,
                department: formInput.department,
                yearJoin: formInput.yearJoin,
                courses: selected
            })
                .then((docRef) => {
                    successNotify('Teacher added successfully');
                    setLoader(false)
                    
                })
                .catch((error) => {
                    errorNotify(error)
                    setLoader(false)
                });
        })
        .catch((error) => {
            errorNotify(error.message)
            setLoader(false)
        });
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormInput({
            ...formInput,
            [name]: value
        })

    }

    return (
        <div className='page_responsive'>
            <div>
                <Breadcrumb>
                    <HomeIcon color="primary" />
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>AddTeacher</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            value={formInput.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            value={formInput.email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='id'
                            value={formInput.id}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            department
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='department'
                            value={formInput.department}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            year of joining
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='yearJoin'
                            value={formInput.yearJoin}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label for="Select">Courses</label>
                        <MultiSelect
                            options={CourseOptions}
                            value={selected}
                            onChange={handleCoursesInputChange}
                            labelledBy="Select"
                        />
                    </div>
                </div>
                {
                    loader ?
                        <div className={'text-center mt-5'}>
                            <Spinner animation={"border"} />
                        </div>
                        :
                        <button type="submit" className={'mt-5 btn btn-send '}>
                            ADD TEACHER
                        </button>
                }
            </form>
        </div>
    )
}

export default AddTeachers
