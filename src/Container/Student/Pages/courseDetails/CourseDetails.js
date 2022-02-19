import React, { Fragment, useState, useEffect } from "react";
import "./Course.css"
import { Spinner } from "react-bootstrap";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getStudent } from "../../../../services/student"
import Breadcrumb from "react-bootstrap/Breadcrumb";

const CourseDetails = () => {
	const [student, setStudent] = useState([])

	useEffect(() => {
		getStudent().then((res) => {
			setStudent(res.data())
		})
	}, [])

	const columns = [
		"CourseNo.",
		"Course Name",
		"Credit Hours",
		"Department",
	];

	// -----------------------------------1------------------------------------------------
	let coursesTable8 = <Spinner animation="border" />
	if (student.courses && student.courses.eight.selected && student.courses.eight.selected.length === 0) {
		coursesTable8 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.eight.selected && student.courses.eight.selected.length > 0) {
		coursesTable8 = (
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
						{student.courses.eight.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	// -----------------------------------2------------------------------------------------
	let coursesTable7 = <Spinner animation="border" />
	if (student.courses && student.courses.seventh.selected && student.courses.seventh.selected.length === 0) {
		coursesTable7 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.seventh.selected && student.courses.seventh.selected.length > 0) {
		coursesTable7 = (
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
						{student.courses.seventh.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	// -----------------------------------3------------------------------------------------
	let coursesTable6 = <Spinner animation="border" />
	if (student.courses && student.courses.sixth.selected && student.courses.sixth.selected.length === 0) {
		coursesTable6 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.sixth.selected && student.courses.sixth.selected.length > 0) {
		coursesTable6 = (
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
						{student.courses.sixth.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	// -----------------------------------4------------------------------------------------
	let coursesTable5 = <Spinner animation="border" />
	if (student.courses && student.courses.fifth.selected && student.courses.fifth.selected.length === 0) {
		coursesTable5 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.fifth.selected && student.courses.fifth.selected.length > 0) {
		coursesTable5 = (
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
						{student.courses.fifth.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	// -----------------------------------5------------------------------------------------
	let coursesTable4 = <Spinner animation="border" />
	if (student.courses && student.courses.fourth.selected && student.courses.fourth.selected.length === 0) {
		coursesTable4 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.fourth.selected && student.courses.fourth.selected.length > 0) {
		coursesTable4 = (
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
						{student.courses.fourth.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	// -----------------------------------6------------------------------------------------
	let coursesTable3 = <Spinner animation="border" />
	if (student.courses && student.courses.third.selected && student.courses.third.selected.length === 0) {
		coursesTable3 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.third.selected && student.courses.third.selected.length > 0) {
		coursesTable3 = (
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
						{student.courses.third.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	// -----------------------------------7------------------------------------------------
	let coursesTable2 = <Spinner animation="border" />
	if (student.courses && student.courses.second.selected && student.courses.second.selected.length === 0) {
		coursesTable2 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.second.selected && student.courses.second.selected.length > 0) {
		coursesTable2 = (
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
						{student.courses.second.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	// -----------------------------------8------------------------------------------------
	let coursesTable1 = <Spinner animation="border" />
	if (student.courses && student.courses.first.selected && student.courses.first.selected.length === 0) {
		coursesTable1 = (
			<div>
				<p>No Courses Found</p>
			</div>
		)
	}
	if (student.courses && student.courses.first.selected && student.courses.first.selected.length > 0) {
		coursesTable1 = (
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
						{student.courses.first.selected.map((course, index) => {
							return (
								<TableRow hover key={index}>
									<TableCell> {course.value.CourseCode} </TableCell>
									<TableCell> {course.value.CourseName} </TableCell>
									<TableCell> {course.value.CreditHour} </TableCell>
									<TableCell> {course.value.department}</TableCell>
								</TableRow>
							);
						})}
					</Fragment>
				</TableBody>
			</Table>
		);
	}

	return (
		<div className="page_responsive">
			<div>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
						<Breadcrumb.Item active className="d-flex justify-content-start">
							Courses
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
			</div>

			{/* <PageTitleBar title='Courses Details' match={props.match} /> */}
			<Tabs>
				<TabList>
					<Tab>1st semester</Tab>
					<Tab>2nd semester</Tab>
					<Tab>3rd semester</Tab>
					<Tab>4rd semester</Tab>
					<Tab>5th semester</Tab>
					<Tab>6th semester</Tab>
					<Tab>7th semester</Tab>
					<Tab>8th semester</Tab>
				</TabList>
				<TabPanel hover >
					<div className="text-center">{coursesTable1}</div>
				</TabPanel>
				<TabPanel>
					<div className="text-center">{coursesTable2}</div>
				</TabPanel>
				<TabPanel>
					<div className="text-center">{coursesTable3}</div>
				</TabPanel>
				<TabPanel>
					<div className="text-center">{coursesTable4}</div>
				</TabPanel>
				<TabPanel>
					<div className="text-center">{coursesTable5}</div>
				</TabPanel>
				<TabPanel>
					<div className="text-center">{coursesTable6}</div>
				</TabPanel>
				<TabPanel>
					<div className="text-center">{coursesTable7}</div>
				</TabPanel>
				<TabPanel>
					<div className="text-center">{coursesTable8}</div>
				</TabPanel>
			</Tabs>
		</div>
	);
};
export default CourseDetails;
