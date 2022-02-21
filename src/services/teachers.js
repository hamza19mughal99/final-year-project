import firebase from "../config/firebase";
import { successNotify, errorNotify } from "../lib/toast";

export async function getTeachers() {
    const teachers = (await firebase.firestore().collection("teachers").get()).docs
    const teachersData = []

    for (let teacher of teachers) {
        teachersData.push(teacher.data())
    }
    return teachersData
}

export function addTeacher(teacherDetails) {

    firebase.auth().createUserWithEmailAndPassword(teacherDetails.email, "123456")
        .then((userCredential) => {
            const user = userCredential.user;
            firebase.firestore().collection("teachers").doc(user.uid).set(
                teacherDetails
            )
                .then((docRef) => {
                    successNotify('Teacher added successfully');
                    window.location.reload();
                })
                .catch((error) => {
                    errorNotify(error)
                });
        })
        .catch((error) => {
            errorNotify(error.message)
        });
}

export async function getTeacher() {
    const getTeacherIdByLocalStorage = localStorage.getItem("teacherId");
    return await firebase.firestore().collection("teachers").doc(getTeacherIdByLocalStorage).get()
}

