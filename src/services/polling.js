import firebase from "../config/firebase";
import { successNotify, errorNotify } from "../lib/toast";
// import Firebase from 'firebase/app'
import * as Firebase from "firebase/firebase";

export function addPolling(pollingData) {
    const id = firebase.firestore().collection('polling').doc().id
    firebase.firestore().collection("polling").doc(id).set({
        id,
        pollingData
    })
        .then((docRef) => {
            successNotify('Polling added successfully');
            window.location.reload()
        })
        .catch((error) => {
            errorNotify(error)
        });
}

export async function getAllPollingData() {
    const poll = (await firebase.firestore().collection("polling").get()).docs

    const pollData = []

    for (let polling of poll) {
        pollData.push(polling.data())
    }
    return pollData
}

export async function getPolling() {
    const getStudentIdByLocalStorage = localStorage.getItem("studentId");

    const poll = (await firebase.firestore().collection("polling").get()).docs

    const pollingData = []

    for (let polling of poll) {
        const data = polling.data()
        if (!data.voterList?.includes(getStudentIdByLocalStorage))
            pollingData.push(polling.data())
    }
    return pollingData
}

export async function updatePoll(selected, selectedPollingId) {
    const getStudentIdByLocalStorage = localStorage.getItem("studentId");

    await firebase.firestore().collection("polling").doc(selectedPollingId)
        .update({
            [selected.label]:
                Firebase.firestore.FieldValue.increment(1),

            voterList:
                Firebase.firestore.FieldValue.arrayUnion(getStudentIdByLocalStorage),

        })
        .then((docRef) => {
            successNotify('Vote added successfully');
            window.location.reload()
        })
        .catch((error) => {
            errorNotify(error)
        });
}