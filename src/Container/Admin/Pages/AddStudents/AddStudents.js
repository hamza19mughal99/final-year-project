import React, { useState, useEffect } from 'react';
import { addStudent } from '../../../../services/student'
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select'
import {Spinner} from "react-bootstrap";
import { getCourses } from "../../../../services/courses"
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { AiFillPlusCircle } from 'react-icons/ai';
import HomeIcon from "@mui/icons-material/Home";
import {successNotify, errorNotify } from "../../../../lib/toast";
import firebase from "../../../../config/firebase";

const AddStudents = () => {
    const [rewardPoint, setRewardPoint] = useState(0)
    const [formInput, setFormInput] = useState({
        name: '',
        email: '',
        rollNo: '',
        batch: '',
        department: '',
        CGPA: '',
        softSkill: [],
        technicalSkill: [],
        location: ''
    })
    const [selected, setSelected] = useState([]);
    const [semSelected, setSemSelected] = useState([])
    const [loader, setLoader] = useState(false)
    const [getCourse, setGetCourse] = useState([])
    const [semWiseCourses, setSemWiseCourses] = useState([])
    const [perSemGPA, setPerSemGPA] = useState(0)

    const handleCoursesInputChange = (value) => {
        setSelected(value)
    }
    const handleSemesterInputChange = (value) => {
        setSemSelected(value)
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

    const semesterOptions = [
        {label: 'first', value: 'first'},
        {label: 'second', value: 'second'},
        {label: 'third', value: 'third'},
        {label: 'fourth', value: 'fourth'},
        {label: 'fifth', value: 'fifth'},
        {label: 'sixth', value: 'sixth'},
        {label: 'seventh', value: 'seventh'},
        {label: 'eight', value: 'eight'},
    ]

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            [name]: value
        })
    }

    useEffect(() => {
        if(formInput.CGPA === 0) {
            setRewardPoint(0)
        }
        if(formInput.CGPA > 0 && formInput.CGPA <= 1){
            setRewardPoint(0)
        }
        else if(formInput.CGPA > 1 && formInput.CGPA <= 2){
            setRewardPoint(5)
        }
        else if(formInput.CGPA > 2 && formInput.CGPA <= 2.5){
            setRewardPoint(10)
        }
        else if(formInput.CGPA > 2.5 && formInput.CGPA <= 3){
            setRewardPoint(15)
        }
        else if(formInput.CGPA > 3 && formInput.CGPA <= 3.5){
            setRewardPoint(20)
        }
        else if(formInput.CGPA > 3.5 && formInput.CGPA <= 4){
            setRewardPoint(30)
        }
    }, [formInput.CGPA])

    const changeGPAHandler = (e) => {
        setPerSemGPA(e.target.value)
    }

    const addSemWiseHandler = () => {
        let courseLabel = semSelected.value
        setSemWiseCourses({
            ...semWiseCourses,
            [courseLabel]: {
                selected,
                perSemGPA
            }
        })
        successNotify('semester added successfully');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(semWiseCourses)

        setLoader(true)

        firebase.auth().createUserWithEmailAndPassword(formInput.email, "123456")
        .then((userCredential) => {
            const user = userCredential.user;
            const id = user.uid
            firebase.firestore().collection("students").doc(id).set({
                name: formInput.name,
                email: formInput.email,
                rollNo: formInput.rollNo,
                batch: formInput.batch,
                department: formInput.department,
                rewardPoints: rewardPoint,
                CGPA: formInput.CGPA,
                courses: semWiseCourses,
                softSkill: [],
                technicalSkill: [],
                location: formInput.location
            })
                .then((docRef) => {
                    // window.location.reload();
                    successNotify('Student added successfully');
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

    return (
        <div className='page_responsive'>
            <div>
                <Breadcrumb>
                    <HomeIcon color="primary" />
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>AddStudent</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6 mb-2'>
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
                    <div className='col-md-6 mb-2'>
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
                    <div className='col-md-6 mb-2'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Roll No.
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='rollNo'
                            value={formInput.rollNo}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6 mb-2'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Batch
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='batch'
                            value={formInput.batch}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6 mb-2'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Department
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='department'
                            value={formInput.department}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-6 mb-2'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            CGPA
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='CGPA'
                            value={formInput.CGPA}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md-4 mb-2'>
                        <label form="Select">Semester</label>
                        <Select
                            options={semesterOptions}
                            value={semSelected}
                            onChange={handleSemesterInputChange}
                            labelledBy="Select"
                        />
                    </div>
                    <div className='col-md-5 mb-2'>
                        <label form="Select">Courses</label>
                        <MultiSelect
                            options={CourseOptions}
                            value={selected}
                            onChange={handleCoursesInputChange}
                            labelledBy="Select"
                        />
                    </div>
                    <div className='col-md-2 mb-2'>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            GPA
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='GPA'
                            onChange={changeGPAHandler}
                        />
                    </div>
                    <div className={'col-md-1 d-flex justify-content-center align-items-center mb-2'}>
                        <AiFillPlusCircle style={{fontSize: '40px', color: "#3895D3", cursor: "pointer"}} onClick={addSemWiseHandler}/>
                    </div>
                </div>
                {
                    loader ?
                        <div className={'text-center mt-5'}>
                            <Spinner animation={"border"} />
                        </div>
                        :
                        <button type="submit" className={'mt-5 btn btn-send '}>
                            ADD STUDENT
                        </button>
                }
            </form>
        </div>
    )
}
export default AddStudents