import firebase from "../config/firebase";
import {successNotify, errorNotify } from "../lib/toast";

export function addCourse(courseDetails) {

    console.log(courseDetails)
    firebase.firestore().collection("courses").add(
        courseDetails
    )
        .then((docRef) => {
            successNotify('Course added successfully');
            window.location.reload();
        })
        .catch((error) => {
            errorNotify(error)
        });
}

export async function getCourses() {

    const courses = (await firebase.firestore().collection("courses").get()).docs
    const courseData = []

    for (let course of courses) {
        courseData.push(course.data())
    }
    return courseData

}
