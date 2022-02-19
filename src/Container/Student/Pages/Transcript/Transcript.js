import React, {Fragment, useEffect, useState} from 'react';
import 'react-tabs/style/react-tabs.css';
import Pdf from "react-to-pdf";
import logo from "../../../../assets/logo.png";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Spinner } from "react-bootstrap";
import "./Transcript.css";
import { getStudent } from "../../../../services/student"
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const Transcript = () => {

	const ref = React.createRef();
	const [student, setStudent] = useState(null)
	const columns = ['Course No.', 'Course Name', 'Credit Hour'];
	const [firstGpa, setFirstGpa] = useState(0)
	const [secondGpa, setSecondGpa] = useState(0)
	const [thirdGpa, setThirdGpa] = useState(0)
	const [fourthGpa, setFourthGpa] = useState(0)
	const [fifthGpa, setFifthGpa] = useState(0)
	const [sixthGpa, setSixthGpa] = useState(0)
	const [seventhGpa, setSeventhGpa] = useState(0)
	const [eightGpa, setEightGpa] = useState(0)

	const options = {
		orientation: 'portrait',
		unit: 'in',
		format: [30, 12]
	};

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
		})
	}, [])

	let transcriptData = (
		<div className={'text-center'}>
			<Spinner animation={'border'} />
		</div>
	)
	console.log()

	if(student){
		transcriptData = (
			<>
			    <div className={'d-flex justify-content-around'}>
				<p>Name: <strong> {student.name} </strong> </p>
				<p>Roll No: <strong> {student.rollNo} </strong> </p>
			    </div>

				<div className={'container'}>
			    <div className={'d-flex justify-content-around'}>
				<div>
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
									student.courses ?
										student.courses.eight.selected.map((course, index) => {
											return (
												<TableRow hover key={index}>
													<TableCell> {course.value.CourseCode} </TableCell>
													<TableCell> {course.value.CourseName} </TableCell>
													<TableCell> {course.value.CreditHour} </TableCell>
												</TableRow>
											)
										})
										: null
								}
							</Fragment>
						</TableBody>
					</Table>
					<div className={'d-flex justify-content-end mt-3'}>
						<p>8th Semester GPA: <strong>{eightGpa}</strong></p>
					</div>
				</div>
				<div className={'ml-3'}>
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
									student.courses ?
										student.courses.seventh.selected.map((course, index) => {
											return (
												<TableRow hover key={index}>
													<TableCell> {course.value.CourseCode} </TableCell>
													<TableCell> {course.value.CourseName} </TableCell>
													<TableCell> {course.value.CreditHour} </TableCell>
												</TableRow>
											)
										})
										: null
								}
							</Fragment>
						</TableBody>
					</Table>
					<div className={'d-flex justify-content-end mt-3'}>
						<p>7th Semester GPA: <strong>{seventhGpa}</strong></p>
					</div>
				</div>
			</div>

				<div className={'d-flex justify-content-around'}>
					<div>
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
										student.courses ?
											student.courses.sixth.selected.map((course, index) => {
												return (
													<TableRow hover key={index}>
														<TableCell> {course.value.CourseCode} </TableCell>
														<TableCell> {course.value.CourseName} </TableCell>
														<TableCell> {course.value.CreditHour} </TableCell>
													</TableRow>
												)
											})
											: null
									}
								</Fragment>
							</TableBody>
						</Table>
						<div className={'d-flex justify-content-end mt-3'}>
							<p>6th Semester GPA: <strong>{sixthGpa}</strong></p>
						</div>
					</div>
					<div className={'ml-3'}>
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
										student.courses ?
											student.courses.fifth.selected.map((course, index) => {
												return (
													<TableRow hover key={index}>
														<TableCell> {course.value.CourseCode} </TableCell>
														<TableCell> {course.value.CourseName} </TableCell>
														<TableCell> {course.value.CreditHour} </TableCell>
													</TableRow>
												)
											})
											: null
									}
								</Fragment>
							</TableBody>
						</Table>
						<div className={'d-flex justify-content-end mt-3'}>
							<p>5th Semester GPA: <strong>{fifthGpa}</strong></p>
						</div>
					</div>
				</div>

				<div className={'d-flex justify-content-around'}>
					<div>
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
										student.courses ?
											student.courses.fourth.selected.map((course, index) => {
												return (
													<TableRow hover key={index}>
														<TableCell> {course.value.CourseCode} </TableCell>
														<TableCell> {course.value.CourseName} </TableCell>
														<TableCell> {course.value.CreditHour} </TableCell>
													</TableRow>
												)
											})
											: null
									}
								</Fragment>
							</TableBody>
						</Table>
						<div className={'d-flex justify-content-end mt-3'}>
							<p>4th Semester GPA: <strong>{fourthGpa}</strong></p>
						</div>
					</div>
					<div className={'ml-3'}>
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
										student.courses ?
											student.courses.third.selected.map((course, index) => {
												return (
													<TableRow hover key={index}>
														<TableCell> {course.value.CourseCode} </TableCell>
														<TableCell> {course.value.CourseName} </TableCell>
														<TableCell> {course.value.CreditHour} </TableCell>
													</TableRow>
												)
											})
											: null
									}
								</Fragment>
							</TableBody>
						</Table>
						<div className={'d-flex justify-content-end mt-3'}>
							<p>3rd Semester GPA: <strong>{thirdGpa}</strong></p>
						</div>
					</div>
				</div>

				<div className={'d-flex justify-content-around'}>
					<div>
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
										student.courses ?
											student.courses.second.selected.map((course, index) => {
												return (
													<TableRow hover key={index}>
														<TableCell> {course.value.CourseCode} </TableCell>
														<TableCell> {course.value.CourseName} </TableCell>
														<TableCell> {course.value.CreditHour} </TableCell>
													</TableRow>
												)
											})
											: null
									}
								</Fragment>
							</TableBody>
						</Table>
						<div className={'d-flex justify-content-end mt-3'}>
							<p>2nd Semester GPA: <strong>{secondGpa}</strong></p>
						</div>
					</div>
					<div className={'ml-3'}>
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
										student.courses ?
											student.courses.first.selected.map((course, index) => {
												return (
													<TableRow hover key={index}>
														<TableCell> {course.value.CourseCode} </TableCell>
														<TableCell> {course.value.CourseName} </TableCell>
														<TableCell> {course.value.CreditHour} </TableCell>
													</TableRow>
												)
											})
											: null
									}
								</Fragment>
							</TableBody>
						</Table>
						<div className={'d-flex justify-content-end mt-3'}>
							<p>1st Semester GPA: <strong>{firstGpa}</strong></p>
						</div>
					</div>
				</div>

				<div className={'d-flex justify-content-end mt-3 mr-5'}>
					<p>Cumulative GPA: <strong>{(parseInt(firstGpa) + parseInt(secondGpa) + parseInt(thirdGpa) + parseInt(fourthGpa) + parseInt(fifthGpa) + parseInt(sixthGpa) + parseInt(seventhGpa) + parseInt(eightGpa))/8}</strong></p>
				</div>
				</div>
			</>
		)

	}

	return (
		<div className="page_responsive">
			<div>
				<Breadcrumb>
					<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
					<Breadcrumb.Item active className="d-flex justify-content-start">
						Transcript
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<Pdf targetRef={ref} filename="transcript.pdf" options={options} >
				{({ toPdf }) =>
					<button className={'text-center btn btn-send btn-block mb-3'} onClick={toPdf} style={{ backgroundColor: "#3b4968", color: "white" }}>Download Transcript Now</button>}
			</Pdf>
					<div ref={ref}>
						<div className={'d-flex justify-content-center transcript_header mt-3'}>
							<div className={'transcript_logo'}>
								<img src={logo} alt={'logo'} />
							</div>
							<h5>Sir Syed University of Engineering & Technology</h5>
						</div>
						<p className={'text-center'}>Transcript</p>
						<p className={'text-center'}>BS Software Engineering Batch 2018</p>
						{transcriptData}
					</div>
		</div>
	);
};
export default Transcript;