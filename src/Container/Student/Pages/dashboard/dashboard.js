import React, { useEffect, useState } from 'react'
import Header from './Header';
import "./dashboard.css"
import Card from 'react-bootstrap/Card'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from 'react-apexcharts'
import { Spinner } from "react-bootstrap"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { TableCell, TableRow } from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import { getStudent } from "../../../../services/student"
import { updateLocation } from "../../../../services/location";
import StarIcon from '@mui/icons-material/Star';
import SubjectIcon from '@mui/icons-material/Subject';
import Loading from "./Loading"
import useGeoLocation from "./useGeoLocation";

export default function StudentDashboard() {

    const Student = localStorage.getItem("studentId");

    // set percentage for student progress
    const [firstGpa, setFirstGpa] = useState('')
    const [secondGpa, setSecondGpa] = useState('')
    const [thirdGpa, setThirdGpa] = useState('')
    const [fourthGpa, setFourthGpa] = useState('')
    const [fifthGpa, setFifthGpa] = useState('')
    const [sixthGpa, setSixthGpa] = useState('')
    const [seventhGpa, setSeventhGpa] = useState('')
    const [eightGpa, setEightGpa] = useState('')
    const [currProgress, setCurrProgress] = useState(0)
    const [allProgress, setAllProgress] = useState(0)
    // const calculatedProgress = (eightGpa * 100)/4
    const currentPercentage = parseInt(currProgress);

    // const overAllProgress = (parseInt(firstGpa) + parseInt(secondGpa) + parseInt(thirdGpa) + parseInt(fourthGpa) + parseInt(fifthGpa) + parseInt(sixthGpa) + parseInt(seventhGpa) + parseInt(eightGpa) * 100)/4
    const overallPercentage = parseInt(allProgress);

    // set data for student progress
    const [options, setObjext] = useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: ["1sem", "2sem", "3sem", "4sem", "5sem", "6sem", "7sem", "8sem"]
        }
    })

    const series = [
        {
            name: 'semester',
            data: [firstGpa, secondGpa, thirdGpa, fourthGpa, fifthGpa, sixthGpa, seventhGpa, eightGpa]
        }
    ]

    const [student, setStudent] = useState({})

    const location = useGeoLocation();
    useEffect(() => {
        if (location.coordinates) {
            updateLocation(Student, location.coordinates);
        }
        else {
            updateLocation(Student, { lat: '', lng: '' })
        }
    })

    useEffect(() => {
        getStudent().then((res) => {
            setStudent(res.data())
            setFirstGpa(res.data().courses.first.perSemGPA)
            setSecondGpa(res.data().courses.second.perSemGPA)
            setThirdGpa(res.data().courses.third.perSemGPA)
            setFourthGpa(res.data().courses.fourth.perSemGPA)
            setFifthGpa(res.data().courses.fifth.perSemGPA)
            setSixthGpa(res.data().courses.sixth.perSemGPA)
            setSeventhGpa(res.data().courses.seventh.perSemGPA)
            setEightGpa(res.data().courses.eight.perSemGPA)
            setCurrProgress((res.data().courses.eight.perSemGPA * 100) / 4)

            setAllProgress(
                (
                    (
                        parseFloat(res.data().courses.first.perSemGPA) +
                        parseFloat(res.data().courses.second.perSemGPA) +
                        parseFloat(res.data().courses.third.perSemGPA) +
                        parseFloat(res.data().courses.fourth.perSemGPA) +
                        parseFloat(res.data().courses.fifth.perSemGPA) +
                        parseFloat(res.data().courses.sixth.perSemGPA) +
                        parseFloat(res.data().courses.seventh.perSemGPA) +
                        parseFloat(res.data().courses.eight.perSemGPA)
                    ) / 32) * 100
            )
        })
    }, [])

    return (
        <>
            <div className='page_responsive'>
                <div className='mt-0 '>
                    <Breadcrumb>
                        <HomeIcon color="primary" />
                        <Breadcrumb.Item >Home</Breadcrumb.Item>
                        <Breadcrumb.Item active className='d-flex justify-content-start'>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Header />
                <div className="container-fluid mt-1 mt-2">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <Card className="RewardCard" style={{ width: "80%", borderRadius: "10px", float: "inline-end" }}>
                                <Card.Body>
                                    <Card.Title className='mb-3 mt-2'>Reward Points</Card.Title>
                                    <span className='d-flex'> <StarIcon style={{ color: "yellow" }}>

                                    </StarIcon>
                                        <h5 style={{ color: "rgba(0, 143, 251, 0.85)" }}>
                                            {student ?
                                                student.rewardPoints
                                                : <Loading />
                                            }
                                        </h5></span>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-1">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <Card style={{ borderRadius: "10px" }}>
                                <div className="container centerCard">
                                    <div className="row">
                                        {/*<div className="col-12">*/}
                                        {/*    <Card.Title className='mb-3'> <SubjectIcon />Current Courses Enroll</Card.Title>*/}
                                        {/*    /!* {*!/*/}
                                        {/*    /!*    student && student.courses ?*!/*/}
                                        {/*    /!*        <>*!/*/}
                                        {/*    /!*            {*!/*/}
                                        {/*    /!*                student.courses.eight.selected.map((courses, index) => {*!/*/}
                                        {/*    /!*                    return (*!/*/}
                                        {/*    /!*                        (*!/*/}
                                        {/*    /!*                            <TableRow hover key={index}>*!/*/}
                                        {/*    /!*                                <TableCell> {index + 1}. {courses.value.CourseName} </TableCell>*!/*/}
                                        {/*    /!*                            </TableRow>*!/*/}
                                        {/*    /!*                        )*!/*/}
                                        {/*    /!*                    )*!/*/}
                                        {/*    /!*                })*!/*/}
                                        {/*    /!*            }*!/*/}
                                        {/*    /!*        </>*!/*/}
                                        {/*    /!*        : null*!/*/}
                                        {/*    /!*}*!/*/}
                                        {/*</div>*/}
                                        <div className="col-lg-6 col-md-6 col-sm-12 " >
                                            <Card.Body className='center'>
                                                <Card.Title className='title mb-3'>Current Semester Progress</Card.Title>
                                                <CircularProgressbar value={currentPercentage} text={`${currentPercentage}%`} />
                                            </Card.Body>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 " >
                                            <Card.Body className='center'>
                                                <Card.Title className='title mb-3'>OverAll Semester Progress </Card.Title>
                                                <CircularProgressbar value={overallPercentage} text={`${overallPercentage}%`} />
                                            </Card.Body>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <Card className='graph' >
                                <Card.Body>
                                    <Card.Title className='mb-3'>All Semester GPA</Card.Title>
                                    <div className='graphHeight'><Chart options={options} series={series} type="bar" /></div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}