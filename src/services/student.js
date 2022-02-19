import firebase from "../config/firebase";
import {successNotify, errorNotify } from "../lib/toast";

export async function getStudents() {

    const students = (await firebase.firestore().collection("students").get()).docs
    const studentsData = []

    for (let student of students) {
        studentsData.push(student.data())
    }
    return studentsData
}
export function addStudent(studentDetails) {

    firebase.auth().createUserWithEmailAndPassword(studentDetails.email, "123456")
        .then((userCredential) => {
            const user = userCredential.user;
            const id = user.uid
            firebase.firestore().collection("students").doc(id).set(
                studentDetails
            )
                .then((docRef) => {
                    window.location.reload();
                    successNotify('Student added successfully');
                })
                .catch((error) => {
                    errorNotify(error)
                });
        })
        .catch((error) => {
            errorNotify(error.message)
        });
}

//studentId should be passed using redux  
export async function getStudent() {
    const getStudentIdByLocalStorage = localStorage.getItem("studentId");
    return await firebase.firestore().collection("students").doc(getStudentIdByLocalStorage).get()
}